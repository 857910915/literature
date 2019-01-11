package com.jie.literature.domain;

import java.util.Date;
import java.util.List;

public class Article {
    private Integer artId;

    private String artType;

    private String artTitle;

    private String artText;

    private Integer artUid;

    private Date artCreatetime;

    private Integer artStatus;

    private Integer artFid;

    private String artMsource;

    private Integer artNum;

    //多对一
    private User user;
    //一对多
    private List<Comment> commentList;

    private List<Fabulous> fabulousList;


    public Integer getArtId() {
        return artId;
    }

    public void setArtId(Integer artId) {
        this.artId = artId;
    }

    public List<Comment> getCommentList() {
        return commentList;
    }

    public void setCommentList(List<Comment> commentList) {
        this.commentList = commentList;
    }

    public List<Fabulous> getFabulousList() {
        return fabulousList;
    }

    public void setFabulousList(List<Fabulous> fabulousList) {
        this.fabulousList = fabulousList;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getArtType() {
        return artType;
    }

    public void setArtType(String artType) {
        this.artType = artType == null ? null : artType.trim();
    }

    public String getArtTitle() {
        return artTitle;
    }

    public void setArtTitle(String artTitle) {
        this.artTitle = artTitle == null ? null : artTitle.trim();
    }

    public String getArtText() {
        return artText;
    }

    public void setArtText(String artText) {
        this.artText = artText == null ? null : artText.trim();
    }

    public Integer getArtUid() {
        return artUid;
    }

    public void setArtUid(Integer artUid) {
        this.artUid = artUid;
    }

    public Date getArtCreatetime() {
        return artCreatetime;
    }

    public void setArtCreatetime(Date artCreatetime) {
        this.artCreatetime = artCreatetime;
    }

    public Integer getArtStatus() {
        return artStatus;
    }

    public void setArtStatus(Integer artStatus) {
        this.artStatus = artStatus;
    }

    public Integer getArtFid() {
        return artFid;
    }

    public void setArtFid(Integer artFid) {
        this.artFid = artFid;
    }

    public String getArtMsource() {
        return artMsource;
    }

    public void setArtMsource(String artMsource) {
        this.artMsource = artMsource;
    }

    public Integer getArtNum() {
        return artNum;
    }

    public void setArtNum(Integer artNum) {
        this.artNum = artNum;
    }

}