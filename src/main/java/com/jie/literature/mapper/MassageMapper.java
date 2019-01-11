package com.jie.literature.mapper;

import com.jie.literature.domain.Massage;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface MassageMapper {
    int deleteByPrimaryKey(Integer msgId);

    int insert(Massage record);

    int insertSelective(Massage record);

    Massage selectByPrimaryKey(Integer msgId);

    int updateByPrimaryKeySelective(Massage record);

    int updateByPrimaryKey(Massage record);

    List<Massage> toSelectAllMsgList(Massage massage);
}