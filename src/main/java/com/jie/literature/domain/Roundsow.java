package com.jie.literature.domain;

import java.util.Date;

public class Roundsow {
    private Integer rounId;

    private String rounImg;

    private String rpunType;

    private Date rounCreatetime;

    private Integer rounSort;

    private Integer rounStatus;

    public Integer getRounId() {
        return rounId;
    }

    public void setRounId(Integer rounId) {
        this.rounId = rounId;
    }

    public String getRounImg() {
        return rounImg;
    }

    public void setRounImg(String rounImg) {
        this.rounImg = rounImg == null ? null : rounImg.trim();
    }

    public String getRpunType() {
        return rpunType;
    }

    public void setRpunType(String rpunType) {
        this.rpunType = rpunType == null ? null : rpunType.trim();
    }

    public Date getRounCreatetime() {
        return rounCreatetime;
    }

    public void setRounCreatetime(Date rounCreatetime) {
        this.rounCreatetime = rounCreatetime;
    }

    public Integer getRounSort() {
        return rounSort;
    }

    public void setRounSort(Integer rounSort) {
        this.rounSort = rounSort;
    }

    public Integer getRounStatus() {
        return rounStatus;
    }

    public void setRounStatus(Integer rounStatus) {
        this.rounStatus = rounStatus;
    }
}