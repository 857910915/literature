package com.jie.literature.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jie.literature.domain.Follow;
import com.jie.literature.domain.User;
import com.jie.literature.service.FollowService;
import com.jie.literature.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/follow")
public class FollowController {

    @Autowired
    private UserService userService;
    @Autowired
    private FollowService followService;

    @RequestMapping("/selectFollowList")
    public String selectFollowList(String username,int pageNo){
        if (username.length()==0){
            Subject subject = SecurityUtils.getSubject();
            username = (String)subject.getPrincipal();

        }
        User user=userService.findUser(username);
        Follow follow=new Follow();
        follow.setFolStatus(0);
        follow.setFolUid(user.getUserId());
        List<Follow>list=followService.selectFollowList(follow);
        for (int i=0;i<list.size();i++){
            User user1=userService.findUser1(list.get(i).getFolUserid());
            list.get(i).setUser(user1);
        }
        PageHelper.startPage(pageNo, 10);
        PageInfo<Follow>pageInfo=new PageInfo<>(list);
        return JSON.toJSONString(pageInfo.getList());
    }

    @RequestMapping("/selectFollowList1")
    public String selectFollowList1(String username,int pageNo){
        if (username.length()==0){
            Subject subject = SecurityUtils.getSubject();
            username = (String)subject.getPrincipal();
        }
        User user=userService.findUser(username);
        List<Follow>list=followService.selectFollowList1(user.getUserId());
        for (int i=0;i<list.size();i++){
            User user1=userService.findUser1(list.get(i).getFolUid());
            list.get(i).setUser(user1);
        }
        PageHelper.startPage(pageNo, 10);
        PageInfo<Follow>pageInfo=new PageInfo<>(list);
        return JSON.toJSONString(pageInfo.getList());
    }

    @RequestMapping("/toGuanzhu")
    public String toGuanzhu(Follow follow,String username){
        String msg="不能关注自己";
        Subject subject = SecurityUtils.getSubject();
        String fusername = (String)subject.getPrincipal();
        if (fusername.equals(username)){
            return JSON.toJSONString(msg);
        }
        User user1=userService.findUser(fusername);
        User user2=userService.findUser(username);
        follow.setFolUid(user1.getUserId());
        follow.setFolUserid(user2.getUserId());
        List<Follow>list=followService.selectFollowList(follow);
        if (list.size()==0){
            followService.toGuanzhu(follow);
        }
        for (int i=0;i<list.size();i++){
            if (user2.getUserId()==list.get(i).getFolUserid()){
                if (list.get(i).getFolStatus()==0){
                    list.get(i).setFolStatus(1);
                    followService.toEditGuanzhu(list.get(i));
                    msg="取消关注";
                }else {
                    list.get(i).setFolStatus(0);
                    followService.toEditGuanzhu(list.get(i));
                    msg="关注成功";
                }
                return JSON.toJSONString(msg);
            }else if (i==list.size()-1&&user2.getUserId()!=list.get(i).getFolUserid()){
                followService.toGuanzhu(follow);
            }
        }
        return JSON.toJSONString(msg);
    }

}
