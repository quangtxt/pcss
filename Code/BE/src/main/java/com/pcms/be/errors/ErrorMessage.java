package com.pcms.be.errors;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ErrorMessage {
    private String en;
    private String vi;
}