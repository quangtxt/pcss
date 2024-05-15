package com.pcms.be.errors;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Response {
    private ErrorObject errorMessage;
    private Object debugMessage;
}