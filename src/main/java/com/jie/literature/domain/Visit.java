package com.jie.literature.domain;

import java.util.Date;

public class Visit {
    private Integer visitId;

    private Integer visitUid;

    private Integer visitVuid;

    private Date visitCreatetime;

    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getVisitId() {
        return visitId;
    }

    public void setVisitId(Integer visitId) {
        this.visitId = visitId;
    }

    public Integer getVisitUid() {
        return visitUid;
    }

    public void setVisitUid(Integer visitUid) {
        this.visitUid = visitUid;
    }

    public Integer getVisitVuid() {
        return visitVuid;
    }

    public void setVisitVuid(Integer visitVuid) {
        this.visitVuid = visitVuid;
    }

    public Date getVisitCreatetime() {
        return visitCreatetime;
    }

    public void setVisitCreatetime(Date visitCreatetime) {
        this.visitCreatetime = visitCreatetime;
    }
}