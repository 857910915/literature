package com.jie.literature.service.impl;

import com.jie.literature.domain.Sign;
import com.jie.literature.mapper.SignMapper;
import com.jie.literature.service.SignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SignServiceImpl implements SignService {
    @Autowired
    private SignMapper signMapper;

    @Override
    public void toSign(Sign sign) {
        signMapper.insertSelective(sign);
    }

    @Override
    public Sign toFindSign(int signUid,String time) {
        Sign sign=signMapper.toFindSign(signUid,time);
        return sign;
    }
}
