// Datetime
import React from "react";

export const ISO_DATE_FORMAT = "YYYY-MM-DD";
export const DATE_FORMAT_DEFAULT = "DD-MM-YYYY";
export const DATE_FORMAT_SLASH = "DD/MM/YYYY";
export const DATE_FORMAT_LIST = [
  "DD/MM/YYYY",
  "D/M/YY",
  "DD/MM/YY",
  "D/M/YYYY",
  "D M YY",
  "DDMMYYYY",
];
export const TIME_FORMAT_LIST = ["HH:mm", "H:m", "H m"];
export const HHhMM = "HH[h]mm";
export const DD_MM = "DD-MM";
export const MM_YYYY = "MM/YYYY";
export const HH_mm = "HH:mm";
export const YYYY_MM_DD_HH_mm = "YYYY-MM-DD HH:mm";

// Roles
export const SUPER_ADMIN = "SUPER_ADMIN";
export const EOFFICE_ADMIN = "EOFFICE_ADMIN";
export const EOFFICE_USER = "EOFFICE_USER";
export const SR_LEADER = "SR_LEADER";
export const EOFFICE_CLERICAL = "EOFFICE_CLERICAL";
export const EOFFICE_LEADER = "EOFFICE_LEADER";
export const EOFFICE_SECRETARY = "EOFFICE_SECRETARY";
export const SR_ADMIN = "SR_ADMIN";
export const DIGITAL_SIGN = "DIGITAL_SIGN";
export const DDPV = "DDPV";

//Sign provider. TODO: refactor
export const DIGITAL_SIGN_PROVIDER = "SAVIS";
export const DIGITAL_TYPE_SIGN = "USER";
export const DIGITAL_TYPE_SIGN_USER = "USER";
export const DIGITAL_TYPE_SIGN_SYSTEM = "SYSTEM";

export const SIGN_PROVIDER = {
  SAVIS: "SAVIS",
  FPT: "FPT",
};

export const SIGN_TYPE = {
  USER: "USER",
  SYSTEM: "SYSTEM",
};

export const DIGITAL_SIGN_STATUS = {
  PENDING: "PENDING",
  APPROVAL: "APPROVAL",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  REJECT: "REJECT",
};

export const ACTION_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
};

export const SIGN_VISIBLE = {
  VISIBLE: 1,
  HIDE: 0,
};

// company code
export const TCY_HANG_HAI_VIET_NAM = "CPN7451091748209";

// commands code

export const THU_DIEN_TU = "CMD4351231218";
export const DAO_TAO_TRUC_TUYEN = "CMD4351231217";
export const CLOUD_DU_LIEU = "CMD4351234477";
export const CLOUD_FILE = "CMD4351234490";
export const CLOUD_TALK = "CMD4351234491";
export const CLOUD_EMAIL = "CMD4351234492";
export const CLOUD_DOCUMENT = "cloud_docment";
export const CLOUD_ACTIVITY = "CMD4351234493";
export const LIEN_THONG = "CMD4351230001";
export const TAI_CHINH_KE_TOAN = "CMD4351234479";
export const VAN_PHONG_DIEN_TU = "CMD4351231216";
export const VAN_PHONG_DIEN_TU_OLD = "VAN_PHONG_DIEN_TU_OLD";
export const BAO_CAO_THONG_MINH = "CMD4351234478";
export const NHAN_SU = "CMD4351234480";

// ASSIGNEE_TYPE - Loại người phân phát
export const ASSIGNEE_TYPE = {
  USER: "USER",
  DEPARTMENT: "DPT",
  GROUP: "GRP",
  HANDLER: "PIC",
  FOLLOWER: "VIEW",
  COMBINER: "COOR",
  LEADER: "LEAD",
  SIGNER: "SIGN",
  CREATE: "CREATE",
  UNIT_LEADER: "UNIT_LEADER",
  KT_KTNB: "KT_KTNB",
  HDQT: "HDQT",
};

export const SIGNATURE_TYPE = {
  PENDING: "PENDING",
  APPROVAL: "APPROVAL",
  REJECT: "REJECT",
  DELETE: "DELETE",
  USER: "USER",
  SYSTEM: "SYSTEM",
};

