package com.jie.literature.mapper;

import com.jie.literature.domain.Permission;
import com.jie.literature.domain.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface UserMapper {
    int deleteByPrimaryKey(Integer userId);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Integer userId);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);
    //用户注册
    public void toRegister(User user);
    //查找用户名
    public User toSelectUser(String username);
    //通过用户code查找权限列表
    public List<Permission> findPermission(String username);
    //获取用户列表
    public List<User> toSelectUserList();
}