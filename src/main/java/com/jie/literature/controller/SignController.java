package com.jie.literature.controller;

import com.alibaba.fastjson.JSON;
import com.jie.literature.domain.Sign;
import com.jie.literature.domain.User;
import com.jie.literature.service.SignService;
import com.jie.literature.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequestMapping("/sign")
public class SignController {
    @Autowired
    private SignService signService;
    @Autowired
    private UserService userService;

    @RequestMapping("/toSign")
    public String toSign(Sign sign){
        Subject subject = SecurityUtils.getSubject();
        String username = (String)subject.getPrincipal();
        User user=userService.findUser(username);
        sign.setSignUid(user.getUserId());
        signService.toSign(sign);
        user.setUserIntegral(user.getUserIntegral()+10);
        userService.updateUser(user);
        return JSON.toJSONString("签到成功  +10分");
    }

    @RequestMapping("/toFindSign")
    public String toFindSign(){
        String time=getStringDate();
        Subject subject = SecurityUtils.getSubject();
        String username = (String)subject.getPrincipal();
        User user=userService.findUser(username);
        Sign sign=signService.toFindSign(user.getUserId(),time);
        if (sign!=null)
            return JSON.toJSONString(sign);
        else
            return JSON.toJSONString("1000");
    }

    public String getStringDate() {
        Date currentTime = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String dateString = formatter.format(currentTime);
        return dateString;
    }

}
