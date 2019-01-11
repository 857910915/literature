package com.jie.literature.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageInfo;
import com.jie.literature.domain.User;
import com.jie.literature.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.util.List;

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping("/toLogin")
    @ResponseBody
    public String toLogin(String userAccount, String userPassword,HttpServletRequest request) {
        List list = userService.toLogin(userAccount, userPassword,request);
        return JSON.toJSONString(list);
    }

    @RequestMapping("/toGetUsername")
    @ResponseBody
    public String toGetUsername() {
        //通过安全管理工具，获取用户对象
        Subject subject = SecurityUtils.getSubject();
        //获取用户身份-------用户名
        String username = (String)subject.getPrincipal();
        return username;
    }

    @RequestMapping("toSelectUser")
    @ResponseBody
    public String toSelectUser(String username){
        User user=userService.findUser(username);
        return JSON.toJSONString(user);
    }

    @RequestMapping("toSelectUser1")
    @ResponseBody
    public String toSelectUser1(){
        //通过安全管理工具，获取用户对象
        Subject subject = SecurityUtils.getSubject();
        //获取用户身份-------用户名
        String username = (String)subject.getPrincipal();
        User user=userService.findUser(username);
        return JSON.toJSONString(user);
    }

    @RequestMapping("updateUser")
    @ResponseBody
    public String updateUser(User user){
        //通过安全管理工具，获取用户对象
        Subject subject = SecurityUtils.getSubject();
        //获取用户身份-------用户名
        String username = (String)subject.getPrincipal();
        User user1=userService.findUser(username);
        user.setUserId(user1.getUserId());
        int num=userService.updateUser(user);
        String msg="更新失败!";
        if (num>0){
            msg="更新成功！";
        }
        return JSON.toJSONString(msg);
    }

    @RequestMapping("updateUserImg")
    @ResponseBody
    public String updateUserImg(MultipartFile myFile,HttpServletRequest request) throws FileNotFoundException {
        //通过安全管理工具，获取用户对象
        Subject subject = SecurityUtils.getSubject();
        //获取用户身份-------用户名
        String username = (String)subject.getPrincipal();
        User user=userService.findUser(username);
        String msg="";
        String path = ResourceUtils.getURL("classpath:").getPath();
        if (!myFile.isEmpty()) { //文件不是空文件
            try {
                //保存图片到目录下,建立保存文件的输入流
                BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream(new File(path+"static/images/" + username + ".jpg")));
                out.write(myFile.getBytes());
                out.flush();
                out.close();
                String filename = "images/" + username + ".jpg";
                user.setUserImg(filename); //设置头像路径
                userService.updateUser(user);//修改用户信息
            } catch (FileNotFoundException e) {
                e.printStackTrace();
//                return new Reponse(false,"上传失败," + e.getMessage());
                msg="上传失败"+ e.getMessage();
                return JSON.toJSONString(msg);
            } catch (IOException e) {
                e.printStackTrace();
//                return new Reponse(false,"上传失败," + e.getMessage());
                //return "上传失败," + e.getMessage();  //文件IO错误
                msg="上传失败"+ e.getMessage();
                return JSON.toJSONString(msg);
            }
//            return new Reponse(true,"上传头像成功",user);//返回用户信息
            msg="上传头像成功";
        } else {
//            return new Reponse(false,"上传失败，因为文件是空的");
            msg="上传失败，因为文件是空的";
        }
        return JSON.toJSONString(msg);
    }

    @RequestMapping("/toSelectUserList")
    @ResponseBody
    public String toSelectUserList(int pageNo,int pageSize){
        PageInfo pageInfo=userService.toSelectUserList(pageNo,pageSize);
        return JSON.toJSONString(pageInfo.getList());
    }

    @RequestMapping("/toSelectAllUserList")
    @ResponseBody
    public String toSelectAllUserList(int pageNo,int pageSize){
        PageInfo pageInfo=userService.toSelectAllUserList(pageNo,pageSize);
        return JSON.toJSONString(pageInfo.getList());
    }

    @RequestMapping("/toDelete")
    @ResponseBody
    public void toDelete(int userId){
        userService.toDelete(userId);
    }

    @RequestMapping("/toUpdateStatus")
    @ResponseBody
    public void toUpdateStatus(User user){
        userService.toUpdateStatus(user);
    }


}
