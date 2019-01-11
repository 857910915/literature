package com.jie.literature.shiro;


import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.ehcache.EhCacheManager;

import java.util.concurrent.atomic.AtomicInteger;

//这个类的主要作用就是计算并缓存用户尝试登陆的次数，
// 如果大于了5次，那么该用户将被禁止登陆直到10分钟以后。
// 这个时间在ehcache.xml中timeToIdleSeconds设置。
public class RetryLimitCredentialsMatcher extends HashedCredentialsMatcher {
    private static final int MAX_LOGIN_RETRY_TIMES = 5;
    private Cache<String, AtomicInteger> passwordRetryCache;

    public RetryLimitCredentialsMatcher(EhCacheManager ehCacheManager) {
        passwordRetryCache = ehCacheManager.getCache("passwordRetryCache");
    }

    @Override
    public boolean doCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) throws ExcessiveAttemptsException {
        String userName = (String) token.getPrincipal();
        AtomicInteger retryCount = passwordRetryCache.get(userName);
        if (retryCount == null) {
            // 高并发下使用的线程安全的int类
            retryCount = new AtomicInteger(0);
            passwordRetryCache.put(userName, retryCount);
        }
        if (retryCount.incrementAndGet() > MAX_LOGIN_RETRY_TIMES) {
            throw new ExcessiveAttemptsException();
        }

        boolean match = super.doCredentialsMatch(token, info);
        if (match) {
            passwordRetryCache.remove(userName);
        }

        return match;
    }
}
