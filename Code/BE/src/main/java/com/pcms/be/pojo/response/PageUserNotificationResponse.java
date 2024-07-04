package com.pcms.be.pojo.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class PageUserNotificationResponse {
    private Long totalCount;
    private Integer totalPage;
    private Long totalUnread;
    private List<UserNotificationResponse> data = null;
}
