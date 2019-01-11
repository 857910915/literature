package com.jie.literature.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jie.literature.domain.News;
import com.jie.literature.domain.User;
import com.jie.literature.mapper.NewsMapper;
import com.jie.literature.mapper.UserMapper;
import com.jie.literature.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsServiceImpl implements NewsService {
    @Autowired
    private NewsMapper newsMapper;
    @Autowired
    private UserMapper userMapper;
    @Override
    public void toSendNews(News news) {
        newsMapper.insertSelective(news);
    }

    @Override
    public PageInfo<News> toSelectNewsList(News news, Integer pageNum, Integer pageSize) {
        List<News>list=newsMapper.toSelectNewsList(news);
        for (int i=0;i<list.size();i++){
            User suser=userMapper.selectByPrimaryKey(list.get(i).getNewsSuid());
            list.get(i).setSuser(suser);
        }
        PageHelper.startPage(pageNum, pageSize);
        PageInfo<News> pageInfo=new PageInfo<News>(list);
        return pageInfo;
    }

    @Override
    public News toFindNews(int newsId) {
        News news=newsMapper.selectByPrimaryKey(newsId);
        User suser=userMapper.selectByPrimaryKey(news.getNewsSuid());
        news.setSuser(suser);
        return news;
    }

    @Override
    public void toUpdateNews(News news) {
        newsMapper.updateByPrimaryKeySelective(news);
    }

    @Override
    public void toDeleteNews(int newsId) {
        newsMapper.deleteByPrimaryKey(newsId);
    }
}
