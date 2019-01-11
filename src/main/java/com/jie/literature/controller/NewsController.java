package com.jie.literature.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageInfo;
import com.jie.literature.domain.News;
import com.jie.literature.domain.User;
import com.jie.literature.service.NewsService;
import com.jie.literature.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/news")
public class NewsController {
    @Autowired
    private NewsService newsService;
    @Autowired
    private UserService userService;

    @RequestMapping("/toSelectNewsList")
    public String toSelectNewsList(News news,int pageNo,int pageSize){
        Subject subject = SecurityUtils.getSubject();
        String username = (String)subject.getPrincipal();
        User user=userService.findUser(username);
        news.setNewsRuid(user.getUserId());
        PageInfo<News>pageInfo=newsService.toSelectNewsList(news,pageNo,pageSize);
        return JSON.toJSONString(pageInfo.getList());
    }

    @RequestMapping("/toFindNews")
    public String toFindNews(int newsId){
        News news=newsService.toFindNews(newsId);
        return JSON.toJSONString(news);
    }

    @RequestMapping("/toUpdateNews")
    public void toUpdateNews(News news){
        news.setNewsStatus(1);
        newsService.toUpdateNews(news);
    }

    @RequestMapping("/toDeleteNews")
    public String toDeleteNews(int newsId){
        newsService.toDeleteNews(newsId);
        return JSON.toJSONString("删除成功！");
    }
}
