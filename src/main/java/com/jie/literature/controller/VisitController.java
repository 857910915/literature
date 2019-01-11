package com.jie.literature.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageInfo;
import com.jie.literature.domain.User;
import com.jie.literature.domain.Visit;
import com.jie.literature.mapper.VisitMapper;
import com.jie.literature.service.UserService;
import com.jie.literature.service.VisitService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/visit")
public class VisitController {
    @Autowired
    private VisitService visitService;
    @Autowired
    private UserService userService;

    @RequestMapping("/toVisit")
    public void toVisit(Visit visit,String vusername){
        Subject subject = SecurityUtils.getSubject();
        if (vusername==null||vusername.length()==0){
            vusername = (String)subject.getPrincipal();
        }
        User vuser=userService.findUser(vusername);
        visit.setVisitVuid(vuser.getUserId());
        String username=(String)subject.getPrincipal();
        User user=userService.findUser(username);
        visit.setVisitUid(user.getUserId());

        visitService.toVisit(visit);
    }

    @RequestMapping("toSelectVisitList")
    public String toSelectVisitList(String vusername,int pageNo){
        Subject subject = SecurityUtils.getSubject();
        if (vusername==null||vusername.length()==0){
            vusername = (String)subject.getPrincipal();
        }
        User vuser=userService.findUser(vusername);
        PageInfo<Visit>pageInfo=visitService.toSelectVisitList(vuser.getUserId(),pageNo);
        return JSON.toJSONString(pageInfo.getList());
    }

    @RequestMapping("toSelectVisitList1")
    public String toSelectVisitList1(String vusername,int pageNo){
        Subject subject = SecurityUtils.getSubject();
        if (vusername==null||vusername.length()==0){
            vusername = (String)subject.getPrincipal();
        }
        User vuser=userService.findUser(vusername);
        PageInfo<Visit>pageInfo=visitService.toSelectVisitList1(vuser.getUserId(),pageNo);
        return JSON.toJSONString(pageInfo.getList());
    }
}