export const STATUS_DEFAULT = {
  PENDING: "PENDING",
  COMPLETE: "COMPLETE",
  INPROGRESS: "INPROGRESS",
  REQUESTED: "REQUESTED",
  CANCEL: "CANCEL",
  APPROVAL: "APPROVAL",
  REJECT: "REJECT",
  DELETE: "DELETE",
};
export const PROPOSAL_STATUS = {
  WAITING: "WAITING",
  CREATED: "CREATED",
  PENDING: "PENDING",
  APPROVAL: "APPROVAL",
  REJECT: "REJECT",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
};
export const POLICY_STATUS = {
  PENDING: "PENDING",
  COMPLETE: "COMPLETE",
};
export const CONSULT_STATUS = {
  PENDING: "PENDING",
  COMPLETE: "COMPLETE",
};
export const WORK_STATUS = {
  INTERNAL: "INTERNAL",
  CONSULT: "CONSULT",
  POLICY: "POLICY",
  DOCUMENT: "DOCUMENT",
  OTHER: "OTHER",
  DEPLOY: "DEPLOY",
  ELECTRONIC: "ELECTRONIC",
  PENDING: "PENDING",
  COMPLETE: "COMPLETE",
  ALL_OTHER: "INTERNAL,CONSULT,POLICY,OTHER,ELECTRONIC",
};
export const ELECTRONIC_DOCUMENT_STATUS = {
  PENDING: "PENDING",
  VT_APPROVAL: "VT_APPROVAL",
  LEAD_APPROVAL: "LEAD_APPROVAL",
  REGIS_NUMBER: "REGIS_NUMBER",
  RELEASE: "RELEASE",
  CANCEL: "CANCEL",
  READY: "READY",
};
export const NOTIFICATION_STATUS = {
  DEFAULT_TYPE: "DEFAULT_TYPE",
  OUTGOING: "OUTGOING",
  INCOMING: "INCOMING",
  LTVBNB: "LTVBNB",
  WORK: "WORK",
  TASK: "TASK",
  VEHICLE: "VEHICLE",
  LEAVE: "LEAVE",
  LEAVE_ANNUAL: "LEAVE_ANNUAL",
  LEAVE_NO_SALARY: "LEAVE_NO_SALARY",
  BUSINESS_TRIP: "BUSINESS_TRIP",
  EVALUATE_MEMBER: "EVALUATE_MEMBER",
  EVALUATE_LEADER: "EVALUATE_LEADER",
  TIMEKEEPER: "TIMEKEEPER",
  STATIONERY: "STATIONERY",
  MEETING: "MEETING",
  CONSULT: "CONSULT",
  POLICY: "POLICY",
  WORK_SCHEDULE: "WORK_SCHEDULE",
  GENERAL: "GENERAL",
  NEWS: "NEWS",
  VBLT_DI: "0301",
  VBLT_DEN: "0300",
  PROPOSAL_SALARY: "PROPOSAL_SALARY",
  INTERNAL_MESSAGE_INCOMING: "INTERNAL_MESSAGE_INCOMING",
  INTERNAL_MESSAGE_OUTGOING: "INTERNAL_MESSAGE_OUTGOING",
  INTERNAL_MESSAGE_INCOMING_REPLY: "INTERNAL_MESSAGE_INCOMING_REPLY",
  INTERNAL_MESSAGE_OUTGOING_REPLY: "INTERNAL_MESSAGE_OUTGOING_REPLY",
};
export const INTERNAL_DOCUMENT_INCOMING_STATUS = {
  PENDING: "PENDING",
  INPROGRESS: "INPROGRESS",
  COMPLETE: "COMPLETE",
};
export const MISSION_STATUS = {
  PENDING: "PENDING",
  INPROGRESS: "INPROGRESS",
  COMPLETE: "COMPLETE",
};
export const TYPE_STATUS = {
  ELECTRONIC_DOCUMENT: "ELECTRONIC_DOCUMENT",
  PROPOSAL: "PROPOSAL",
  POLICY: "POLICY",
  CONSULT: "CONSULT",
  WORK: "WORK",
  NOTIFICATION: "NOTIFICATION",
  INTERNAL_DOCUMENT_INCOMING: "INTERNAL_DOCUMENT_INCOMING",
  MISSION: "MISSION",
  WORK_SCHEDULE: "WORK_SCHEDULE",
  SALARY: "PROPOSAL_SALARY",
};
export const SORT_TYPE = {
  DESCENDING: "DESC",
  ASCENDING: "ASC",
};
export const DOCUMENT_TYPE = {
  INCOMING: "INCOMING",
  OUTGOING: "OUTGOING",
  ELEC_DOC: "ELEC_DOC",
};

