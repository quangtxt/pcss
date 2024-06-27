package com.pcms.be.functions;

public interface NotificationTemplate {
    interface UserNotificationTemplate{
        String testTemplate = "Xin chào _User-txt_,....";
        String joinGroupTemplate = "Bạn đã được nhà trường xếp vào nhóm _GroupName-txt_ trong môn học SEP490.\n" +
                "Nhóm của bạn gồm có các thành viên: _ListMember-txt_ trong đó _Leader-txt_ là nhóm trưởng.\n";
    }
}
