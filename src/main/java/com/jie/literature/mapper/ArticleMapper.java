package com.jie.literature.mapper;

import com.github.pagehelper.PageInfo;
import com.jie.literature.domain.Article;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface ArticleMapper {
    int deleteByPrimaryKey(Integer artId);

    int insert(Article record);

    int insertSelective(Article record);

    Article selectByPrimaryKey(Integer artId);

    int updateByPrimaryKeySelective(Article record);

    int updateByPrimaryKey(Article record);

    List<Article> toSelectArticleList(Article article);
    List<Article> toSelectArticleList1(Article article);
    List<Article> toSelectAllArticle();
}