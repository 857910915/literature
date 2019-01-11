package com.jie.literature.controller;

import com.alibaba.fastjson.JSON;
import com.jie.literature.domain.Space;
import com.jie.literature.domain.User;
import com.jie.literature.service.SpaceService;
import com.jie.literature.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/space")
public class SpaceController {

    @Autowired
    private SpaceService spaceService;
    @Autowired
    private UserService userService;

    //查询空间信息
    @RequestMapping("/toSelectSpace")
    public String toSelectSpace(){
        //通过安全管理工具，获取用户对象
        Subject subject = SecurityUtils.getSubject();
        //获取用户身份-------用户名
        String username = (String)subject.getPrincipal();
        User user=userService.findUser(username);
        Space space=spaceService.toSelectSpace(user.getUserId());
        return JSON.toJSONString(space);
    }

    @RequestMapping("/toUpdateSpace")
    public String toUpdateSpace(Space space){
        Subject subject = SecurityUtils.getSubject();
        String username = (String)subject.getPrincipal();
        User user=userService.findUser(username);
        space.setSpaceUid(user.getUserId());
        spaceService.toUpdateSpace(space);
        return JSON.toJSONString("更新成功！");
    }



}
