package com.jie.literature.domain;

import java.util.Date;

public class Massage {
    private Integer msgId;

    private Integer msgSuid;

    private String msgText;

    private Date msgCreatetime;

    private Integer msgRuid;

    private Integer msgStatus;

    private User suser;

    private User ruser;

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

    public Integer getMsgId() {
        return msgId;
    }

    public void setMsgId(Integer msgId) {
        this.msgId = msgId;
    }

    public Integer getMsgSuid() {
        return msgSuid;
    }

    public void setMsgSuid(Integer msgSuid) {
        this.msgSuid = msgSuid;
    }

    public String getMsgText() {
        return msgText;
    }

    public void setMsgText(String msgText) {
        this.msgText = msgText == null ? null : msgText.trim();
    }

    public Date getMsgCreatetime() {
        return msgCreatetime;
    }

    public void setMsgCreatetime(Date msgCreatetime) {
        this.msgCreatetime = msgCreatetime;
    }

    public Integer getMsgRuid() {
        return msgRuid;
    }

    public void setMsgRuid(Integer msgRuid) {
        this.msgRuid = msgRuid;
    }

    public Integer getMsgStatus() {
        return msgStatus;
    }

    public void setMsgStatus(Integer msgStatus) {
        this.msgStatus = msgStatus;
    }
}