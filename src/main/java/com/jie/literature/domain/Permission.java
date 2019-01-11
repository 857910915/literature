package com.jie.literature.domain;

public class Permission {
    private Integer perId;

    private String perName;

    private String perType;

    private String perUrl;

    private String perCode;

    private Long perParentid;

    private String perParentids;

    private String perSort;

    private Integer perStatus;

    public Integer getPerId() {
        return perId;
    }

    public void setPerId(Integer perId) {
        this.perId = perId;
    }

    public String getPerName() {
        return perName;
    }

    public void setPerName(String perName) {
        this.perName = perName == null ? null : perName.trim();
    }

    public String getPerType() {
        return perType;
    }

    public void setPerType(String perType) {
        this.perType = perType == null ? null : perType.trim();
    }

    public String getPerUrl() {
        return perUrl;
    }

    public void setPerUrl(String perUrl) {
        this.perUrl = perUrl == null ? null : perUrl.trim();
    }

    public String getPerCode() {
        return perCode;
    }

    public void setPerCode(String perCode) {
        this.perCode = perCode == null ? null : perCode.trim();
    }

    public Long getPerParentid() {
        return perParentid;
    }

    public void setPerParentid(Long perParentid) {
        this.perParentid = perParentid;
    }

    public String getPerParentids() {
        return perParentids;
    }

    public void setPerParentids(String perParentids) {
        this.perParentids = perParentids == null ? null : perParentids.trim();
    }

    public String getPerSort() {
        return perSort;
    }

    public void setPerSort(String perSort) {
        this.perSort = perSort == null ? null : perSort.trim();
    }

    public Integer getPerStatus() {
        return perStatus;
    }

    public void setPerStatus(Integer perStatus) {
        this.perStatus = perStatus;
    }
}