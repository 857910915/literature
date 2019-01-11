package com.jie.literature.domain;

import java.util.Date;

public class News {
    private Integer newsId;

    private Integer newsSuid;

    private Integer newsRuid;

    private String newsTitle;

    private String newsText;

    private Integer newsStatus;

    private Date newsCreatetime;

    private User suser;

    private User ruser;

    private Article article;

    public User getSuser() {
        return suser;
    }

    public void setSuser(User suser) {
        this.suser = suser;
    }

    public User getRuser() {
        return ruser;
    }

    public void setRuser(User ruser) {
        this.ruser = ruser;
    }

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public Integer getNewsId() {
        return newsId;
    }

    public void setNewsId(Integer newsId) {
        this.newsId = newsId;
    }

    public Integer getNewsSuid() {
        return newsSuid;
    }

    public void setNewsSuid(Integer newsSuid) {
        this.newsSuid = newsSuid;
    }

    public Integer getNewsRuid() {
        return newsRuid;
    }

    public void setNewsRuid(Integer newsRuid) {
        this.newsRuid = newsRuid;
    }

    public String getNewsTitle() {
        return newsTitle;
    }

    public void setNewsTitle(String newsTitle) {
        this.newsTitle = newsTitle == null ? null : newsTitle.trim();
    }

    public String getNewsText() {
        return newsText;
    }

    public void setNewsText(String newsText) {
        this.newsText = newsText == null ? null : newsText.trim();
    }

    public Integer getNewsStatus() {
        return newsStatus;
    }

    public void setNewsStatus(Integer newsStatus) {
        this.newsStatus = newsStatus;
    }

    public Date getNewsCreatetime() {
        return newsCreatetime;
    }

    public void setNewsCreatetime(Date newsCreatetime) {
        this.newsCreatetime = newsCreatetime;
    }
}