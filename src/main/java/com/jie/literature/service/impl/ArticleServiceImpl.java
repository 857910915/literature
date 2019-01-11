package com.jie.literature.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jie.literature.domain.Article;
import com.jie.literature.domain.Comment;
import com.jie.literature.domain.Fabulous;
import com.jie.literature.domain.User;
import com.jie.literature.mapper.ArticleMapper;
import com.jie.literature.mapper.CommentMapper;
import com.jie.literature.mapper.FabulousMapper;
import com.jie.literature.mapper.UserMapper;
import com.jie.literature.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleServiceImpl implements ArticleService {
    @Autowired
    private ArticleMapper articleMapper;
    @Autowired
    private CommentMapper commentMapper;
    @Autowired
    private FabulousMapper fabulousMapper;
    @Autowired
    private UserMapper userMapper;
    @Override
    public void toInsertArticle(Article article) {
        articleMapper.insertSelective(article);
    }

    @Override
    public void toUpdateArticle(Article article) {
        articleMapper.updateByPrimaryKeySelective(article);
    }

    @Override
    public Article toFindArticle(int artId) {
        Article article=articleMapper.selectByPrimaryKey(artId);
        article.setArtNum(article.getArtNum()+1);
        articleMapper.updateByPrimaryKeySelective(article);
        User user=userMapper.selectByPrimaryKey(article.getArtUid());
        article.setUser(user);
        List<Comment>list1=commentMapper.toSelectCommentList(artId);
        for (int i=0;i<list1.size();i++){
            User user1=userMapper.selectByPrimaryKey(list1.get(i).getComUid());
            list1.get(i).setUser(user1);
        }
        List<Fabulous>list2=fabulousMapper.toSelectFabList(artId);
        article.setCommentList(list1);
        article.setFabulousList(list2);
        return article;
    }

    @Override
    public List<Article> toSelectArticleList(Article article) {
        List list=articleMapper.toSelectArticleList(article);
        return list;
    }

    public PageInfo selectList(Article article,Integer pageNum, Integer pageSize){
        PageHelper.startPage(pageNum, pageSize); // 设定当前页码，以及当前页显示的条数
        //PageHelper.offsetPage(pageNum, pageSize);也可以使用此方式进行设置
        List<Article> list = articleMapper.toSelectArticleList1(article);
        for (int i=0;i<list.size();i++){
            List<Comment>list1=commentMapper.toSelectCommentList(list.get(i).getArtId());
            for (int j=0;j<list1.size();j++){
                User user=userMapper.selectByPrimaryKey(list1.get(j).getComUid());
                list1.get(j).setUser(user);
            }
            List<Fabulous>list2=fabulousMapper.toSelectFabList(list.get(i).getArtId());
            list.get(i).setCommentList(list1);
            list.get(i).setFabulousList(list2);
        }
        PageInfo<Article> pageInfo = new PageInfo<Article>(list);
        return pageInfo;
    }

    @Override
    public void toDeleteArticle(int artId) {
        articleMapper.deleteByPrimaryKey(artId);
    }

    @Override
    public PageInfo toSelectAllArticle(int pageNo, int pageSize) {
        PageHelper.startPage(pageNo, pageSize);
        List<Article>list=articleMapper.toSelectAllArticle();
        PageInfo<Article> pageInfo = new PageInfo<Article>(list);
        return pageInfo;
    }
}
