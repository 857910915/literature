package com.jie.literature.mapper;

import com.jie.literature.domain.Follow;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface FollowMapper {
    int deleteByPrimaryKey(Integer folId);

    int insert(Follow record);

    int insertSelective(Follow record);

    Follow selectByPrimaryKey(Integer folId);

    int updateByPrimaryKeySelective(Follow record);

    int updateByPrimaryKey(Follow record);

    //查询我关注的人
    public List<Follow> selectFollowList(Follow follow);
    //查询关注我的人
    public List<Follow> selectFollowList1(int userId);
}