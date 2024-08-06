package com.pcms.be.errors;

public interface ErrorCode {

    String SUCCESS = "API-000";
    String STUDENT_ALREADY_IN_A_GROUP ="STUDENT-IN-GROUP100";
    String MAXIMUM_SIZE_OF_A_GROUP ="GROUP-101";
    String FAILED_CREATE_GROUP = "GROUP-102";
    String FAILED_EDIT_GROUP = "GROUP-103";
    String MAXIMUM_SIZE_SUPERVISOR_OF_A_GROUP ="GROUP-105";
    String FAILED_CREATE_NOTE = "NOTE-100";
    String FAILED_EDIT_NOTE = "NOTE-101";
    String FAILED_REMOVE_MEMBER ="MEMBER-103";
    String FAILED_UPDATE_STATUS_INVITATION = "INVITATION-100";
    String FAILED_GET_IVITATIONS = "MEMBER-101";
    String FAILED_GET_MEMBERS = "MEMBER-102";
    String FAILED_GET_GROUP = "GROUP-104";
    String INTERNAL_SERVER_ERROR = "API-501";
    String GENERAL_ERROR = "API-502";

    String UNAUTHORIZED = "API-401";
    String FORBIDDEN = "API-403";

    String AUTH_INVALID_GRANT = "AUTH-100";
    String AUTH_INVALID_TOKEN = "AUTH-101";

    String USER_NOT_FOUND = "USER-100";
    String USER_NOT_ALLOW = "USER-106";
    String USER_DUPLICATE_EMAIL = "USER-101";
    String USER_DUPLICATE_USERNAME = "USER-102";
    String USER_PASSWORD_INCORRECT = "USER-103";
    String USER_DUPLICATE_MA_NV = "USER-104";
    String USER_HAVE_NO_MA_NV = "USER-105";

    String USER_PERMISSION_NOT_FOUND = "USER-PERMISSION-100";

    String EXCEL_IS_NOT_IN_THE_CORRECT_FORMAT= "EXCEL-INCORRECT-403";

    String USER_DUPLICATE_PERMISSION_PROPOSAL = "USER-DUPLICATE-PERMISSION-PROPOSAL-100";

    String COMMAND_NOT_FOUND = "COMMAND-100";

    String ROLE_NOT_FOUND = "ROLE-100";

    String ACCOUNT_NOT_FOUND = "ACCOUNT-100";

    String COMPANY_NOT_FOUND = "COMPANY-100";

    String FILE_NOT_FOUND = "FILE-100";
    String FILE_UPLOAD_FAIL = "FILE-101";
    String FILE_LARGE = "FILE-102";
    String FILE_INCORRECT_FORMAT = "FILE-103";

    String POSITION_NOT_FOUND = "POSITION-100";

    String DEPARTMENT_NOT_FOUND = "DEPARTMENT-100";
    String DEPARTMENT_HAS_USER = "DEPARTMENT-101";
    String DEPARTMENT_EXISTS = "DEPARTMENT-102";

    String FUNCTION_NOT_FOUND = "FUNCTION-100";

    String AUTHORITY_ISSUED_NOT_FOUND = "AUTHORITY-ISSUED-100";
    String AUTHORITY_ISSUED_DUPLICATE = "AUTHORITY-ISSUED-101";
    String AUTHORITY_LEVEL_NOT_FOUND = "AUTHORITY-LEVEL-100";

    String BOOK_GROUP_NOT_FOUND = "BOOK-GROUP-100";
    String BOOK_GROUP_DUPLICATE_NAME = "BOOK-GROUP-101";
    String BOOK_NOT_FOUND = "BOOK-100";
    String BOOK_DUPLICATE_NAME = "BOOK-101";

    String DOCUMENT_NOT_FOUND = "DOCUMENT-100";
    String DOCUMENT_COMMENT_NOT_FOUND = "DOCUMENT-COMMENT-100";
    String NOTIFICATION_NOT_FOUND = "NOTIFICATION-100";
    String NOTIFICATION_FCM_TOKEN_EXISTED = "NOTIFICATION-FCM-TOKEN-100";
    String NOTIFICATION_FCM_TOKEN_NOT_VALID = "NOTIFICATION-FCM-TOKEN-101";

