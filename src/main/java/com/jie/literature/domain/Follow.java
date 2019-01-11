package com.jie.literature.domain;

import java.util.Date;

public class Follow {
    private Integer folId;

    private Integer folUid;

    private Integer folUserid;

    private Date folCreatetime;

    private Integer folStatus;

    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getFolId() {
        return folId;
    }

    public void setFolId(Integer folId) {
        this.folId = folId;
    }

    public Integer getFolUid() {
        return folUid;
    }

    public void setFolUid(Integer folUid) {
        this.folUid = folUid;
    }

    public Integer getFolUserid() {
        return folUserid;
    }

    public void setFolUserid(Integer folUserid) {
        this.folUserid = folUserid;
    }

    public Date getFolCreatetime() {
        return folCreatetime;
    }

    public void setFolCreatetime(Date folCreatetime) {
        this.folCreatetime = folCreatetime;
    }

    public Integer getFolStatus() {
        return folStatus;
    }

    public void setFolStatus(Integer folStatus) {
        this.folStatus = folStatus;
    }
}