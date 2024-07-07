package com.pcms.be.functions;

public interface MailTemplate {
    interface MilestoneUnfinished{
        String recipient = "_Email-txt_";
        String subject = "Hello, _Name-txt_!\n\n";
        String template = "This is a notification to your team that your team has a submission in a _MilestoneName-txt_ that you have not completed yet, please complete the submissions on time.";
    }
    interface CanNotFindGitFolder{
        String recipient = "_Email-txt_";
        String subject = "Hello, _Name-txt_!\n\n";
        String template = "_MilestoneName-txt_ ";
    }
}