    String WORK_SCHEDULE_NOT_FOUND = "WORK-SCHEDULE-100";

    String WORK_MANAGER_NOT_FOUND = "WORK-MANAGER-100";
    String WORK_MANAGER_COMMENT_NOT_FOUND = "WORK-MANAGER-COMMENT-100";
    String WORK_MANAGER_DUPLICATE = "WORK-MANAGER-DUPLICATE-100";
    String WORK_MANAGER_STEP_ALREADY_EXIST = "WORK-MANAGER-STEP-100";
    String WORK_MANAGER_PROCESSED = "WORK-MANAGER-102";
    String WORK_MANAGER_STATUS_INCORRECT = "WORK-MANAGER-STATUS-100";
    String WORK_MANAGER_NOT_TRANSFER_INTERNAL_DOCUMENT = "WORK-MANAGER-101";
    String WORK_MANAGER_REFUSED = "WORK-MANAGER-103";
    String WORK_MANAGER_CANCELLED = "WORK-MANAGER-104";

    String NOT_PERMISSION_DELETE = "NOT-PERMISSION-100";
    String NOT_PERMISSION_UPDATE = "NOT-PERMISSION-101";

    String DOCUMENT_SAMPLE_NOT_FOUND = "DOCUMENT-SAMPLE-100";
    String DOCUMENT_SAMPLE_DUPLICATE = "DOCUMENT-SAMPLE-101";

    String INTERNAL_DOCUMENT_NOT_FOUND = "INTERNAL-DOCUMENT-100";

    String INTERNAL_DOCUMENT_COMMENT_NOT_FOUND = "INTERNAL-DOCUMENT-COMMENT-100";
    String INTERNAL_DOCUMENT_COMMENT_PERMISSION = "INTERNAL-DOCUMENT-COMMENT-101";

    String EDOC_BUILD_FILE_FAIL = "EDOC-100";
    String EDOC_VALIDATE = "EDOC-101";
    String EDOC_UNIT_SENT_INCORRECT = "EDOC-102";
    String EDOC_DOC_SENT_DUPLICATE = "EDOC-103";
    String EDOC_DOC_SENT_ATTACHMENT_MISSING = "EDOC-104";
    String EDOC_DOC_SENT_SPAM = "EDOC-105";
    String EDOC_DOC_SENT_VIOLATE_RULE = "EDOC-106";
    String EDOC_DOC_SENT_VIOLATE_DATE_ISSUED = "EDOC-107";
    String EDOC_ERROR = "EDOC-108";
    String EDOC_NOT_FOUND = "EDOC-109";
    String EDOC_UPDATE_DOCUMENT_ID_INVALID = "EDOC-110";
    String EDOC_ERROR_RESPONSE = "EDOC-111";
    String EDOC_DOC_SENT_DUPLICATE_CODE = "EDOC-112";
    String EDOC_ORGANIZATION_NOT_FOUND = "EDOC-113";
    String EDOC_ORGANIZATION_ORGAN_ID_DUPLICATE = "EDOC-114";
    String EDOC_ERROR_NOT_RESPONSE = "EDOC-115";

    String INTERNAL_TIME_SHEET_FILE_NOT_FOUND = "TIME_SHEET-100";
    String INTERNAL_TIME_SHEET_FILE_NO_DATA = "TIME_SHEET-101";

    String PERMISSION_NOT_FOUND = "PERMISSION-100";

    String ESIGN_UNSUCCESS = "ESIGN-100";

    String PROPOSAL_LEAVE_NOT_FOUND = "PROPOSAL-LEAVE-100";

    String PROPOSAL_LEAVE_COMMENT_NOT_FOUND = "PROPOSAL-LEAVE-COMMENT-100";

    String PROPOSAL_VEHICLE_NOT_FOUND = "PROPOSAL-VEHICLE-100";

    String PROPOSAL_VEHICLE_COMMENT_NOT_FOUND = "PROPOSAL-VEHICLE-COMMENT-100";

    String PROPOSAL_OTHER_NOT_FOUND = "PROPOSAL-OTHER-100";

    String PROPOSAL_OTHER_COMMENT_NOT_FOUND = "PROPOSAL-OTHER-COMMENT-100";

