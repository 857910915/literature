package com.jie.literature.service.impl;

import com.jie.literature.domain.Fabulous;
import com.jie.literature.domain.Follow;
import com.jie.literature.domain.User;
import com.jie.literature.mapper.FollowMapper;
import com.jie.literature.mapper.UserMapper;
import com.jie.literature.service.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FollowServiceImpl implements FollowService {
    @Autowired
    private FollowMapper followMapper;
    @Autowired
    private UserMapper userMapper;
    @Override
    public List<Follow> selectFollowList(Follow follow) {
        List<Follow>list=followMapper.selectFollowList(follow);
        return list;
    }

    @Override
    public List<Follow> selectFollowList1(int userId) {
        List<Follow>list=followMapper.selectFollowList1(userId);
        return list;
    }

    @Override
    public void toGuanzhu(Follow follow) {
        followMapper.insertSelective(follow);
    }

    @Override
    public void toEditGuanzhu(Follow follow) {
        followMapper.updateByPrimaryKeySelective(follow);
    }
}
