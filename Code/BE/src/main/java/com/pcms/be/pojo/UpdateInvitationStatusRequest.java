package com.pcms.be.pojo;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateInvitationStatusRequest {
    int groupId;
    boolean status;
}
