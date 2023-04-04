package com.choom.global.config;

import java.util.Arrays;
import java.util.Collections;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.oas.annotations.EnableOpenApi;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.service.Server;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Configuration
@EnableOpenApi
public class SwaggerConfig {
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
            .title("Choom API")
            .description("Choom API Document")
            .version("1.0")
            .build();
    }

    private Set<String> consumeContentTypes() {
        Set<String> consumes = new HashSet<>();
        consumes.add("application/json;charset=UTF-8");
        return consumes;
    }

    private Set<String> produceContentTypes() {
        Set<String> produces = new HashSet<>();
        produces.add("application/json;charset=UTF-8");
        produces.add("image/png");
        return produces;
    }

    private SecurityContext securityContext() {
        return SecurityContext.builder()
            .securityReferences(defaultAuth())
            .build();
    }

    private List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        return Arrays.asList(new SecurityReference("Authorization", authorizationScopes));
    }

    private ApiKey apiKey() {
        return new ApiKey("Authorization", "Authorization", "header");
    }

    @Bean
    public Docket api() {
        Server serverLocal = new Server("local server", "http://localhost:8081", "for local usages", Collections.emptyList(), Collections.emptyList());
        Server testServer = new Server("deploy server", "https://j8a501.p.ssafy.io/", "for deploy server", Collections.emptyList(), Collections.emptyList());
        return new Docket(DocumentationType.OAS_30)
            .servers(serverLocal, testServer)
            .securityContexts(Arrays.asList(securityContext()))
            .securitySchemes(Arrays.asList(apiKey()))
            .consumes(consumeContentTypes())
            .produces(produceContentTypes())
            .useDefaultResponseMessages(false)
            .apiInfo(apiInfo())
            .select()
            .apis(RequestHandlerSelectors.basePackage("com.choom"))
            .paths(PathSelectors.any())
            .build();
    }
}