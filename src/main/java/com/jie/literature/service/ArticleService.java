package com.jie.literature.service;

import com.github.pagehelper.PageInfo;
import com.jie.literature.domain.Article;

import java.util.List;

public interface ArticleService {
    //添加文章
    public void toInsertArticle(Article article);
    //修改文章
    public void toUpdateArticle(Article article);
    //查询文章
    public Article toFindArticle(int artId);
    //显示文章
    public List<Article> toSelectArticleList(Article article);
    //通过分页插件查询
    public PageInfo selectList(Article article, Integer pageNum, Integer pageSize);
    //删除文章
    public void toDeleteArticle(int artId);
    //查询全部文章
    public PageInfo toSelectAllArticle(int pageNo,int pageSize);
}
