import React from 'react'
import {
  ELECTRONIC_DOCUMENT_STATUS,
  INTERNAL_DOCUMENT_INCOMING_STATUS,
  MISSION_STATUS,
  NOTIFICATION_STATUS,
  POLICY_STATUS,
  PROPOSAL_STATUS,
  SALARY_STATUS,
  TYPE_STATUS,
  WORK_STATUS,
} from '../../constants'
import { Tag } from 'antd'

export const StatusTag = (typePage, status, isText = false) => {
  let text = 'Không rõ'
  let color = null

  if (typePage === TYPE_STATUS.ELECTRONIC_DOCUMENT) {
    if (status === ELECTRONIC_DOCUMENT_STATUS.PENDING) {
      color = 'orange'
      text = 'Chưa xử lý'
    }
    if (status === ELECTRONIC_DOCUMENT_STATUS.VT_APPROVAL) {
      color = 'blue'
      text = 'Văn thư đã duyệt'
    }
    if (status === ELECTRONIC_DOCUMENT_STATUS.LEAD_APPROVAL) {
      color = 'geekblue'
      text = 'Lãnh đạo đã duyệt'
    }
    if (status === ELECTRONIC_DOCUMENT_STATUS.REGIS_NUMBER) {
      color = 'purple'
      text = 'Đã cấp số'
    }
    if (status === ELECTRONIC_DOCUMENT_STATUS.READY) {
      color = 'cyan'
      text = 'Chờ phát hành'
    }
    if (status === ELECTRONIC_DOCUMENT_STATUS.RELEASE) {
      color = 'green'
      text = 'Đã phát hành'
    }
  }
  if (typePage === TYPE_STATUS.PROPOSAL) {
    if (status === PROPOSAL_STATUS.PENDING) {
      color = 'orange'
      text = 'Chờ phê duyệt'
    }
    if (status === PROPOSAL_STATUS.APPROVAL) {
      color = 'green'
      text = 'Đã phê duyệt'
    }
    if (status === PROPOSAL_STATUS.REJECT) {
      color = 'red'
      text = 'Từ chối'
    }
  }
  if (typePage === TYPE_STATUS.POLICY) {
    if (status === POLICY_STATUS.PENDING) {
      color = 'blue'
      text = 'Đang xử lý'
    }
    if (status === POLICY_STATUS.COMPLETE) {
      color = 'green'
      text = 'Hoàn thành'
    }
  }
  if (typePage === TYPE_STATUS.CONSULT) {
    if (status === POLICY_STATUS.PENDING) {
      color = 'blue'
      text = 'Đang cho ý kiến'
    }
    if (status === POLICY_STATUS.COMPLETE) {
      color = 'green'
      text = 'Hoàn thành'
    }
  }
  if (typePage === TYPE_STATUS.WORK) {
    if (status === WORK_STATUS.INTERNAL) {
      color = 'cyan'
      text = 'Nội bộ trong Ban'
    }
    if (status === WORK_STATUS.CONSULT) {
      color = 'orange'
      text = 'Xin ý kiến các Ban'
    }
    if (status === WORK_STATUS.POLICY) {
      color = 'geekblue'
      text = 'Xin chủ trương'
    }
    if (status === WORK_STATUS.DOCUMENT) {
      color = 'blue'
      text = 'Xử lý văn bản'
    }
    if (status === WORK_STATUS.ELECTRONIC) {
      color = 'magenta'
      text = 'Trình ký văn bản'
    }
    if (status === WORK_STATUS.DEPLOY) {
      color = 'volcano'
      text = 'Triển khai nhiệm vụ'
    }
    if (status === WORK_STATUS.OTHER) {
      color = 'magenta'
      text = 'Loại khác'
    }
    if (status === WORK_STATUS.COMPLETE) {
      color = 'green'
      text = 'Hoàn thành'
    }
    if (status === WORK_STATUS.PENDING) {
      color = 'purple'
      text = 'Đang thực hiện'
    }
  }
  if (typePage === TYPE_STATUS.NOTIFICATION) {
    if (status === NOTIFICATION_STATUS.OUTGOING) {
      color = 'green'
      text = 'Văn bản nội bộ đi'
    }
    if (status === NOTIFICATION_STATUS.INCOMING) {
      color = 'green'
      text = 'Văn bản nội bộ đến'
    }
    if (status === NOTIFICATION_STATUS.LTVBNB) {
      color = 'green'
      text = 'Liên thông văn bản nội bộ'
    }
    if (status === NOTIFICATION_STATUS.WORK) {
      color = 'orange'
      text = 'Công việc'
    }
    if (status === NOTIFICATION_STATUS.TASK) {
      color = 'purple'
      text = 'Nhiệm vụ'
    }
    if (
      [
        NOTIFICATION_STATUS.DEFAULT_TYPE,
        NOTIFICATION_STATUS.VEHICLE,
        NOTIFICATION_STATUS.LEAVE,
        NOTIFICATION_STATUS.LEAVE_ANNUAL,
        NOTIFICATION_STATUS.LEAVE_NO_SALARY,
        NOTIFICATION_STATUS.BUSINESS_TRIP,
        NOTIFICATION_STATUS.EVALUATE_MEMBER,
        NOTIFICATION_STATUS.EVALUATE_LEADER,
        NOTIFICATION_STATUS.TIMEKEEPER,
        NOTIFICATION_STATUS.STATIONERY,
        NOTIFICATION_STATUS.MEETING,
      ].includes(status)
    ) {
      color = 'cyan'
      text = 'Hành chính'
    }
    if ([NOTIFICATION_STATUS.PROPOSAL_SALARY].includes(status)) {
      color = 'cyan'
      text = 'Duyệt lương'
    }
    if (status === NOTIFICATION_STATUS.CONSULT) {
      color = '#597ef7'
      text = 'Xin ý kiến'
    }
    if (status === NOTIFICATION_STATUS.POLICY) {
      color = '#69c0ff'
      text = 'Xin chủ chương'
    }
    if (status === NOTIFICATION_STATUS.VBLT_DI) {
      color = '#69c0ff'
      text = 'Văn bản liên thông đi'
    }
    if (status === NOTIFICATION_STATUS.VBLT_DEN) {
      color = '#69c0ff'
      text = 'Văn bản liên thông đến'
    }
    if (status === NOTIFICATION_STATUS.WORK_SCHEDULE) {
      color = '#d03bff'
      text = 'Lịch cơ quan'
    }
    if (status === NOTIFICATION_STATUS.GENERAL) {
      color = 'blue'
      text = 'Thông báo chung'
    }
    if (
      status === NOTIFICATION_STATUS.INTERNAL_MESSAGE_INCOMING ||
      status === NOTIFICATION_STATUS.INTERNAL_MESSAGE_OUTGOING ||
      status === NOTIFICATION_STATUS.INTERNAL_MESSAGE_INCOMING_REPLY ||
      status === NOTIFICATION_STATUS.INTERNAL_MESSAGE_OUTGOING_REPLY
    ) {
      color = 'blue'
      text = 'Tin nhắn'
    }
  }
  if (typePage === TYPE_STATUS.INTERNAL_DOCUMENT_INCOMING) {
    if (status === INTERNAL_DOCUMENT_INCOMING_STATUS.PENDING) {
      color = 'orange'
      text = 'Chờ xử lý'
    }
    if (status === INTERNAL_DOCUMENT_INCOMING_STATUS.INPROGRESS) {
      color = 'blue'
      text = 'Đã bút phê'
    }
    if (status === INTERNAL_DOCUMENT_INCOMING_STATUS.COMPLETE) {
      color = 'green'
      text = 'Hoàn thành'
    }
  }
  if (typePage === TYPE_STATUS.MISSION) {
    if (status === MISSION_STATUS.PENDING) {
      color = 'orange'
      text = 'Chưa thực hiện'
    }
    if (status === MISSION_STATUS.INPROGRESS) {
      color = 'blue'
      text = 'Đang thực hiện'
    }
    if (status === MISSION_STATUS.COMPLETE) {
      color = 'green'
      text = 'Hoàn thành'
    }
  }

  if (typePage === TYPE_STATUS.SALARY) {
    if (status === SALARY_STATUS.PENDING) {
      color = 'orange'
      text = 'Chờ phê duyệt'
    }
    if (status === SALARY_STATUS.TRUONG_BAN_APPROVED) {
      color = 'blue'
      text = 'Trưởng ban đã duyệt'
    }
    if (status === SALARY_STATUS.TGD_APPROVED) {
      color = 'green'
      text = 'Tổng giám đốc đã duyệt'
    }
  }

  if (isText) {
    return text
  }

  return (
    <span style={{ display: 'flex', alignItems: 'center' }}>
      {color && (
        <Tag color={color} style={{ borderRadius: 10, margin: 0 }}>
          {text}
        </Tag>
      )}
    </span>
  )
}
