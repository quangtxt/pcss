import React from 'react'
import { LinkOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import { useHistory } from 'react-router-dom'
import { EmptyText } from '../CellText'
import {
  TaskedContent,
  TaskedItem,
  TaskedLink,
  TaskedWrapper,
} from './LinkedStyled'

const LinkedTask = props => {
  const history = useHistory()
  const { linkedTaskList } = props

  return (
    <TaskedWrapper>
      {linkedTaskList && linkedTaskList.length > 0 ? (
        linkedTaskList.map(task => (
          <TaskedItem key={task.task_code}>
            <TaskedLink
              onClick={() =>
                window.open(`/mission/view/${task.task_code}`, '_blank')
              }>
              <LinkOutlined style={{ fontSize: '14px', marginRight: '10px' }} />
              <TaskedContent>
                <b>{`Chủ trì: ${task.name_user}`}</b>
                <span>
                  <Tag
                    style={{ fontSize: 10, lineHeight: '12px' }}
                    color={
                      task.phan_tram_hoan_thanh === '100'
                        ? 'success'
                        : task.phan_tram_hoan_thanh === '0' ||
                          task.phan_tram_hoan_thanh === null
                        ? 'warning'
                        : 'processing'
                    }>
                    {!task.phan_tram_hoan_thanh
                      ? '0'
                      : task.phan_tram_hoan_thanh}{' '}
                    %
                  </Tag>
                  <span>
                    {task.phan_tram_hoan_thanh === '100'
                      ? 'Đã hoàn thành'
                      : task.phan_tram_hoan_thanh === '0' ||
                        task.phan_tram_hoan_thanh === null
                      ? 'Chưa thực hiện'
                      : 'Đang thực hiện'}
                  </span>
                </span>
              </TaskedContent>
            </TaskedLink>
          </TaskedItem>
        ))
      ) : (
        <EmptyText>Không có.</EmptyText>
      )}
    </TaskedWrapper>
  )
}

LinkedTask.propTypes = {}

export default LinkedTask
