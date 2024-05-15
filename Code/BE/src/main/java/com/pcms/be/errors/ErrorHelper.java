package com.pcms.be.errors;

public class ErrorHelper {

    public static Response buildResponse(String errorCode) {
        return buildResponse(errorCode, new Object[]{});
    }

    public static Response buildResponse(String errorCode, Object... params) {
        ErrorObject errorObject = new ErrorObject();
        errorObject.setErrorCode(errorCode);
        errorObject.setMessages(ErrorMessageLoader.getMessage(errorCode, params));

        Response response = new Response();
        response.setErrorMessage(errorObject);
        return response;
    }
}