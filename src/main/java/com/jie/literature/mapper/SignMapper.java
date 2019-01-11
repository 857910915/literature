package com.jie.literature.mapper;

import com.jie.literature.domain.Sign;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

@Mapper
@Component
public interface SignMapper {
    int deleteByPrimaryKey(Integer signId);

    int insert(Sign record);

    int insertSelective(Sign record);

    Sign selectByPrimaryKey(Integer signId);

    int updateByPrimaryKeySelective(Sign record);

    int updateByPrimaryKey(Sign record);

    Sign toFindSign(@Param("signUid") int signUid, @Param("time") String time);

}