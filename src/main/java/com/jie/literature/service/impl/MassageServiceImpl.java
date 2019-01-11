package com.jie.literature.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jie.literature.domain.Massage;
import com.jie.literature.domain.User;
import com.jie.literature.mapper.MassageMapper;
import com.jie.literature.mapper.UserMapper;
import com.jie.literature.service.MassageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PreDestroy;
import java.util.List;

@Service
public class MassageServiceImpl implements MassageService {
    @Autowired
    private MassageMapper massageMapper;
    @Autowired
    private UserMapper userMapper;
    @Override

    public void toSendMsg(Massage massage) {
        massageMapper.insertSelective(massage);
    }

    @Override
    public PageInfo<Massage> toSelectMsgList(Massage massage, Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        massage.setMsgStatus(0);
        List<Massage>list=massageMapper.toSelectAllMsgList(massage);
        for (int i=0;i<list.size();i++){
            User suser=userMapper.selectByPrimaryKey(list.get(i).getMsgSuid());
            list.get(i).setSuser(suser);
        }
        PageInfo<Massage>pageInfo=new PageInfo<>(list);
        return pageInfo;
    }

    @Override
    public List<Massage> toSelectAllMsgList(Massage massage) {
        List<Massage>list=massageMapper.toSelectAllMsgList(massage);
        for (int i=0;i<list.size();i++){
            User suser=userMapper.selectByPrimaryKey(list.get(i).getMsgSuid());
            list.get(i).setSuser(suser);
        }
        return list;
    }

    @Override
    public void toDeleteMsg(int msgId) {
        massageMapper.deleteByPrimaryKey(msgId);
    }

    @Override
    public void toUpdateMsg(Massage massage) {
        massageMapper.updateByPrimaryKeySelective(massage);
    }
}
