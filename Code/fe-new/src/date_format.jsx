import moment from 'moment'
import React from 'react'
import { DATE_FORMAT_DEFAULT, DATE_FORMAT_SLASH } from './constants'

const date_format = {
  // Date
  HH_mm_DD_MM_YYYY: d => moment(d).format('HH:mm - DD/MM/YYYY'),
  DEFAULT_DATE: d => moment(d).format(DATE_FORMAT_DEFAULT),
  MMMM_YYYY: d => moment(d).format('MMMM, YYYY'),
  DATE_FORMAT_SLASH: d => moment(d).format(DATE_FORMAT_SLASH),

  // Time
  HH_mm: t => moment(t).format('HH:mm'),
  ISO_DATE_FORMAT: t => moment(t).format('YYYY-MM-DD'),

  // Start of week
  getStartOfWeek: (value, format) =>
    moment(value).startOf('week').format(format),
  getEndOfWeek: (value, format) => moment(value).endOf('week').format(format),

  // render time
  renderTime: time => {
    if (!time) return 'Không rõ'
    const formatDay = moment(time).format('dddd')
    const formatDate = moment(time).format('D')
    const formatMonth = moment(time).format('M')
    const formatYear = moment(time).format('YYYY')

    const renderDate = `${formatDay}, ${formatDate} tháng ${formatMonth}, ${formatYear}`
    const renderTime = ` lúc ${date_format.HH_mm(time)}`
    let renderNotifyTime = (
      <span>
        <span style={{ textTransform: 'capitalize' }}>{renderDate}</span>
        <span>{renderTime}</span>
      </span>
    )

    let renderTimeFromNow = moment(time).fromNow()
    const compareBeforeOneDay = moment().subtract(21.5, 'hours')
    const compareBeforeOneWeek = moment().subtract(6, 'days')

    const notifyTime = moment(time)
    if (renderTimeFromNow.includes('một')) {
      renderTimeFromNow = renderTimeFromNow.replace('một', '1')
    }

    if (compareBeforeOneWeek.isBefore(notifyTime)) {
      renderNotifyTime = (
        // <Tooltip placement='bottomLeft' title={renderNotifyTime}>
        //   <span style={{ cursor: 'default' }}>{renderTimeFromNow}</span>
        // </Tooltip>
        // Hiển thì đầy đủ thời gian
        <span style={{ cursor: 'default' }}>{renderNotifyTime}</span>
      )
    }

    // if (compareBeforeOneDay.isAfter(notifyTime) && compareBeforeOneWeek.isBefore(notifyTime)) {
    //   renderNotifyTime = (
    //     <Tooltip placement='bottomLeft' title={renderNotifyTime}>
    //       <span style={{ cursor: 'default' }}>{renderTimeFromNow}</span>
    //     </Tooltip>
    //   )
    // }
    return renderNotifyTime
  },
}

const fromFormat = {
  ISO_DATE_FORMAT: str => moment(str),
}

export { fromFormat }

export default date_format
