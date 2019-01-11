package com.jie.literature.controller;

import com.alibaba.fastjson.JSON;
import com.jie.literature.domain.Fabulous;
import com.jie.literature.domain.User;
import com.jie.literature.service.FabulousService;
import com.jie.literature.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/fab")
public class FabulousController {
    @Autowired
    private FabulousService fabulousService;
    @Autowired
    private UserService userService;

    @RequestMapping("/toInsertFab")
    public String toInsertFab(Fabulous fabulous){
        Subject subject = SecurityUtils.getSubject();
        String username = (String)subject.getPrincipal();
        User user=userService.findUser(username);
        fabulous.setFabUid(user.getUserId());
        String msg="点赞  +1";
        List<Fabulous>list=fabulousService.toSelectFabList(fabulous.getFabAid());
        if (list.size()==0){
            fabulousService.toInsertFab(fabulous);
        }
        for (int i=0;i<list.size();i++){
            if (list.get(i).getFabUid()==user.getUserId()){
                if (list.get(i).getFabStatus()==0){
                    msg="取消点赞  -1";
                    list.get(i).setFabStatus(1);
                }else if (list.get(i).getFabStatus()==1){
                    list.get(i).setFabStatus(0);
                }
                fabulousService.toUpdateFab(list.get(i));
                return JSON.toJSONString(msg);
            }else if (i==list.size()-1&&list.get(i).getFabUid()!=user.getUserId()){
                fabulousService.toInsertFab(fabulous);
            }
        }
        return JSON.toJSONString(msg);
    }
}
