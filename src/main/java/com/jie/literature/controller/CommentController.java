package com.jie.literature.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageInfo;
import com.jie.literature.domain.Article;
import com.jie.literature.domain.Comment;
import com.jie.literature.domain.User;
import com.jie.literature.service.CommentService;
import com.jie.literature.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/comment")
public class CommentController {
    @Autowired
    private CommentService commentService;
    @Autowired
    private UserService userService;

    @RequestMapping("/toInsertComment")
    public String toInsertComment(Comment comment){
        Subject subject = SecurityUtils.getSubject();
        String username = (String)subject.getPrincipal();
        User user=userService.findUser(username);
        comment.setComUid(user.getUserId());
        commentService.toInsertComment(comment);
        return JSON.toJSONString("评论成功！");
    }

    @RequestMapping("/toSelectAllComList")
    public String toSelectAllComList(Comment comment,int pageNo,int pageSize){
        PageInfo pageInfo=commentService.toSelectAllComList(comment,pageNo,pageSize);
        return JSON.toJSONString(pageInfo.getList());
    }

    @RequestMapping("/toUpdateCom")
    public String toUpdateCom(Comment comment){
        String msg="已删除";
        if (comment.getComStatus()==0){
            msg="已恢复";
        }
        commentService.toUpdateCom(comment);
        return JSON.toJSONString(msg);
    }



}
