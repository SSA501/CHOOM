package com.choom.global.util;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import com.choom.global.model.BaseResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ImmutableMap;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Calendar;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;

/**
 * 컨트롤러(controller)가 아닌곳에서, 서버 응답값(바디) 직접 변경 및 전달 하기위한 유틸 정의.
 */
public class ResponseBodyWriteUtil {

    public static void sendApiResponse(HttpServletResponse response, BaseResponse apiResponse) throws IOException {
        response.setStatus(HttpStatus.OK.value());
        response.setContentType(APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        response.getOutputStream().write(new ObjectMapper().writeValueAsString(apiResponse).getBytes());
    }

    public static void sendError(HttpServletRequest request, HttpServletResponse response, Exception ex, HttpStatus httpStatus) throws IOException {
        response.setStatus(httpStatus.value());
        response.setContentType(APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        String message = ex.getMessage();
        message = message == null ? "" : message;
        Map<String, Object> data = ImmutableMap.of(
                "timestamp", Calendar.getInstance().getTime(),
                "status", httpStatus.value(),
                "error", ex.getClass().getSimpleName(),
                "message", message,
                "path", request.getRequestURI()
        );
        PrintWriter pw = response.getWriter();
        pw.print(new ObjectMapper().writeValueAsString(data));
        pw.flush();
    }

    public static void sendError(HttpServletRequest request, HttpServletResponse response, Exception ex) throws IOException {
        sendError(request, response, ex, HttpStatus.UNAUTHORIZED);
    }
}