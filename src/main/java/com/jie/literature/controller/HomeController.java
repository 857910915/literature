package com.jie.literature.controller;

import com.alibaba.fastjson.JSON;
import com.jie.literature.domain.Permission;
import com.jie.literature.domain.Space;
import com.jie.literature.domain.User;
import com.jie.literature.domain.UserRole;
import com.jie.literature.service.SpaceService;
import com.jie.literature.service.UserRoleService;
import com.jie.literature.service.UserService;
import com.jie.literature.util.SignUpHelper;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Map;

@Controller
public class HomeController {
    @Autowired
    private UserService userService;
    @Autowired
    private SpaceService spaceService;
    @Autowired
    private UserRoleService userRoleService;

    @RequestMapping("/register")
    @ResponseBody
    public String toRegister(User user, String code1, HttpServletRequest request) {
        User user1=new SignUpHelper().encryptPassword(user);
        String msg=userService.toRegister(user1,code1,request);
        //获取用户身份-------用户名
        User user2=userService.findUser(user1.getUsername());
        Space space=new Space();
        space.setSpaceUid(user2.getUserId());
        space.setSpaceName(user2.getUserNickname()+"的空间");
        spaceService.toInsertSpace(space);
        UserRole userRole=new UserRole();
        userRole.setUrRid(1);
        userRole.setUrUid(user2.getUserId());
        userRoleService.toInsertUserRole(userRole);
        return JSON.toJSONString(msg);
    }


    @RequestMapping("/login")
//    @ResponseBody
    public String login(HttpServletRequest request, Map<String, Object> map) throws Exception{
        System.out.println("HomeController.login()");
        // 登录失败从request中获取shiro处理的异常信息。
        // shiroLoginFailure:就是shiro异常类的全类名.
        String exception = (String) request.getAttribute("shiroLoginFailure");
        System.out.println("exception=" + exception);
        String msg = "";
        if (exception != null) {
            if (UnknownAccountException.class.getName().equals(exception)) {
                System.out.println("UnknownAccountException -- > 账号不存在：");
                msg = "UnknownAccountException -- > 账号不存在：";
            } else if (IncorrectCredentialsException.class.getName().equals(exception)) {
                System.out.println("IncorrectCredentialsException -- > 密码不正确：");
                msg = "IncorrectCredentialsException -- > 密码不正确：";
            } else if ("kaptchaValidateFailed".equals(exception)) {
                System.out.println("kaptchaValidateFailed -- > 验证码错误");
                msg = "kaptchaValidateFailed -- > 验证码错误";
            } else if (ExcessiveAttemptsException.class.getName().equals(exception)) {
                System.out.println("ExcessiveAttemptsException -- > 密码错误太多：");
                msg = "ExcessiveAttemptsException -- > 密码错误太多，账号已被锁定：";
            } else {
                msg = "else >> "+exception;
                System.out.println("else -- >" + exception);
            }
        }
        map.put("msg", msg);
        // 此方法不处理登录成功,由shiro进行处理
        //return "Public/login.html";
        return "redirect:Public/login.html";
    }

    @RequestMapping("/403")
    public String unauthorizedRole(){
        System.out.println("------没有权限-------");
        return "redirect:403.html";
    }

    @RequestMapping("/index1")
    public String index(HttpServletRequest request){
        //通过安全管理工具，获取用户对象
        Subject subject = SecurityUtils.getSubject();
        //获取用户身份-------用户名
        String username = (String)subject.getPrincipal();
        //获取当前对象所在的session
        Session session = subject.getSession();
        //获取权限列表
        List<Permission> permissionList = userService.findPermission(username);
        //添加权限列表到session回话中
        session.setAttribute("menuList",permissionList);
        return "redirect:index.html";
    }

}