export const DOCUMENT_ACCESS_TYPE = {
  VIEW_ALL: "VIEW_ALL",
  UPDATE_RESULT: "UPDATE_RESULT",
};

export const TASK_DOCUMENT_TYPE = {
  INCOMING: "001",
  OUTGOING: "002",
};

export const TASK_TYPE = Object.freeze({
  _001: {
    key: "001",
    value: "Kiến nghị/Đề xuất NĐDPV/Doanh nghiệp",
  },
  _002: {
    key: "002",
    value: "Tuyên bố Đại Lải",
  },
  _003: {
    key: "003",
    value: "Nhiệm vụ khác",
  },
  _004: {
    key: "004",
    value: "Nghị quyết HĐQT/KPI",
  },
  _005: {
    key: "005",
    value: "Thông báo kết luận",
  },
});

export const TASK_TYPE_fromKey = (strKey) => {
  return TASK_TYPE[`_${strKey}`];
};

export const WORK_TYPE = Object.freeze({
  INTERNAL: "Nội bộ trong Ban",
  CONSULT: "Xin ý kiến các Ban",
  DOCUMENT: "Từ văn bản",
  ELECTRONIC: "Trình ký văn bản",
  DEPLOY: "Từ nhiệm vụ",
  POLICY: "Xin chủ trương",
  OTHER: "Khác",
});

export const PAGE_NAME = {
  WORK: "WORK",
  BUSINESS_TRIP: "BUSINESS_TRIP",
};

