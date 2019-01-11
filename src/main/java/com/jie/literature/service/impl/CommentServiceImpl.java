package com.jie.literature.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jie.literature.domain.Article;
import com.jie.literature.domain.User;
import com.jie.literature.domain.Comment;
import com.jie.literature.mapper.ArticleMapper;
import com.jie.literature.mapper.CommentMapper;
import com.jie.literature.mapper.UserMapper;
import com.jie.literature.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    private CommentMapper commentMapper;
    @Autowired
    private ArticleMapper articleMapper;
    @Autowired
    private UserMapper userMapper;
    @Override
    public List<Comment> toSelectCommentList(int comAid) {
        List list=commentMapper.toSelectCommentList(comAid);
        return list;
    }

    @Override
    public void toInsertComment(Comment comment) {
        commentMapper.insertSelective(comment);
    }

    @Override
    public PageInfo<Comment> toSelectAllComList(Comment comment, int pageNo, int pageSize) {
        PageHelper.startPage(pageNo, pageSize);
        List<Comment>list=commentMapper.toSelectAllComList(comment);
        for (int i=0;i<list.size();i++){
            Article article=articleMapper.selectByPrimaryKey(list.get(i).getComAid());
            User user=userMapper.selectByPrimaryKey(list.get(i).getComUid());
            list.get(i).setUser(user);
            list.get(i).setArticle(article);
        }
        PageInfo<Comment>pageInfo=new PageInfo<>(list);
        return pageInfo;
    }

    @Override
    public void toUpdateCom(Comment comment) {
        commentMapper.updateByPrimaryKeySelective(comment);
    }
}
