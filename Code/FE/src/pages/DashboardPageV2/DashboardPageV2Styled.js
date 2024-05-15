import { Card, Col, List } from 'antd'
import styled, { css } from 'styled-components'

export const DashboardCard = styled.div`
  .ant-card {
    border-radius: 6px;
    transition: all ease-in-out 0.25s;

    &:hover {
      box-shadow: 0 24px 32px rgba(0, 0, 0, 0.04),
        0 16px 24px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.04),
        0 0 1px rgba(0, 0, 0, 0.04);
    }
  }

  .ant-card-meta-detail {
    display: flex;
    justify-content: space-between;
  }

  .ant-card-meta-title {
    margin-bottom: 0 !important;
    font-weight: normal;
    font-size: 14px;
    padding-top: 0.5rem;
  }

  .ant-card-meta-description {
    font-weight: 500;
    font-size: 30px;
    text-align: right;
    color: rgba(0, 0, 0, 0.85);
  }
`
export const ScheduleList = styled.ul`
  width: calc(100% - 400px);
  max-height: 280px;
  overflow-x: hidden;
  overflow-y: auto;
  border-top: 1px solid #f0f0f0;
  padding-left: 30px;
  padding-top: 15px;
  position: relative;
  list-style: none;
  @media screen and (max-width: 1024px) {
    width: 100%;
    max-height: 500px;
    margin-top: 15px;
    padding-left: 0;
  }

  ${props =>
    props.isEmpty &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      flex-wrap: wrap;
    `}
  li {
    padding: 1rem 1rem 1rem 1.5rem;
    background: #e4eaf2;
    border-radius: 6px;
    position: relative;
    display: inline-block;
    margin: 0 1rem 1rem 0;
    min-width: 400px;
    cursor: pointer;

    &::before {
      position: absolute;
      content: '';
      width: 6px;
      height: calc(100% - 1rem);
      top: 0.5rem;
      left: 0.5rem;
      background-color: #2c65ac;
      border-radius: 6px;
    }

    strong {
      display: block;
      margin-bottom: 0.25rem;
    }
  }