export const PROPOSAL_TYPE = Object.freeze({
  // BUSINESS_TRIP: { label: 'Đăng ký công tác', key: 'BUSINESS_TRIP' },
  // LEAVE: { label: 'Đăng ký nghỉ phép', key: 'LEAVE' },
  // LEAVE_ANNUAL: { label: 'Đăng ký nghỉ phép hàng năm', key: 'LEAVE_ANNUAL' },
  // LEAVE_NO_SALARY: {
  //   label: 'Đăng ký nghỉ phép không lương',
  //   key: 'LEAVE_NO_SALARY',
  // },
  // EVALUATE_MEMBER: {
  //   label: 'Đăng ký đánh giá cán bộ < Nhân viên >',
  //   key: 'EVALUATE_MEMBER',
  // },
  // EVALUATE_LEADER: {
  //   label: 'Đăng ký đánh giá cán bộ < Trưởng ban >',
  //   key: 'EVALUATE_LEADER',
  // },
  // TIMEKEEPER: { label: 'Tổng hợp chấm công', key: 'TIMEKEEPER' },
  // //
  // STATIONERY: { label: 'Đăng ký văn phòng phẩm', key: 'STATIONERY' },
  // MEETING: { label: 'Giấy mời họp', key: 'MEETING' },
  // VEHICLE: { label: 'Xin xe', key: 'VEHICLE' },
  // PROPOSAL_SALARY: { label: 'Duyệt lương', key: 'PROPOSAL_SALARY' },
  PROPOSAL_SALARY1: {
    label: "Giấy đề nghị thuê - Hà Nội",
    key: "PROPOSAL_SALARY1",
  },
  PROPOSAL_SALARY2: {
    label: "Giấy đề nghị thuê - Hải Phòng",
    key: "PROPOSAL_SALARY2",
  },
  PROPOSAL_SALARY3: {
    label: "Giấy đề nghị thuê - Hồ Chí Minh",
    key: "PROPOSAL_SALARY3",
  },
  PROPOSAL_SALARY4: {
    label: "Giấy đề nghị thanh toán - Hà Nội",
    key: "PROPOSAL_SALARY4",
  },
  PROPOSAL_SALARY5: {
    label: "Giấy đề nghị thanh toán - Hải Phòng",
    key: "PROPOSAL_SALARY5",
  },
  PROPOSAL_SALARY6: {
    label: "Giấy đề nghị thanh toán - Hồ Chí Minh",
    key: "PROPOSAL_SALARY6",
  },
  PROPOSAL_SALARY7: {
    label: "Giấy đề nghị tạm ứng - Hà Nội",
    key: "PROPOSAL_SALARY7",
  },
  PROPOSAL_SALARY8: {
    label: "Giấy đề nghị tạm ứng - Hải Phòng",
    key: "PROPOSAL_SALARY8",
  },
  PROPOSAL_SALARY9: {
    label: "Giấy đề nghị tạm ứng - Hồ Chí Minh",
    key: "PROPOSAL_SALARY9",
  },
  PROPOSAL_SALARY10: {
    label: "Đơn xin nghỉ phép - Hà Nội",
    key: "PROPOSAL_SALARY10",
  },
  PROPOSAL_SALARY11: {
    label: "Đơn xin nghỉ phép - Hải Phòng",
    key: "PROPOSAL_SALARY11",
  },
  PROPOSAL_SALARY12: {
    label: "Đơn xin nghỉ phép - Hồ Chí Minh",
    key: "PROPOSAL_SALARY12",
  },
  PROPOSAL_SALARY13: {
    label: "Giấy đề nghị vật tư khoán - Hà Nội",
    key: "PROPOSAL_SALARY13",
  },
  PROPOSAL_SALARY14: {
    label: "Giấy đề nghị vật tư khoán - Hải Phòng",
    key: "PROPOSAL_SALARY14",
  },
  PROPOSAL_SALARY15: {
    label: "Giấy đề nghị vật tư khoán - Hồ Chí Minh",
    key: "PROPOSAL_SALARY15",
  },
  PROPOSAL_SALARY16: {
    label: "Đơn xin ký tiếp HĐLĐ - Hà Nội",
    key: "PROPOSAL_SALARY16",
  },
  PROPOSAL_SALARY17: {
    label: "Đề nghị thay dầu xe - Hà Nội",
    key: "PROPOSAL_SALARY17",
  },
  PROPOSAL_SALARY18: {
    label: "Đề nghị đi công tác - Hà Nội",
    key: "PROPOSAL_SALARY18",
  },
  PROPOSAL_SALARY19: {
    label: "Đơn xin ký tiếp HĐLĐ - Hải Phòng",
    key: "PROPOSAL_SALARY19",
  },
  PROPOSAL_SALARY20: {
    label: "Đề nghị thay dầu xe - Hải Phòng",
    key: "PROPOSAL_SALARY20",
  },
  PROPOSAL_SALARY21: {
    label: "Đề nghị đi công tác - Hải Phòng",
    key: "PROPOSAL_SALARY21",
  },
  PROPOSAL_SALARY22: {
    label: "Đơn xin ký tiếp HĐLĐ - Hồ Chí Minh",
    key: "PROPOSAL_SALARY22",
  },
  PROPOSAL_SALARY23: {
    label: "Đề nghị thay dầu xe - Hồ Chí Minh",
    key: "PROPOSAL_SALARY23",
  },
  PROPOSAL_SALARY24: {
    label: "Đề nghị đi công tác - Hồ Chí Minh",
    key: "PROPOSAL_SALARY24",
  },
});

