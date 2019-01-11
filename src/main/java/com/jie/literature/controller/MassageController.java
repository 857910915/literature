package com.jie.literature.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jie.literature.domain.Massage;
import com.jie.literature.domain.User;
import com.jie.literature.service.MassageService;
import com.jie.literature.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/msg")
public class MassageController {
    @Autowired
    private MassageService massageService;
    @Autowired
    private UserService userService;

    @RequestMapping("/toSendMsg")
    public String toSendMsg(Massage massage,String rusername){
        Subject subject = SecurityUtils.getSubject();
        if (rusername==null||rusername.length()==0){
            rusername = (String)subject.getPrincipal();
        }
        User ruser=userService.findUser(rusername);
        String susername=(String)subject.getPrincipal();
        User suser=userService.findUser(susername);
        massage.setMsgRuid(ruser.getUserId());
        massage.setMsgSuid(suser.getUserId());
        massageService.toSendMsg(massage);
        return JSON.toJSONString("留言成功！");
    }

    @RequestMapping("/toSelectMsgList")
    public String toSelectMsgList(Massage massage,String rusername,int pageNo){
        Subject subject = SecurityUtils.getSubject();
        if (rusername==null||rusername.length()==0){
            rusername = (String)subject.getPrincipal();
        }
        User ruser=userService.findUser(rusername);
        massage.setMsgRuid(ruser.getUserId());
        PageInfo pageInfo=massageService.toSelectMsgList(massage,pageNo,20);
        return JSON.toJSONString(pageInfo.getList());
    }

    @RequestMapping("/toSelectAllMsgList")
    public String toSelectAllMsgList(Massage massage,String rusername){
        Subject subject = SecurityUtils.getSubject();
        if (rusername==null||rusername.length()==0){
            rusername = (String)subject.getPrincipal();
        }
        User ruser=userService.findUser(rusername);
        massage.setMsgRuid(ruser.getUserId());
        List list =massageService.toSelectAllMsgList(massage);
        return JSON.toJSONString(list);
    }

    @RequestMapping("/toSelectAllMsgList1")
    public String toSelectAllMsgList1(Massage massage,int pageNo,int pageSize){
        List list =massageService.toSelectAllMsgList(massage);
        PageHelper.startPage(pageNo, pageSize);
        PageInfo<Massage>pageInfo=new PageInfo<>(list);
        return JSON.toJSONString(pageInfo.getList());
    }

    @RequestMapping("/toDeleteMsg")
    public String toDeleteMsg(int msgId){
        massageService.toDeleteMsg(msgId);
        return JSON.toJSONString("删除成功！");
    }

    @RequestMapping("/toUpdateMsg")
    public String toUpdateMsg(Massage massage){
        String msg="已删除";
        if (massage.getMsgStatus()==0){
            msg="已恢复";
        }
        massageService.toUpdateMsg(massage);
        return JSON.toJSONString(msg);
    }

}