    String PROPOSAL_NOT_FOUND = "PROPOSAL-100";

    String TASK_NOT_FOUND = "TASK-100";
    String TASK_LEADER_NOT_FOUND = "TASK_LEADER_NOT_FOUND";

    String TASK_LEVEL_NOT_FOUND = "TASK-LEVEL-100";

    String UNIT_NOT_FOUND = "UNIT-100";

    String USER_UNIT_NOT_FOUND = "USER-UNIT-100";

    String PROPOSAL_STATUS_CANCEL = "PROPOSAL-STATUS-CANCEL-100";

    String PROPOSAL_STATUS_APPROVED = "PROPOSAL-STATUS-APPROVED-100";

    String PROPOSAL_NOTHING_TO_APPROVED = "PROPOSAL_NOTHING_TO_APPROVED";
    String PROPOSAL_APPROVAL_USER_NOT_CORRECT = "PROPOSAL_APPROVAL_USER_NOT_CORRECT";
    String PROPOSAL_NEED_ASSIGN_NEXT_LEVEL = "PROPOSAL_NEED_ASSIGN_NEXT_LEVEL";
    String PROPOSAL_NEXT_LEVEL_DOES_NOT_MATCH = "PROPOSAL_NEXT_LEVEL_DOES_NOT_MATCH";
    String PROPOSAL_NOT_ALLOW_EDIT = "PROPOSAL_NOT_ALLOW_EDIT";
    String PROPOSAL_NEXT_LEVEL_NOT_EXISTS = "PROPOSAL_NEXT_LEVEL_NOT_EXISTS";

    String APPROVAL_LEVEL_TEMPLATE_CANNOT_EMPTY = "APPROVAL_LEVEL_TEMPLATE_CANNOT_EMPTY";
    String APPROVAL_LEVEL_COUNT_MUST_GREATER_OR_EQUALS_2 = "APPROVAL_LEVEL_COUNT_MUST_GREATER_OR_EQUALS_2";
    String APPROVAL_LEVEL_VALUE_NOT_VALID = "APPROVAL_LEVEL_VALUE_NOT_VALID";
    String APPROVAL_LEVEL_DUPLICATED_NAME = "APPROVAL_LEVEL_DUPLICATED_NAME";

    String SIGN_NOT_FOUND = "SIGN-NOT-FOUND";
    String SIGN_SYSTEM_EXIST = "SIGN_SYSTEM_EXIST";

    String GROUP_CREATE_ERROR = "GROUP_CREATE_ERROR-100";
    String GROUP_NOT_FOUND = "GROUP_NOT_FOUND-100";
    String GROUP_PERMISSION = "GROUP_PERMISSION-100";
    //	String GROUP_COMMENT_NOT_FOUND = "GROUP-COMMENT-100";
    String GROUP_DUPLICATE = "GROUP-DUPLICATE-100";
//	String GROUP_STEP_ALREADY_EXIST = "GROUP-STEP-100";
//	String GROUP_PROCESSED = "GROUP-102";
//	String GROUP_STATUS_INCORRECT = "GROUP-STATUS-100";
//	String GROUP_NOT_TRANSFER_INTERNAL_DOCUMENT = "GROUP-101";
//	String GROUP_REFUSED = "GROUP-103";
//	String GROUP_CANCELLED = "GROUP-104";

    String GROUP_USER_NOT_FOUND = "GROUP_USER_NOT_FOUND-100";
    String NEWS_NOT_FOUND = "NEWS_NOT_FOUND";
    String SIGN_DOCUMENT_ERROR = "SIGN_DOCUMENT_ERROR";

    String NOT_FOUND = "NOT_FOUND";

    String INVALID_APPROVAL_STATUS = "INVALID_APPROVAL_STATUS";
    String MUST_HAVE_ONE_SYSTEM_SIGN = "MUST_HAVE_ONE_SYSTEM_SIGN";

    String SIGN_ACCOUNT_NOT_FOUND = "SIGN-ACCOUNT-NOT-FOUND";
    String SIGN_ACCOUNT_DUPLICATE = "SIGN_ACCOUNT_DUPLICATE";
    String SIGN_ACCOUNT_INVALID_TYPE = "SIGN_ACCOUNT_INVALID_TYPE";


