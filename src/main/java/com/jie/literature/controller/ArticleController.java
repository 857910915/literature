package com.jie.literature.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageInfo;
import com.jie.literature.domain.Article;
import com.jie.literature.domain.News;
import com.jie.literature.domain.User;
import com.jie.literature.service.ArticleService;
import com.jie.literature.service.NewsService;
import com.jie.literature.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/article")
public class ArticleController {
    @Autowired
    private ArticleService articleService;
    @Autowired
    private UserService userService;
    @Autowired
    private NewsService newsService;

    @RequestMapping("/toInsertArticle")
    public String toInsertArticle(Article article){
        Subject subject = SecurityUtils.getSubject();
        String username = (String)subject.getPrincipal();
        User user=userService.findUser(username);
        article.setArtUid(user.getUserId());
        articleService.toInsertArticle(article);
        return JSON.toJSONString("添加成功！") ;
    }
    
    @RequestMapping("/toSelectArticleList")
    public  String toSelectArticleList(Article article,int pageNo,String username){
        if (username==null||username.length()==0){
            Subject subject = SecurityUtils.getSubject();
            username = (String)subject.getPrincipal();
        }
        User user=userService.findUser(username);
        article.setArtUid(user.getUserId());
        PageInfo pageInfo = articleService.selectList(article,pageNo,20);
        return JSON.toJSONString(pageInfo.getList());
    }

    @RequestMapping("/toSelectArticleList2")
    public  String toSelectArticleList2(Article article,int pageNo,int pageSize){
        Subject subject = SecurityUtils.getSubject();
        String username = (String)subject.getPrincipal();
        User user=userService.findUser(username);
        article.setArtUid(user.getUserId());
        PageInfo pageInfo = articleService.selectList(article,pageNo,pageSize);
        return JSON.toJSONString(pageInfo.getList());
    }

    @RequestMapping("/toSelectArticleList1")
    public  String toSelectArticleList1(Article article,int pageNo,int pageSize){
        PageInfo pageInfo = articleService.selectList(article,pageNo,pageSize);
        return JSON.toJSONString(pageInfo.getList());
    }


    @RequestMapping("/toSelectAllArticle")
    public  String toSelectAllArticle(int pageNo,int pageSize){
        PageInfo pageInfo = articleService.toSelectAllArticle(pageNo,pageSize);
        return JSON.toJSONString(pageInfo.getList());
    }

    @RequestMapping("/toFindArticle")
    public String toFindArticle(int artId){
        Article article=articleService.toFindArticle(artId);
//        int artNum=cacheCount(artId);
        return JSON.toJSONString(article);
    }

    @RequestMapping("/toUpdateArticle")
    public String toUpdateArticle(Article article){
        articleService.toUpdateArticle(article);
        return JSON.toJSONString("更新成功！");
    }

    @RequestMapping("/toUpdateArticle1")
    public String toUpdateArticle1(Article article){
        Article article1=articleService.toFindArticle(article.getArtId());
        News news=new News();
        news.setNewsRuid(article1.getArtUid());
        Subject subject = SecurityUtils.getSubject();
        String username = (String)subject.getPrincipal();
        User suser=userService.findUser(username);
        news.setNewsSuid(suser.getUserId());
        if (article.getArtStatus()==0){
            if (article.getArtType().equals(article1.getArtType())){
                return JSON.toJSONString("请完成或放弃修改！");
            }else {
                news.setNewsTitle("修改分类");
                news.setNewsText("您的文章《"+article1.getArtTitle()+"》已移动至--"+article.getArtType()+"--分类");
            }
        }else if (article.getArtStatus()==1){
            news.setNewsTitle("审核通过");
            news.setNewsText("您的文章《"+article1.getArtTitle()+"》通过了审核,积分奖励+10分。");
            User ruser=userService.findUser1(article1.getArtUid());
            ruser.setUserIntegral(ruser.getUserIntegral()+10);
            userService.updateUser(ruser);
        }else if (article.getArtStatus()==2){
            news.setNewsTitle("退稿通知");
            news.setNewsText("您的文章《"+article1.getArtTitle()+"》未通过了审核。");
        }
        articleService.toUpdateArticle(article);
        newsService.toSendNews(news);
        return JSON.toJSONString("更新成功！");
    }

    @RequestMapping("/toDeleteArticle")
    public String toDeleteArticle(int artId){
        articleService.toDeleteArticle(artId);
        return JSON.toJSONString("删除成功！");
    }

//    @RequestMapping(value = "article/{id}",method = RequestMethod. GET)
//    public String detail(@PathVariable int id, ModelMap map){
//        Integer hits = cacheCount(id);
//        return JSON.toJSONString(hits);
//    }

//    private static CacheManager cacheManager = CacheManager.newInstance();
//    private static Long viewArticleTime = System.currentTimeMillis();
//    public Integer cacheCount(int artId){
//        Article article= articleService.toFindArticle(artId);
//        Ehcache cache = cacheManager.getEhcache("dayHits1");
//        Element element = cache.get(artId+"_count");
//        Integer count = 0;
//        if(element!=null){
//            count = (Integer) element.getValue();
//        }else{
//            count = article.getArtNum()== null?0:article.getArtNum();
//        }
//        count++;
//        cache.put(new Element(artId+"_count",count));
//        cache.put(new Element(artId+"_dayHitsDate", new Date()));
//        Long time = System.currentTimeMillis();
//        if(time > (viewArticleTime+ 300000)){
//            viewArticleTime = time;
//            article.setArtNum(count);
//            articleService.toUpdateArticle(article);
//            cache.removeAll();
//        }
//        return count;
//    }
}
