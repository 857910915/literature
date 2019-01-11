package com.jie.literature.mapper;

import com.jie.literature.domain.Fabulous;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface FabulousMapper {
    int deleteByPrimaryKey(Integer fabId);

    int insert(Fabulous record);

    int insertSelective(Fabulous record);

    Fabulous selectByPrimaryKey(Integer fabId);

    int updateByPrimaryKeySelective(Fabulous record);

    int updateByPrimaryKey(Fabulous record);

    List<Fabulous>toSelectFabList(int fabAid);

    List<Fabulous>toSelectFabList1(int fabAid);
}