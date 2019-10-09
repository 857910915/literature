package com.jie.literature.service;

import com.github.pagehelper.PageInfo;
import com.jie.literature.domain.Roundsow;

public interface RoundsowService {
    //上传图片
    public void toAdd(Roundsow roundsow);
    //获取图片信息
    public PageInfo<Roundsow> toShow(int pageNo, int pageSize);
    //修改图片状态
    public int toUpdataStatus(Roundsow roundsow);
    //删除图片
    public void toDelete(int id);
    //搜索图片
    public PageInfo<Roundsow> toQuery(int rounStatus,int pageNo, int pageSize);
    //获取一张图片
    public Roundsow toGetOne(int rounId);
}
