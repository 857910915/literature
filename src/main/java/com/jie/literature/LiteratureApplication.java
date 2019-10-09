package com.jie.literature;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.cache.annotation.EnableCaching;


@EnableCaching
@SpringBootApplication
@ServletComponentScan//配置NettyListener 需加上此注解
public class LiteratureApplication {

    public static void main(String[] args) {
        SpringApplication.run(LiteratureApplication.class, args);
    }

}

