package com.pcms.be.errors;

import lombok.Getter;
import lombok.Setter;

public class ApiException extends RuntimeException {

    @Getter
    @Setter
    private Response response;

    public ApiException(String errorCode) {
        super(errorCode);
        setResponse(ErrorHelper.buildResponse(errorCode));
    }

    public ApiException(String errorCode, Object... params) {
        super(errorCode);
        setResponse(ErrorHelper.buildResponse(errorCode, params));
    }
}