package com.jie.literature.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jie.literature.domain.Roundsow;
import com.jie.literature.mapper.RoundsowMapper;
import com.jie.literature.service.RoundsowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RoundsowServiceImpl implements RoundsowService {
    @Autowired
    private RoundsowMapper roundsowMapper;

    @Override
    public void toAdd(Roundsow roundsow) {
        roundsowMapper.insertSelective(roundsow);
    }

    @Override
    public PageInfo<Roundsow> toShow(int pageNo, int pageSize) {
        PageHelper.startPage(pageNo, pageSize);
        List<Roundsow>list=roundsowMapper.toShow();
        PageInfo<Roundsow>pageInfo=new PageInfo<>(list);
        return pageInfo;
    }

    @Override
    public int toUpdataStatus(Roundsow roundsow) {
        int num=roundsowMapper.updateByPrimaryKey(roundsow);
        return num;
    }

    @Override
    public void toDelete(int RounId) {
        roundsowMapper.deleteByPrimaryKey(RounId);
    }

    @Override
    public PageInfo<Roundsow> toQuery(int rounStatus, int pageNo, int pageSize) {
        PageHelper.startPage(pageNo, pageSize);
        List<Roundsow>list=roundsowMapper.toQuery(rounStatus);
        PageInfo<Roundsow>pageInfo=new PageInfo<>(list);
        return pageInfo;
    }

    @Override
    public Roundsow toGetOne(int rounId) {
        Roundsow roundsow=roundsowMapper.selectByPrimaryKey(rounId);
        return roundsow;
    }
}
