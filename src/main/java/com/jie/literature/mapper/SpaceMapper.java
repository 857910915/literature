package com.jie.literature.mapper;

import com.jie.literature.domain.Space;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

@Mapper
@Component
public interface SpaceMapper {
    int deleteByPrimaryKey(Integer spaceId);

    int insert(Space record);

    int insertSelective(Space record);

    Space selectByPrimaryKey(Integer spaceUid);

    int updateByPrimaryKeySelective(Space record);

    int updateByPrimaryKey(Space record);
}