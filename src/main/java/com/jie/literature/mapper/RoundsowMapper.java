package com.jie.literature.mapper;

import com.jie.literature.domain.Roundsow;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

@Mapper
@Component
public interface RoundsowMapper {
    int deleteByPrimaryKey(Integer rounId);

    int insert(Roundsow record);

    int insertSelective(Roundsow record);

    Roundsow selectByPrimaryKey(Integer rounId);

    int updateByPrimaryKeySelective(Roundsow record);

    int updateByPrimaryKey(Roundsow record);
}