package com.jie.literature.util;



import com.jie.literature.domain.User;
import org.apache.shiro.crypto.RandomNumberGenerator;
import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.util.ByteSource;

/**
 * Created by lenovo on  三月
 */
public class SignUpHelper {
        //生成随机数
        private RandomNumberGenerator randomNumberGenerator = new SecureRandomNumberGenerator();
        private String algorithmName = "md5";           //加密算法
        private final int hashIterations = 2;           //散列次数

    /**
     * 注册的时候，随机产生一个salt，将密码进行加密处理。
     * toHex将变量改为其他进制
     * @param user
     */
    public User encryptPassword(User user) {
            // User对象包含最基本的字段Username和Password
            String salt = randomNumberGenerator.nextBytes().toHex();
            user.setUserSalt(salt);
            // 将用户的注册密码经过散列算法替换成一个不可逆的新密码保存进数据，散列过程使用了盐
            String newPassword = new SimpleHash(algorithmName, user.getPassword(),
                    ByteSource.Util.bytes(user.getUserSalt()), hashIterations).toHex();
            user.setPassword(newPassword);
            System.out.println(salt+"----"+user.getPassword()+"===="+user.getUsername());
            return user;
        }

     public static void main(String[] args){
        User user = new User();
        user.setUsername("zhangsan");
        user.setPassword("123456");
        new SignUpHelper().encryptPassword(user);
     }
}
