package com.jie.literature.shiro;



import com.jie.literature.domain.Permission;
import com.jie.literature.domain.User;
import com.jie.literature.service.UserService;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Created by Administrator on 2018/12/24 0024.
 */
public class MyShiroRealm extends AuthorizingRealm {
    @Autowired
    private UserService userService;

    //给当前realm起个名
    @Override
    public String getName() {
        return "customReam";
    }
    //支持UsernamePasswordToken
    @Override
    public boolean supports(AuthenticationToken token) {
        return token instanceof UsernamePasswordToken;
    }

    //授权
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        //获取用户主身份---用户名
        String username = (String) principalCollection.getPrimaryPrincipal();
        //通过用户名查找用户对应的权限列表
        List<Permission> permissionList = userService.findPermission(username);
        //创建一个授权对象
        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
        for(Permission permission:permissionList){
            authorizationInfo.addStringPermission(permission.getPerCode());
        }
        return authorizationInfo;
    }

    //认证
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
       //获取身份
        String username = (String) authenticationToken.getPrincipal();
        //通过用户名，查找对应的用户是否存在，如果存在返回用户对象
        User user = userService.findUser(username);
        if(user == null){
            return null;
        }
        SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(
                user.getUsername(), //用户名
                user.getPassword(), //密码
                ByteSource.Util.bytes(user.getUserSalt()),//salt
                getName()  //realm name
        );
        return authenticationInfo;
    }
}
