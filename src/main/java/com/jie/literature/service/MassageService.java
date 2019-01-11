package com.jie.literature.service;

import com.github.pagehelper.PageInfo;
import com.jie.literature.domain.Article;
import com.jie.literature.domain.Massage;

import java.util.List;

public interface MassageService {

    //写留言
    public void toSendMsg(Massage massage);
    //查看留言列表
    public PageInfo<Massage>toSelectMsgList(Massage massage, Integer pageNum, Integer pageSize);
    //查看全部留言
    public List<Massage>toSelectAllMsgList(Massage massage);
    //删除留言
    public void toDeleteMsg(int msgId);
    //改变留言状态
    public void toUpdateMsg(Massage massage);
}
