package com.jie.literature.domain;

import java.util.Date;

public class Comment {
    private Integer comId;

    private Integer comUid;

    private Integer comAid;

    private String comText;

    private Date comCreatetime;

    private Integer comStatus;

    private User user;

    private Article article;

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getComId() {
        return comId;
    }

    public void setComId(Integer comId) {
        this.comId = comId;
    }

    public Integer getComUid() {
        return comUid;
    }

    public void setComUid(Integer comUid) {
        this.comUid = comUid;
    }

    public Integer getComAid() {
        return comAid;
    }

    public void setComAid(Integer comAid) {
        this.comAid = comAid;
    }

    public String getComText() {
        return comText;
    }

    public void setComText(String comText) {
        this.comText = comText == null ? null : comText.trim();
    }

    public Date getComCreatetime() {
        return comCreatetime;
    }

    public void setComCreatetime(Date comCreatetime) {
        this.comCreatetime = comCreatetime;
    }

    public Integer getComStatus() {
        return comStatus;
    }

    public void setComStatus(Integer comStatus) {
        this.comStatus = comStatus;
    }
}