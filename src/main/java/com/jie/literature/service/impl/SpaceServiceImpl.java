package com.jie.literature.service.impl;

import com.jie.literature.domain.Space;
import com.jie.literature.mapper.SpaceMapper;
import com.jie.literature.service.SpaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SpaceServiceImpl implements SpaceService {
    @Autowired
    private SpaceMapper spaceMapper;


    @Override
    public void toInsertSpace(Space space) {
        spaceMapper.insertSelective(space);
    }

    @Override
    public void toUpdateSpace(Space space) {
        spaceMapper.updateByPrimaryKeySelective(space);
    }

    @Override
    public Space toSelectSpace(int spaceUid) {
        Space space=spaceMapper.selectByPrimaryKey(spaceUid);
        return space;
    }
}
