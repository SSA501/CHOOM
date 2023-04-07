package com.choom.global.config;

import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;

@EnableFeignClients(basePackages = "com.choom")
@Configuration
public class FeignClientConfig {
}
