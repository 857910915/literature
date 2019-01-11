package com.jie.literature.domain;

public class Space {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column space.space_id
     *
     * @mbggenerated
     */
    private Integer spaceId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column space.space_name
     *
     * @mbggenerated
     */
    private String spaceName;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column space.space_autograph
     *
     * @mbggenerated
     */
    private String spaceAutograph;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column space.space_introduction
     *
     * @mbggenerated
     */
    private String spaceIntroduction;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column space.space_id
     *
     * @return the value of space.space_id
     *
     * @mbggenerated
     */
    public Integer getSpaceId() {
        return spaceId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column space.space_id
     *
     * @param spaceId the value for space.space_id
     *
     * @mbggenerated
     */
    public void setSpaceId(Integer spaceId) {
        this.spaceId = spaceId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column space.space_name
     *
     * @return the value of space.space_name
     *
     * @mbggenerated
     */
    public String getSpaceName() {
        return spaceName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column space.space_name
     *
     * @param spaceName the value for space.space_name
     *
     * @mbggenerated
     */
    public void setSpaceName(String spaceName) {
        this.spaceName = spaceName == null ? null : spaceName.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column space.space_autograph
     *
     * @return the value of space.space_autograph
     *
     * @mbggenerated
     */
    public String getSpaceAutograph() {
        return spaceAutograph;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column space.space_autograph
     *
     * @param spaceAutograph the value for space.space_autograph
     *
     * @mbggenerated
     */
    public void setSpaceAutograph(String spaceAutograph) {
        this.spaceAutograph = spaceAutograph == null ? null : spaceAutograph.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column space.space_introduction
     *
     * @return the value of space.space_introduction
     *
     * @mbggenerated
     */
    public String getSpaceIntroduction() {
        return spaceIntroduction;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column space.space_introduction
     *
     * @param spaceIntroduction the value for space.space_introduction
     *
     * @mbggenerated
     */
    public void setSpaceIntroduction(String spaceIntroduction) {
        this.spaceIntroduction = spaceIntroduction == null ? null : spaceIntroduction.trim();
    }
}