package com.pcms.be.functions;

public interface NotificationTemplate {
    interface UserNotification{
        String testTemplate = "Xin chào _User-txt_,....";
        String joinGroupTemplate = "Bạn đã được nhà trường xếp vào nhóm _GroupName-txt_ trong môn học SEP490.\n" +
                "Nhóm của bạn gồm có các thành viên: _ListMember-txt_ trong đó _Leader-txt_ là nhóm trưởng.\n";
        String memberAcceptJoinGroup = "_User-txt_ đã tham gia vào nhóm của bạn.";
        String memberOutGroup = "_User-txt_ đã rời khỏi nhóm của bạn.";
        String memberRejectJoinGroup = "_User-txt_ đã từ chối tham gia vào nhóm của bạn.";
        String removeMember = "Nhóm trưởng _Leader-txt_ đã xóa _User-txt_ ra khỏi nhóm.";
        String removeMember1 = "Nhóm trưởng _Leader-txt_ đã xóa bạn ra khỏi nhóm.";
        String inviteMemberJoinGroup = "Nhóm trưởng _Leader-txt_ đã mời bạn tham gia nhóm _Group-txt_ của họ.";

    }

    interface NotificationType {
        String GROUP = "GROUP";
        String REQUESTGROUP = "REQUESTGROUP";
        String NEWS = "NEWS";
    }
    interface MeetingNotification{
        String createMeetingTemplate = "Bạn và nhóm có một cuộc họp với mentor: _MentorName-txt_ vào lúc _Time-txt_.\n" +
                "Địa điểm: _Location-txt_";
        String updateMeetingTemplate = "Cuộc họp với mentor của bạn và nhóm vào lúc _OldTime-txt_ đã được cập nhật thay đổi.\n" +
                "Lịch họp: _Time-txt\n"+
                "Địa điểm: _Location-txt_";
        String deleteMeetingTemplate = "Cuộc họp với mentor của bạn và nhóm vào lúc _Time-txt_ đã được huỷ.";
    }
    interface MilestoneProcessNotification{
        String unfinishedSubmissionTemplate = "Milestone _MilestoneName-txt_ của nhóm bạn chưa được hoàn thành. Hãy hoàn thành các submission của milestone này. ";
    }
}
