package com.pcms.be.errors;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ServiceException extends Throwable {

    private String errorCode;
    private Object[] params;

    public ServiceException(String errorCode) {
        super(errorCode);
        this.errorCode = errorCode;
    }

    public ServiceException(String errorCode, Object... params) {
        super(errorCode);
        this.errorCode = errorCode;
        this.params = params;
    }
}