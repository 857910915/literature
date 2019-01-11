package com.jie.literature.service;

import com.github.pagehelper.PageInfo;
import com.jie.literature.domain.Visit;

import java.util.List;

public interface VisitService {
    //添加访客
    public void toVisit(Visit visit);
    //查询访问量
    public PageInfo<Visit> toSelectVisitList(int visitVuid,int pageNo);
    //查询访客
    public PageInfo<Visit> toSelectVisitList1(int visitVuid,int pageNo);
}
