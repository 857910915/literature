package com.jie.literature.service;

import com.jie.literature.domain.Sign;

public interface SignService {
    //签到
    public void toSign(Sign sign);
//    查询签到
    public Sign toFindSign(int signUid,String time);
}
