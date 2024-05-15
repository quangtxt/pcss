package com.pcms.be.errors.handler;

import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ErrorHelper;
import com.pcms.be.errors.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.PriorityOrdered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
@Order(value = PriorityOrdered.HIGHEST_PRECEDENCE)
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {
    private final Logger logger = LoggerFactory.getLogger(ApiExceptionHandler.class);

    @ExceptionHandler(value = Throwable.class)
    public ResponseEntity<?> handleException(Throwable ex) throws Throwable {
        HttpHeaders headers = new HttpHeaders();
        if (ex instanceof ApiException) {
            logger.debug("====DEBUG ApiExceptionHandler: BAD_REQUEST ex {} with detail {}", ex.getClass().getName(), ex.getMessage());
            Response response = ((ApiException) ex).getResponse();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).headers(headers).body(response);
        }
        Response response = ErrorHelper.buildResponse(ErrorCode.INTERNAL_SERVER_ERROR);
        // add debug message
        logger.error("====ERROR ApiExceptionHandler: INTERNAL_SERVER_ERROR ex {} with detail {}", ex.getClass().getName(), ex);
        response.setDebugMessage(ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(headers).body(response);
    }
}