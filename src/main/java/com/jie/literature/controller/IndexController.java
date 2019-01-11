package com.jie.literature.controller;

import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class IndexController {


    @RequestMapping("/tologin")
    public String login(){
        return "index/login";
    }

    @RequestMapping("login1")
    public String login(HttpServletRequest request,Model model){
        chat(request,model);
        return "index/login";
    }

    @RequestMapping("chat")
    public String chat(HttpServletRequest request,Model model){
        String username=request.getParameter("username");
        if(StringUtils.isEmpty(username)){
            return "index/login";
        }
        model.addAttribute("username",username);
        return "index/chat";
    }




}