    String CONSULT_NOT_FOUND = "CONSULT-100";
    String CONSULT_COMMENT_NOT_FOUND = "CONSULT-COMMENT-100";
    String CONSULT_DUPLICATE = "CONSULT-DUPLICATE-100";
    String CONSULT_STEP_ALREADY_EXIST = "CONSULT-STEP-100";
    String CONSULT_PROCESSED = "CONSULT-102";
    String CONSULT_STATUS_INCORRECT = "CONSULT-STATUS-100";
    String CONSULT_NOT_TRANSFER_INTERNAL_DOCUMENT = "CONSULT-101";
    String CONSULT_REFUSED = "CONSULT-103";
    String CONSULT_CANCELLED = "CONSULT-104";


    String POLICY_NOT_FOUND = "POLICY-100";
    String POLICY_COMMENT_NOT_FOUND = "POLICY-COMMENT-100";
    String POLICY_DUPLICATE = "POLICY-DUPLICATE-100";
    String POLICY_STEP_ALREADY_EXIST = "POLICY-STEP-100";
    String POLICY_STEP_INVALID = "POLICY-STEP-105";
    String POLICY_PROCESSED = "POLICY-102";
    String POLICY_STATUS_INCORRECT = "POLICY-STATUS-100";
    String POLICY_NOT_TRANSFER_INTERNAL_DOCUMENT = "POLICY-101";
    String POLICY_REFUSED = "POLICY-103";
    String POLICY_CANCELLED = "POLICY-104";
    String POLICY_LEAD_MUST_BE_NOT_NULL = "POLICY-106";

    String WORK_NOT_FOUND = "WORK-100";
    String WORK_COMMENT_NOT_FOUND = "WORK-COMMENT-100";
    String WORK_DUPLICATE = "WORK-DUPLICATE-100";
    String WORK_STEP_ALREADY_EXIST = "WORK-STEP-100";
    String WORK_PROCESSED = "WORK-102";
    String WORK_STATUS_INCORRECT = "WORK-STATUS-100";
    String WORK_NOT_TRANSFER_INTERNAL_DOCUMENT = "WORK-101";
    String WORK_REFUSED = "WORK-103";
    String WORK_CANCELLED = "WORK-104";
    String WORK_IN_PROGRESS = "WORK-105";
    String WORK_ASSIGNED_TO_KPI = "WORK-106";

    String ELEC_DOC_NOT_FOUND = "ELE-DOC-100";
    String ELEC_DOC_COMMENT_NOT_FOUND = "ELEC_DOC-COMMENT-100";
    String ELEC_DOC_DUPLICATE = "ELEC_DOC-DUPLICATE-100";
    String ELEC_DOC_REFUSED = "ELEC_DOC-103";
    String ELEC_DOC_CANCELLED = "ELEC_DOC-104";
    String CLOUD_UNKNOW_HOST = "CLOUD-100";
    String CLOUD_RESET_PASS_ERROR = "CLOUD-101";

    String SALARY_REQUEST_CANNOT_APPROVE = "SR-101";
    String SALARY_REQUEST_NOT_FOUND = "SR-102";

    String USER_GUIDE_NOT_FOUND = "USER-GUIDE-100";

    String CREATE_MESSAGE_ERROR = "CREATE_MESSAGE_ERROR";
    String GET_TRUC_USER_ERROR = "GET_TRUC_USER_ERROR";
    String GET_SEND_MESSAGE_ERROR = "GET_SEND_MESSAGE_ERROR";
    String GET_SEND_MESSAGE_DETAIL_ERROR = "GET_SEND_MESSAGE_DETAIL_ERROR";

    String MESSAGE_NOT_FOUND = "MESSAGE-NOT-FOUND";

    String MESSAGE_USER_NOT_FOUND = "MESSAGE-USER-NOT-FOUND";

