package com.jie.literature.service;

import com.github.pagehelper.PageInfo;
import com.jie.literature.domain.Comment;

import java.util.List;

public interface CommentService {
    //查询文章评论
    List<Comment> toSelectCommentList(int comAid);
    //评论
    void toInsertComment(Comment comment);
    //查询全部评论
    PageInfo<Comment> toSelectAllComList(Comment comment,int pageNo,int pageSize);
    //修改评论
    void toUpdateCom(Comment comment);

}
