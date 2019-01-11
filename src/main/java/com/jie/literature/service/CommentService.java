package com.jie.literature.service;

import com.jie.literature.domain.Comment;

import java.util.List;

public interface CommentService {
    //查询文章评论
    List<Comment> toSelectCommentList(int comAid);
    //评论
    void toInsertComment(Comment comment);
}
