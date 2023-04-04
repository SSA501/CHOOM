package com.choom.global.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.servers.Server;
import java.util.Arrays;
import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;
import springfox.documentation.oas.web.OpenApiTransformationContext;
import springfox.documentation.oas.web.WebMvcOpenApiTransformationFilter;
import springfox.documentation.spi.DocumentationType;

@Component
public class Workaround implements WebMvcOpenApiTransformationFilter {
    @Override
    public OpenAPI transform(OpenApiTransformationContext<HttpServletRequest> context) {
        OpenAPI openApi = context.getSpecification();
        Server localServer = new Server();
        localServer.setDescription("local server");
        localServer.setUrl("http://localhost:8081");

        Server testServer = new Server();
        testServer.setDescription("deploy server");
        testServer.setUrl("https://j8a501.p.ssafy.io");
        openApi.setServers(Arrays.asList(localServer, testServer));
        return openApi;
    }

    @Override
    public boolean supports(DocumentationType documentationType) {
        return documentationType.equals(DocumentationType.OAS_30);
    }
}