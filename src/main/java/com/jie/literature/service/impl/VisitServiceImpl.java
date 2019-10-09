package com.jie.literature.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jie.literature.domain.User;
import com.jie.literature.domain.Visit;
import com.jie.literature.mapper.UserMapper;
import com.jie.literature.mapper.VisitMapper;
import com.jie.literature.service.VisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VisitServiceImpl implements VisitService {
    @Autowired
    private VisitMapper visitMapper;
    @Autowired
    private UserMapper userMapper;

    @Override
    public void toVisit(Visit visit) {
        visitMapper.insertSelective(visit);
    }

    @Override
    public PageInfo<Visit> toSelectVisitList(int visitVuid,int pageNo) {
        List<Visit>list=visitMapper.toSelectVisitList(visitVuid);
        PageHelper.startPage(pageNo, 10);
        PageInfo<Visit>pageInfo=new PageInfo<>(list);
        return pageInfo;
    }

    @Override
    public PageInfo<Visit> toSelectVisitList1(int visitVuid,int pageNo) {
        List<Visit>list=visitMapper.toSelectVisitList1(visitVuid);
        for (int i=0;i<list.size();i++){
            User user=userMapper.selectByPrimaryKey(list.get(i).getVisitUid());
            list.get(i).setUser(user);
        }
        PageHelper.startPage(pageNo, 8);
        PageInfo<Visit>pageInfo=new PageInfo<>(list);
        return pageInfo;
    }
}
