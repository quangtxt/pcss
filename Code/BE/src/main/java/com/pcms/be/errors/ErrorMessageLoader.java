package com.pcms.be.errors;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.text.MessageFormat;
import java.util.Map;
import java.util.Properties;
import java.util.stream.Collectors;

@Slf4j
@Configuration
public class ErrorMessageLoader {

    private static Map<String, ErrorMessage> errorMessageMap;

    public ErrorMessageLoader() {
        try {
            Charset charset = StandardCharsets.UTF_8;

            Properties enMsg = new Properties();
            enMsg.load(
                    new InputStreamReader(getClass().getResourceAsStream("/i18n/message_en.properties"),
                            charset));

            Properties viMsg = new Properties();
            viMsg.load(
                    new InputStreamReader(getClass().getResourceAsStream("/i18n/message_vi.properties"),
                            charset));

            errorMessageMap = enMsg.entrySet().stream().collect(
                    Collectors.toMap(
                            e -> e.getKey().toString(),
                            e -> ErrorMessage.builder()
                                    .en(e.getValue().toString())
                                    .vi(viMsg.getProperty(e.getKey().toString()))
                                    .build()
                    )
            );
        } catch (IOException e) {
            log.error(e.getMessage());
        }
    }

    public static ErrorMessage getMessage(String errorCode, Object... params) {
        ErrorMessage errorMessage = errorMessageMap.getOrDefault(errorCode, errorMessageMap.get(ErrorCode.INTERNAL_SERVER_ERROR));

        if (params != null && params.length > 0) {
            String msgEN = String.format(errorMessage.getEn(), params);
            String msgVI = String.format(errorMessage.getVi(), params);
            errorMessage.setEn(msgEN);
            errorMessage.setVi(msgVI);
        }

        return errorMessage;
    }
}