`
export const CalendarWrapper = styled.div`
  width: 400px;

  .ant-picker-body {
    padding-top: 15px !important;
  }

  .ant-picker-calendar-header {
    position: absolute;
    top: 10px;
    right: 15px;
  }

  .ant-picker-cell-in-view.ant-picker-cell-selected
    .ant-picker-cell-inner:not(.ant-picker-cell-today),
  .ant-picker-cell-in-view.ant-picker-cell-range-start
    .ant-picker-cell-inner:not(.ant-picker-cell-today),
  .ant-picker-cell-in-view.ant-picker-cell-range-end
    .ant-picker-cell-inner:not(.ant-picker-cell-today) {
    background: #2c65ac !important;
  }

  .ant-picker-cell-in-view.ant-picker-cell-today .ant-picker-cell-inner:before {
    border: 1px solid #2c65ac !important;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`
export const weekLayoutStyles = {
  backgroundColor: '#fff',
}
export const colStyles = {
  flexBasis: '14.2%',
  width: '14.2%',
}
export const ColBody = styled.div``
export const ItemCalendarHeader = styled.div`
  background-color: #fafafa;
  color: #000000;
  width: 100%;
  height: 56px;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const ItemCalendarContent = styled.div`
  margin-bottom: 24px;
  position: relative;

  :after {
    content: '';
    background-color: #00000026;
    position: absolute;
    width: 1px;
    height: 100%;
    top: 0;
    left: 100%;
    display: block;
  }
`
export const TextTime = styled.p`
  margin: -16px -5px -10px -10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  padding: 10px;
  row-gap: 10px;
  background-color: #f8e8fd;
  box-shadow: rgba(0, 0, 0, 0.05) 0 0 0 1px;
  cursor: pointer;
`

export const TextChiTiet = styled.span`
  display: block;
  color: #2e3445;
  text-decoration: underline;
  font-style: italic;
  font-size: 10px;
  font-weight: 400;
`

export const TextWrapper = styled.p`
  margin-bottom: 0;
`

export const BoxChart = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 10px;
`
export const BoxChartLoading = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 10px;
  z-index: 20;
  opacity: 1;
  background-color: #fff;
`

export const WorkScheduledWrapper = styled.dl`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 5px;
  padding-right: 20px;

  &:last-child {
    margin-bottom: -10px;
  }

  dt {
    width: 120px;
    font-weight: 700;
    padding: 0 10px;

    &:after {
      display: inline-block;
      content: ':';
    }
  }

  dd {
    width: calc(100% - 150px);
    word-break: break-all;
  }

  dt,
  dd {
    min-height: 30px;
    margin-bottom: 0;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    //column-gap: 20px;
    //row-gap: 10px;
    list-style: none;
    padding-left: 0;

    li {
      a:hover {
        text-decoration: underline;
      }
    }
  }
`

export const RowWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
`
export const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  width: 60%;
`

export const GeneralNotif = styled(List)`
  font-family: 'Roboto';
  position: relative;
  padding: 0 !important;
  background-color: #fff;
  border-radius: 6px;
  padding: 1rem;
  width: 40%;
  border: none;
  .ant-list-header {
    color: #2c65ac;
    font-weight: 700;
    font-size: 14px;
    line-height: 22px;
    padding: 12px 15px;
  }
  .ant-list-item {
    padding: 6px 15px;
    color: #000000;
    font-style: italic;
    font-weight: 400;
    line-height: 22px;
    min-height: 55px;
    vertical-align: middle;
    cursor: pointer;
    transition: all linear 0.25s;
    &:hover {
      opacity: 0.7;
    }
  }
  .ant-list-item:nth-child(odd) {
    background-color: #d6dfef;
  }
`

export const ChartWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
`
export const ChartItem = styled.div`
  position: relative;
  width: 32%;
  margin-right: 2%;
  margin-bottom: 2%;

  &:last-child {
    margin-right: 0;
  }
`

export const Title = styled.span`
  font-weight: bold;
  padding-left: 10px;
  display: inline-block;
  width: 120px;
`
export const Description = styled.span`
  display: inline-block;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  overflow: hidden;
  text-overflow: ellipsis;
  width: 25vw;
  @media (min-width: 1440px) {
    width: 50vw;
  }
`

export const StatisticList = styled(List)`
  li.ant-list-item {
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    a {
      color: rgba(0, 0, 0, 0.85);
    }
    a:hover {
      color: #2c65ac;
    }
  }
`

export const DescriptionLink = styled.li`
  display: inline-flex;
  align-items: center;

  a {
    margin-left: 5px;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
`

export const ColumnItem = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`
export const DayTab = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .weekday {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
  }
  .monthday {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
  }
`
export const WorkScheduledItem = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-size: 14px;
  line-height: 22px;
  padding: 12px 20px !important;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  & > div {
    width: calc(50% - 8px);
  }
  &:nth-child(odd) {
    background-color: #f2f3f8;
  }
  /* .ant-card-body {
    padding: 12px 20px !important;
  } */
  div.work-scheduled-item__info {
    padding-top: 8px;
    padding-bottom: 8px;
  }
`

export const WorkScheduledCard = styled(Card)`
  font-family: Roboto;
  margin-top: 24px;
  border-radius: 6px;
  padding: 16px;
  .ant-card-head {
    padding: 0;
  }
  .ant-card-head-title {
    padding: 0;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
  }
  .ant-card-body {
    padding: 0px;
  }
  .ant-card-extra {
    padding-top: 11px;
    padding-bottom: 11px;
    max-height: 54px;
  }
  .ant-tabs-nav-list {
    padding-top: 8px;
  }
  .ant-tabs-small > .ant-tabs-nav .ant-tabs-tab {
    padding: 0 4px;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    color: rgba(255, 255, 255, 0.65);
    margin: 0 48px;
  }
  .ant-tabs-nav-wrap {
    background-color: #006699;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: white;
    font-weight: 700;
    text-shadow: 0 0 0.25px currentColor;
  }
  .ant-tabs-ink-bar.ant-tabs-ink-bar-animated {
    background-color: white;
    height: 3px;
    margin: 0 0px 2px;
  }
  .ant-picker {
    width: 210px !important;
    padding: 5px 13px;
  }
  .ant-tabs-top > .ant-tabs-nav {
    margin: 0;
  }
`
