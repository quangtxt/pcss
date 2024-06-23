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
export const ADMIN = "ADMIN";
export const STAFF = "STAFF";
export const SECRETARY = "SECRETARY";
export const MENTOR_LEADER = "MENTOR_LEADER";
export const MENTOR = "MENTOR";
export const STUDENT = "STUDENT";

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
export const SORT_TYPE = {
  DESCENDING: "DESC",
  ASCENDING: "ASC",
};
export const MEMBER_STATUS = {
  PENDING: "PENDING",
  INGROUP: "INGROUP",
  OUT_GROUP: "OUTGROUP",
};

export const MENTOR_STATUS = {
  PENDING: "PENDING_MENTOR",
  REJECT: "REJECT_MENTOR",
  ACCEPT: "ACCEPT_MENTOR",
};

export const ACL_TYPE = {};
export const ACL_ACTION_TYPE = {};
export const MODULE_CODE = {};
