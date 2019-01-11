package com.jie.literature.service;

import com.jie.literature.domain.Fabulous;

import java.util.List;

public interface FabulousService {
    //点赞
    public void toInsertFab(Fabulous fabulous);
    //取消赞
    public void toUpdateFab(Fabulous fabulous);
    //获取赞
    List<Fabulous> toSelectFabList(int fabAid);



}
