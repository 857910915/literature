package com.jie.literature.service.impl;

import com.jie.literature.domain.Fabulous;
import com.jie.literature.mapper.FabulousMapper;
import com.jie.literature.service.FabulousService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FabulousServiceImpl implements FabulousService {
    @Autowired
    private FabulousMapper fabulousMapper;
    @Override
    public void toInsertFab(Fabulous fabulous) {
        fabulousMapper.insertSelective(fabulous);
    }

    @Override
    public void toUpdateFab(Fabulous fabulous) {
        fabulousMapper.updateByPrimaryKeySelective(fabulous);
    }

    @Override
    public List<Fabulous> toSelectFabList(int fabAid) {
        List<Fabulous>list=fabulousMapper.toSelectFabList1(fabAid);
        return list;
    }
}
