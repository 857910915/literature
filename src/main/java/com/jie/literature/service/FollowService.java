package com.jie.literature.service;

import com.jie.literature.domain.Fabulous;
import com.jie.literature.domain.Follow;

import java.util.List;

public interface FollowService {
    //查询关注我的人
    public List<Follow> selectFollowList(Follow follow);
    //查询我关注的人
    public List<Follow> selectFollowList1(int userId);
    //添加关注
    public void toGuanzhu(Follow follow);
    //改变
    public void toEditGuanzhu(Follow follow);
}
