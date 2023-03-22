package com.choom.global.exception;

import com.choom.global.exception.file.FileDeleteException;
import com.choom.global.model.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.io.FileNotFoundException;
import java.util.NoSuchElementException;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgument(IllegalArgumentException e){
        log.warn("IllegalArgumentException", e);
        ErrorResponse errorResponse = ErrorResponse.builder()
                .statusCode(400)
                .message(e.getMessage())
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ErrorResponse> handleNoSuchElement(NoSuchElementException e){
        log.warn("NoSuchElementExceptions", e);
        ErrorResponse errorResponse = ErrorResponse.builder()
                .statusCode(404)
                .message(e.getMessage())
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(FileNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleFileNotFound(FileNotFoundException e){
        log.warn("FileNotFoundException", e);
        ErrorResponse errorResponse = ErrorResponse.builder()
                .statusCode(404)
                .message("파일을 찾을 수 없습니다")
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(FileDeleteException.class)
    public ResponseEntity<ErrorResponse> handleFileDelete(FileDeleteException e){
        log.warn("FileDeleteException", e);
        ErrorResponse errorResponse = ErrorResponse.builder()
                .statusCode(404)
                .message(e.getMessage())
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

}