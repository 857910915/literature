package com.jie.literature.service.impl;


import com.jie.literature.domain.UserRole;
import com.jie.literature.mapper.UserRoleMapper;
import com.jie.literature.service.UserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserRoleServiceImpl implements UserRoleService {
    @Autowired
    private UserRoleMapper userRoleMapper;

    @Override
    public void toInsertUserRole(UserRole userRole) {
        userRoleMapper.insertSelective(userRole);
    }
}