export const SALARY_STATUS = {
  PENDING: "PENDING", //Chờ duyệt
  TRUONG_BAN_APPROVED: "TRUONG_BAN_APPROVED", //Trưởng ban duyệt
  TGD_APPROVED: "TGD_APPROVED", //Tổng giám đốc duyệt
};
export const SALARY_TYPE = {
  MANAGER: "MANAGER",
  EMPLOYEE: "EMPLOYEE",
};
export const CONFIG_DOCUMENT_TYPE = {
  CONFIG_BOOK: "CONFIG_BOOK",
  CONFIG_BOOK_GROUP: "CONFIG_BOOK_GROUP",
};
export const KPI_TYPE = {
  KPI: "kpi",
  TARGET: "target",
  SUB_TARGET: "sub_target",
  WORK: "work",
};
export const CLOUD_DOCUMENT_TYPE = {
  FOLDER: 0,
  FILE: 1,
};
export const ACL_TYPE = {
  DEFAULT: "DEFAULT",
  CUSTOM: "CUSTOM",
  CHU_KY_CUA_TOI: "CHU_KY_CUA_TOI",
  INCOMING: "INCOMING",
  INTERNAL_DOCUMENT: "INTERNAL_DOCUMENT",
  ISO: "ISO",
  KY_SO: "KY_SO",
  LIEN_THONG_INCOMING: "LIEN_THONG_INCOMING",
  LIEN_THONG_OUTGOING: "LIEN_THONG_OUTGOING",
  LIEN_THONG_VB: "LIEN_THONG_VB",
  LIEN_THONG_VB_NOI_BO: "LIEN_THONG_VB_NOI_BO",
  LIEN_THONG_VB_NOI_BO_INCOMING: "LIEN_THONG_VB_NOI_BO_INCOMING",
  MISSION: "MISSION",
  MY_SALARY: "MY_SALARY",
  NEWS: "NEWS",
  NHOM_NGUOI_DUNG: "NHOM_NGUOI_DUNG",
  NHOM_NHIEM_VU: "NHOM_NHIEM_VU",
  OUTGOING: "OUTGOING",
  PHAP_CHE: "PHAP_CHE",
  PROPOSAL: "PROPOSAL",
  PROPOSAL_ADVANCE: "PROPOSAL_ADVANCE",
  SALARY: "SALARY",
  TAI_LIEU_DA_KY: "TAI_LIEU_DA_KY",
  TIN_NHAN_LIEN_THONG: "TIN_NHAN_LIEN_THONG",
  TIN_NHAN_NOI_BO: "TIN_NHAN_NOI_BO",
  UBQLV: "UBQLV",
  VAN_BAN_MAU: "VAN_BAN_MAU",
  WORK: "WORK",
  WORK_SCHEDULE: "WORK_SCHEDULE",
  PHAT_HANH_VB: "PHAT_HANH_VB",
  TAI_KHOAN_KY_SO: "TAI_KHOAN_KY_SO",
  KPI: "KPI",
  QUAN_LY_PHONG_BAN: "QUAN_LY_PHONG_BAN",
  CHUC_DANH: "CHUC_DANH",
};
export const ACL_ACTION_TYPE = {
  // CHU_KY_CUA_TOI
  create__CHU_KY_CUA_TOI: "create__CHU_KY_CUA_TOI",
  delete__CHU_KY_CUA_TOI: "delete__CHU_KY_CUA_TOI",
  // TAI_KHOAN_KY_SO
  menu__TAI_KHOAN_KY_SO: "menu__TAI_KHOAN_KY_SO",
  create__TAI_KHOAN_KY_SO: "create__TAI_KHOAN_KY_SO",
  edit__TAI_KHOAN_KY_SO: "edit__TAI_KHOAN_KY_SO",
  delete__TAI_KHOAN_KY_SO: "delete__TAI_KHOAN_KY_SO",
  // INCOMING
  edit__INCOMING: "edit__INCOMING",
  xuly__INCOMING: "xuly__INCOMING",
  create__INCOMING: "create__INCOMING",
  delete__INCOMING: "delete__INCOMING",
  phanphat__INCOMING: "phanphat__INCOMING",
  tao_nv_tu_vb__INCOMING: "tao_nv_tu_vb__INCOMING",
  tao_cv_tu_vb__INCOMING: "tao_cv_tu_vb__INCOMING",
  ky_so__INCOMING: "ky_so__INCOMING",
  // INTERNAL_DOCUMENT
  menu__INTERNAL_DOCUMENT: "menu__INTERNAL_DOCUMENT",
  tab_vb_di__INTERNAL_DOCUMENT: "tab_vb_di__INTERNAL_DOCUMENT",
  tab_vb_den__INTERNAL_DOCUMENT: "tab_vb_den__INTERNAL_DOCUMENT",
  tab_cau_hinh_vb__INTERNAL_DOCUMENT: "tab_cau_hinh_vb__INTERNAL_DOCUMENT",
  tab_phat_hanh_vb__INTERNAL_DOCUMENT: "tab_phat_hanh_vb__INTERNAL_DOCUMENT",
  // ISO
  menu__ISO: "menu__ISO",
  create__ISO: "create__ISO",
  delete__ISO: "delete__ISO",
  upload__ISO: "upload__ISO",
  rename__ISO: "rename__ISO",
  move__ISO: "move__ISO",
  //
  menu__KY_SO: "menu__KY_SO",
  // KY_SO
  tab_quan_ly__KY_SO: "tab_quan_ly__KY_SO",
  tab_tai_lieu__KY_SO: "tab_tai_lieu__KY_SO",
  tab_chu_ky_so_cua_toi__KY_SO: "tab_chu_ky_so_cua_toi__KY_SO",
  // LIEN_THONG_INCOMING
  delete__LIEN_THONG_INCOMING: "delete__LIEN_THONG_INCOMING",
  receive__LIEN_THONG_INCOMING: "receive__LIEN_THONG_INCOMING",
  // LIEN_THONG_OUTGOING
  edit__LIEN_THONG_OUTGOING: "edit__LIEN_THONG_OUTGOING",
  create__LIEN_THONG_OUTGOING: "create__LIEN_THONG_OUTGOING",
  delete__LIEN_THONG_OUTGOING: "delete__LIEN_THONG_OUTGOING",
  // LIEN_THONG_VB
  menu__LIEN_THONG_VB: "menu__LIEN_THONG_VB",
  tab_vb_di__LIEN_THONG_VB: "tab_vb_di__LIEN_THONG_VB",
  tab_vb_den__LIEN_THONG_VB: "tab_vb_den__LIEN_THONG_VB",
  //LIEN_THONG_VB_NOI_BO
  menu__LIEN_THONG_VB_NOI_BO: "menu__LIEN_THONG_VB_NOI_BO",
  // LIEN_THONG_VB_NOI_BO_INCOMING
  receive__LIEN_THONG_VB_NOI_BO_INCOMING:
    "receive__LIEN_THONG_VB_NOI_BO_INCOMING",
  // MISSION
  edit__MISSION: "edit__MISSION",
  menu__MISSION: "menu__MISSION",
  create__MISSION: "create__MISSION",
  delete__MISSION: "delete__MISSION",
  cap_nhat__MISSION: "cap_nhat__MISSION",
  create_work__MISSION: "create_work__MISSION",
  bang_tong_hop__MISSION: "bang_tong_hop__MISSION",
  hien_thi_full__MISSION: "hien_thi_full__MISSION",
  chuyen_sang_thang__MISSION: "chuyen_sang_thang__MISSION",
  lanh_dao__MISSION: "lanh_dao__MISSION",
  // NEWS
  edit__NEWS: "edit__NEWS",
  menu__NEWS: "menu__NEWS",
  create__NEWS: "create__NEWS",
  delete__NEWS: "delete__NEWS",
  // OUTGOING
  edit__OUTGOING: "edit__OUTGOING",
  xuly__OUTGOING: "xuly__OUTGOING",
  create__OUTGOING: "create__OUTGOING",
  delete__OUTGOING: "delete__OUTGOING",
  phanphat__OUTGOING: "phanphat__OUTGOING",
  lienthong_ubqlv__OUTGOING: "lienthong_ubqlv__OUTGOING",
  lienthong_noibo__OUTGOING: "lienthong_noibo__OUTGOING",
  tao_nv_tu_vb__OUTGOING: "tao_nv_tu_vb__OUTGOING",
  tao_cv_tu_vb__OUTGOING: "tao_cv_tu_vb__OUTGOING",
  ky_so__OUTGOING: "ky_so__OUTGOING",
  // PHAP_CHE
  edit__PHAP_CHE: "edit__PHAP_CHE",
  menu__PHAP_CHE: "menu__PHAP_CHE",
  create__PHAP_CHE: "create__PHAP_CHE",
  delete__PHAP_CHE: "delete__PHAP_CHE",
  // PROPOSAL
  menu__PROPOSAL: "menu__PROPOSAL",
  create__PROPOSAL: "create__PROPOSAL",
  delete__PROPOSAL: "delete__PROPOSAL",
  approve__PROPOSAL: "approve__PROPOSAL",
  // SALARY
  menu__SALARY: "menu__SALARY",
  create__SALARY: "create__SALARY",
  delete__SALARY: "delete__SALARY",
  approve__SALARY: "approve__SALARY",
  // TAI_LIEU_DA_KY
  create__TAI_LIEU_DA_KY: "create__TAI_LIEU_DA_KY",
  delete__TAI_LIEU_DA_KY: "delete__TAI_LIEU_DA_KY",
  download__TAI_LIEU_DA_KY: "download__TAI_LIEU_DA_KY",
  // TIN_NHAN_LIEN_THONG
  menu__TIN_NHAN_LIEN_THONG: "menu__TIN_NHAN_LIEN_THONG",
  send__TIN_NHAN_LIEN_THONG: "send__TIN_NHAN_LIEN_THONG",
  // TIN_NHAN_NOI_BO
  menu__TIN_NHAN_NOI_BO: "menu__TIN_NHAN_NOI_BO",
  send__TIN_NHAN_NOI_BO: "send__TIN_NHAN_NOI_BO",
  // UBQLV
  menu__UBQLV: "menu__UBQLV",
  tab_vb_di__UBQLV: "tab_vb_di__UBQLV",
  tab_vb_den__UBQLV: "tab_vb_den__UBQLV",
  tab_cty__UBQLV: "tab_cty__UBQLV",
  // WORK
  edit__WORK: "edit__WORK",
  menu__WORK: "menu__WORK",
  create__WORK: "create__WORK",
  delete__WORK: "delete__WORK",
  uu_tien__WORK: "uu_tien__WORK",
  phat_hanh__WORK: "phat_hanh__WORK",
  them_nguoi__WORK: "them_nguoi__WORK",
  them_cong_viec_phu__WORK: "them_cong_viec_phu__WORK",
  cap_nhat_trang_thai__WORK: "cap_nhat_trang_thai__WORK",
  sua_cong_viec_phu__WORK: "sua_cong_viec_phu__WORK",
  xoa_cong_viec_phu__WORK: "xoa_cong_viec_phu__WORK",
  // WORK_SCHEDULE
  edit__WORK_SCHEDULE: "edit__WORK_SCHEDULE",
  menu__WORK_SCHEDULE: "menu__WORK_SCHEDULE",
  create__WORK_SCHEDULE: "create__WORK_SCHEDULE",
  delete__WORK_SCHEDULE: "delete__WORK_SCHEDULE",
  view_dashboard__WORK_SCHEDULE: "view_dashboard__WORK_SCHEDULE",
  // MY_SALARY
  menu__MY_SALARY: "menu__MY_SALARY",
  // NHOM_NGUOI_DUNG
  menu__NHOM_NGUOI_DUNG: "menu__NHOM_NGUOI_DUNG",
  create__NHOM_NGUOI_DUNG: "create__NHOM_NGUOI_DUNG",
  edit__NHOM_NGUOI_DUNG: "edit__NHOM_NGUOI_DUNG",
  delete__NHOM_NGUOI_DUNG: "delete__NHOM_NGUOI_DUNG",
  remove_member__NHOM_NGUOI_DUNG: "remove_member__NHOM_NGUOI_DUNG",
  // NHOM_NHIEM_VU
  menu__NHOM_NHIEM_VU: "menu__NHOM_NHIEM_VU",
  create__NHOM_NHIEM_VU: "create__NHOM_NHIEM_VU",
  edit__NHOM_NHIEM_VU: "edit__NHOM_NHIEM_VU",
  delete__NHOM_NHIEM_VU: "delete__NHOM_NHIEM_VU",
  remove_member__NHOM_NHIEM_VU: "remove_member__NHOM_NHIEM_VU",
  // PROPOSAL_ADVANCE
  menu__PROPOSAL_ADVANCE: "menu__PROPOSAL_ADVANCE",
  create__PROPOSAL_ADVANCE: "create__PROPOSAL_ADVANCE",
  approve__PROPOSAL_ADVANCE: "approve__PROPOSAL_ADVANCE",
  delete__PROPOSAL_ADVANCE: "delete__PROPOSAL_ADVANCE",
  // VAN_BAN_MAU
  menu__VAN_BAN_MAU: "menu__VAN_BAN_MAU",
  create__VAN_BAN_MAU: "create__VAN_BAN_MAU",
  edit__VAN_BAN_MAU: "edit__VAN_BAN_MAU",
  delete__VAN_BAN_MAU: "delete__VAN_BAN_MAU",
  // PHAT_HANH_VB
  van_thu_duyet__PHAT_HANH_VB: "van_thu_duyet__PHAT_HANH_VB",
  lanh_dao_duyet__PHAT_HANH_VB: "lanh_dao_duyet__PHAT_HANH_VB",
  cap_so__PHAT_HANH_VB: "cap_so__PHAT_HANH_VB",
  lanh_dao_huy_duyet__PHAT_HANH_VB: "lanh_dao_huy_duyet__PHAT_HANH_VB",
  ky_so_tai_lieu__PHAT_HANH_VB: "ky_so_tai_lieu__PHAT_HANH_VB",
  phat_hanh_tai_lieu__PHAT_HANH_VB: "phat_hanh_tai_lieu__PHAT_HANH_VB",
  delete__PHAT_HANH_VB: "delete__PHAT_HANH_VB",
  create__PHAT_HANH_VB: "create__PHAT_HANH_VB",
  // KPI
  menu__KPI: "menu__KPI",
  create__KPI: "create__KPI",
  edit__KPI: "edit__KPI",
  delete__KPI: "delete__KPI",
  // QUAN LY PHONG BAN
  menu__QUAN_LY_PHONG_BAN: "menu__QUAN_LY_PHONG_BAN",
  create__QUAN_LY_PHONG_BAN: "create__QUAN_LY_PHONG_BAN",
  edit__QUAN_LY_PHONG_BAN: "edit__QUAN_LY_PHONG_BAN",
  delete__QUAN_LY_PHONG_BAN: "delete__QUAN_LY_PHONG_BAN",
  sort__QUAN_LY_PHONG_BAN: "sort__QUAN_LY_PHONG_BAN",
  create_employee__QUAN_LY_PHONG_BAN: "create_employee__QUAN_LY_PHONG_BAN",
  edit_employee__QUAN_LY_PHONG_BAN: "edit_employee__QUAN_LY_PHONG_BAN",
  // CHUC DANH
  menu__CHUC_DANH: "menu__CHUC_DANH",
  create__CHUC_DANH: "create__CHUC_DANH",
  edit__CHUC_DANH: "edit__CHUC_DANH",
  view__CHUC_DANH: "view__CHUC_DANH",
  delete__CHUC_DANH: "delete__CHUC_DANH",
  sort__CHUC_DANH: "sort__CHUC_DANH",
};
export const MODULE_CODE = {
  // -- văn bản
  van_ban: "van_ban",
  van_ban_noi_bo: "van_ban_noi_bo",
  lien_thong_van_ban: "lien_thong_van_ban",
  lien_thong_van_ban_noi_bo: "lien_thong_van_ban_noi_bo",
  lien_thong_van_ban_ubqlv: "lien_thong_van_ban_ubqlv",
  so_van_ban: "so_van_ban",
  van_ban_mau: "van_ban_mau",
  co_quan_ban_hanh: "co_quan_ban_hanh",
  // -- nhiệm vụ
  nhiem_vu: "nhiem_vu",
  tin_nhan_lien_thong: "tin_nhan_lien_thong",
  tin_nhan_noi_bo: "tin_nhan_noi_bo",
  // -- công việc
  cong_viec: "cong_viec",
  // -- lịch cơ quan
  lich_co_quan: "lich_co_quan",
  // -- bảng lương
  bang_luong: "bang_luong",
  duyet_luong: "duyet_luong",
  luong_cua_toi: "luong_cua_toi",
  // -- hành chính
  hanh_chinh: "hanh_chinh",
  sub_hanh_chinh: "sub_hanh_chinh",
  phieu_rui_ro: "phieu_rui_ro",
  tam_ung: "tam_ung",
  // -- ký số
  ky_so: "ky_so",
  tai_khoan_ky_so: "tai_khoan_ky_so",
  // -- quản trị
  quan_tri: "quan_tri",
  nhom_nguoi_dung: "nhom_nguoi_dung",
  nhom_nhiem_vu: "nhom_nhiem_vu",
  nguoi_dung: "nguoi_dung",
  phong_ban: "phong_ban",
  chuc_danh: "chuc_danh",
  // -- tiện ích
  tien_ich: "tien_ich",
  tai_lieu_iso: "tai_lieu_iso",
  vb_phap_che: "vb_phap_che",
  thong_bao_chung: "thong_bao_chung",
  // -- kpi
  kpi: "kpi",
};

export const RISK_TYPE = {
  DELEGATE: "NDDPV",
  UNIT: "DVPT",
  AGENCY: "CQVP",
};

export const VIEWLOG_DATE = {
  work_read_until: "2023-01-14",
  internal_document_until: "2022-12-28",
};
