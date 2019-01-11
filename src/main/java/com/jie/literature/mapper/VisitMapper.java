package com.jie.literature.mapper;

import com.jie.literature.domain.Visit;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface VisitMapper {
    int deleteByPrimaryKey(Integer visitId);

    int insert(Visit record);

    int insertSelective(Visit record);

    Visit selectByPrimaryKey(Integer visitId);

    int updateByPrimaryKeySelective(Visit record);

    int updateByPrimaryKey(Visit record);

    List<Visit>toSelectVisitList(int visitVuid);

    List<Visit>toSelectVisitList1(int visitVuid);
}