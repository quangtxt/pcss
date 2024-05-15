package com.pcms.be.errors;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorObject {
    private String errorCode;
    private ErrorMessage messages;
}