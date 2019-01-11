package com.jie.literature.domain;

import java.util.Date;

public class Sign {
    private Integer signId;

    private Integer signUid;

    private Date signCreatetime;

    private Integer signStatus;

    public Integer getSignId() {
        return signId;
    }

    public void setSignId(Integer signId) {
        this.signId = signId;
    }

    public Integer getSignUid() {
        return signUid;
    }

    public void setSignUid(Integer signUid) {
        this.signUid = signUid;
    }

    public Date getSignCreatetime() {
        return signCreatetime;
    }

    public void setSignCreatetime(Date signCreatetime) {
        this.signCreatetime = signCreatetime;
    }

    public Integer getSignStatus() {
        return signStatus;
    }

    public void setSignStatus(Integer signStatus) {
        this.signStatus = signStatus;
    }
}