package com.jie.literature.service;

import com.github.pagehelper.PageInfo;
import com.jie.literature.domain.Massage;
import com.jie.literature.domain.News;

public interface NewsService {
    //发送信息
    public void toSendNews(News news);
    //查看信息列表
    public PageInfo<News> toSelectNewsList(News news, Integer pageNum, Integer pageSize);
    //查看信息
    public News toFindNews(int newsId);
    //改变状态
    public void toUpdateNews(News news);
    //删除消息
    public void toDeleteNews(int newsId);
}
