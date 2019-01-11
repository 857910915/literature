package com.jie.literature.domain;

public class Space {
    private Integer spaceId;

    private String spaceName;

    private String spaceAutograph;

    private String spaceIntroduction;

    private Integer spaceUid;

    public Integer getSpaceId() {
        return spaceId;
    }

    public void setSpaceId(Integer spaceId) {
        this.spaceId = spaceId;
    }

    public String getSpaceName() {
        return spaceName;
    }

    public void setSpaceName(String spaceName) {
        this.spaceName = spaceName == null ? null : spaceName.trim();
    }

    public String getSpaceAutograph() {
        return spaceAutograph;
    }

    public void setSpaceAutograph(String spaceAutograph) {
        this.spaceAutograph = spaceAutograph == null ? null : spaceAutograph.trim();
    }

    public String getSpaceIntroduction() {
        return spaceIntroduction;
    }

    public void setSpaceIntroduction(String spaceIntroduction) {
        this.spaceIntroduction = spaceIntroduction == null ? null : spaceIntroduction.trim();
    }

    public Integer getSpaceUid() {
        return spaceUid;
    }

    public void setSpaceUid(Integer spaceUid) {
        this.spaceUid = spaceUid;
    }
}