    String INTERNAL_MESSAGE_NOT_FOUND = "INTERNAL_MESSAGE-NOT-FOUND";
    String INTERNAL_MESSAGE_USER_NOT_FOUND = "INTERNAL_MESSAGE-USER-NOT-FOUND";
    String INTERNAL_MESSAGE_INVALID = "INTERNAL_MESSAGE_INVALID";
    String UPLOAD_FILE_ERROR = "UPLOAD_FILE_ERROR";
    String FILE_NAME_DUPLICATE = "FILE_NAME_DUPLICATE";
    String DOWNLOAD_FILE_ERROR = "DOWNLOAD_FILE_ERROR";
    String GET_MEMBER_GROUP_ERROR = "GET_MEMBER_GROUP_ERROR";
    String GET_LIST_GROUP_ERROR = "GET_LIST_GROUP_ERROR";
    String PARSE_REGISTER_CODE = "PARSE_REGISTER_CODE";
    String REGISTER_CODE_REQUIRED = "REGISTER_CODE_REQUIRED";
    String OUTGOING_DOCUMENT_CODE_REQUIRED = "OUTGOING_DOCUMENT_CODE_REQUIRED";

    String RISK_NOT_ALLOW_APPROVE = "RISK_NOT_ALLOW_APPROVE";

    String ACL_100 = "ACL-100";

    String ACS_100 = "ACS-100";
    String ACS_101 = "ACS-101";
    String ACS_102 = "ACS-102";
    String ACS_103 = "ACS-103";
    String ACS_104 = "ACS-104";
    String ACS_105 = "ACS-105";
    String ACS_106 = "ACS-106";
    String ACS_107 = "ACS-107";
    String ACS_108 = "ACS-108";

    String POSITION_100 = "POSITION_100";
    String POSITION_101 = "POSITION_101";
    String POSITION_102 = "POSITION_102";
    String STUDENT_NOT_FOUND = "STUDENT-102";
    String FAILED_INVITE_MEMBER = "STUDENT-103";
    String FAILED_UPDATE_INVITE_STATUS = "STUDENT-104";
    String INCORRECT_FORMAT_DATA_EMAIL= "EMAIL_IS_INCORRECT_403";
    String INCORRECT_FORMAT_DATA_PHONE="PHONE_IS_INCORRECT_403";
    String INCORRECT_FORMAT_DATA_OFFSETDATETIME="OFFSETDATETIME_IS_INCORRECT_403";
    String SEMESTER_ON_THE_SAME_DATE_WITH = "SEMESTER_OFFSETDATETIME_IS_ON_THE_SAME_DATE_WITH_403";
    String SEMESTER_HAS_THE_SAME_NAME="SEMESTER_HAS_THE_SAME_NAME_403";
    String SEMESTER_HAS_THE_SAME_CODE="SEMESTER_HAS_THE_SAME_CODE_403";
    String TIME_RANGE_DUPLICATED="MEETING-100";
    String STARTAT_MUST_BE_AFTER_CURRENT_TIME="MEETING-101";
    String STARTAT_MUST_BE_BEFORE_ENDAT = "MEETING-102";
    String FAILED_CREATE_MEETING = "MEETING-103";
    String FAILED_EDIT_MEETING = "MEETING-104";
    String FAILED_DELETE_MEETING = "MEETING-105";
    String SEMESTER_NOT_FOUND_BY_CURRENT = "SEMESTER_NOT_FOUND_BY_CURRENT";
    String SEMESTER_PHASE_ON_THE_SAME_DATE_WITH = "SEMESTER_PHASE_OFFSETDATETIME_IS_CONFLICT_403";
    String CAPSTONE_PHASE_IS_NOT_FOUND_IN_CURRENT_SEMESTER = "CAPSTONE_PHASE_IS_NOT_FOUND_IN_CURRENT_SEMESTER";
    String MILESTONE_IS_NOT_FOUND_IN_CURRENT_CAPSTONE_PHASE = "MILESTONE_IS_NOT_FOUND_IN_CURRENT_CAPSTONE_PHASE";
    String SUBMISSION_IS_NOT_FOUND_IN_CURRENT_MILESTONE = "SUBMISSION_IS_NOT_FOUND_IN_CURRENT_MILESTONE";
    String MILESTONE_IS_CONFLICT_DATE = "MILESTONE_IS_CONFLICT_DATE";
    String GITLAB_IS_INCORRECT_FORMAT = "GITLAB_IS_INCORRECT_FORMAT";
    String MEETING_NOT_FOUND = "MEETING_NOT_FOUND";
}