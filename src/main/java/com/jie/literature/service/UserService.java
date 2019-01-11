package com.jie.literature.service;

import com.github.pagehelper.PageInfo;
import com.jie.literature.domain.Permission;
import com.jie.literature.domain.User;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

public interface UserService{
    //用户注册
    public String toRegister(User user,String code1,HttpServletRequest request);
    //用户登录
    public List<Map> toLogin(String username, String password, HttpServletRequest request);
    //通过用户code查找用户对象
    public User findUser(String username);
    public User findUser1(int userId);
    //通过用户code查找权限列表
    public List<Permission> findPermission(String username);
    //更新用户信息
    public int updateUser(User user);
    //获取用户列表
    public PageInfo toSelectUserList(int pageNo,int pageSize);
}
