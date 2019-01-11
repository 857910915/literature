package com.jie.literature.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jie.literature.domain.Follow;
import com.jie.literature.domain.Permission;
import com.jie.literature.domain.Space;
import com.jie.literature.domain.User;
import com.jie.literature.mapper.FollowMapper;
import com.jie.literature.mapper.SpaceMapper;
import com.jie.literature.mapper.UserMapper;
import com.jie.literature.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service(value = "userService")
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private FollowMapper followMapper;
    @Autowired
    private SpaceMapper spaceMapper;
    @Override
    public String toRegister(User user,String code1,HttpServletRequest request) {
        String msg="验证码错误！";
        HttpSession session=request.getSession();
        String code= (String) session.getAttribute("code");
        if (code1.equalsIgnoreCase(code)){
            user.setUserImg("img/portrait.jpg");
            user.setUserNickname("用户"+user.getUsername());
            User user1=userMapper.toSelectUser(user.getUsername());
            if (user1!=null){
                msg="账号已经存在！";
            }else {
                userMapper.toRegister(user);
                msg="注册成功！";
            }
        }
        return msg;
    }

    @Override
    public List<Map> toLogin(String username, String password, HttpServletRequest request) {
        String code="1000";
        String msg="账号不存在";
        Map<String,String>map=new HashMap<>();
        List<Map>list=new ArrayList<>();
        User user=userMapper.toSelectUser(username);
        if (user ==null){
            code="1000";
            msg="账号不存在！";
        }else {
            if (user.getPassword().equals(password)){
                if (user.getUserStatus()==0){
                    code="1002";
                    msg="登录成功！";
                }else if (user.getUserStatus()==1){
                    code="1003";
                    msg="账号已被冻结！";
                }else if (user.getUserStatus()==2){
                    code="1004";
                    msg="账号即将被销毁";
                }
            }else {
                code="1001";
                msg="密码不正确！";
            }
        }
        map.put(code,msg);
        list.add(map);
        return list;
    }

    @Override
    public User findUser(String username) {
        User user=userMapper.toSelectUser(username);
        Follow follow=new Follow();
        List<Follow>list=followMapper.selectFollowList1(user.getUserId());
        Space space=spaceMapper.selectByPrimaryKey(user.getUserId());
        user.setFollowList(list);
        user.setSpace(space);
        return user;
    }

    @Override
    public User findUser1(int userId) {
        User user=userMapper.selectByPrimaryKey(userId);
        List<Follow>list=followMapper.selectFollowList1(user.getUserId());
        Space space=spaceMapper.selectByPrimaryKey(user.getUserId());
        user.setFollowList(list);
        user.setSpace(space);
        return user;
    }

    @Override
    public List<Permission> findPermission(String username) {
        return userMapper.findPermission(username);
    }

    @Override
    public int updateUser(User user) {
        int num=userMapper.updateByPrimaryKeySelective(user);
        return num;
    }

    @Override
    public PageInfo toSelectUserList(int pageNo, int pageSize) {
        PageHelper.startPage(pageNo, pageSize);
        List<User>list=userMapper.toSelectUserList();
        PageInfo<User>pageInfo=new PageInfo<>(list);
        return pageInfo;
    }
}
