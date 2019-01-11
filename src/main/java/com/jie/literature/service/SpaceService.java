package com.jie.literature.service;


import com.jie.literature.domain.Space;

public interface SpaceService {
    //添加空间描述
    public void toInsertSpace(Space space);
    //更新空间描述
    public void toUpdateSpace(Space space);
    //查询空间信息
    public Space toSelectSpace(int spaceUid);

}
