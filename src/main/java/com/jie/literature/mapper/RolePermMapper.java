package com.jie.literature.mapper;

import com.jie.literature.domain.RolePerm;

public interface RolePermMapper {
    int deleteByPrimaryKey(Integer rpId);

    int insert(RolePerm record);

    int insertSelective(RolePerm record);

    RolePerm selectByPrimaryKey(Integer rpId);

    int updateByPrimaryKeySelective(RolePerm record);

    int updateByPrimaryKey(RolePerm record);
}