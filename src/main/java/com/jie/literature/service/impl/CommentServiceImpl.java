package com.jie.literature.service.impl;

import com.jie.literature.domain.Comment;
import com.jie.literature.mapper.CommentMapper;
import com.jie.literature.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    private CommentMapper commentMapper;
    @Override
    public List<Comment> toSelectCommentList(int comAid) {
        List list=commentMapper.toSelectCommentList(comAid);
        return list;
    }

    @Override
    public void toInsertComment(Comment comment) {
        commentMapper.insertSelective(comment);
    }
}
