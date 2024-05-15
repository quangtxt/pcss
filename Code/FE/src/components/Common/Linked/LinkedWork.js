import React from 'react'
import { LinkOutlined } from '@ant-design/icons'
import { LinkedWorkWrapper } from './LinkedStyled'
import { EmptyText, WordBreak } from '../CellText'
import { useHistory } from 'react-router-dom'
import { Tooltip } from 'antd'

const LinkedWork = props => {
  const history = useHistory()
  const { linkedWorkList, emptyText, style } = props

  const renderTitle = string => {
    if (string) {
      if (string.length <= 100) return string
      return (
        <Tooltip title={string}>
          {string.substring(0, 100).concat('...')}
        </Tooltip>
      )
    }
  }
  return (
    <LinkedWorkWrapper>
      {linkedWorkList && linkedWorkList?.length > 0 ? (
        linkedWorkList.map(link => (
          <div key={link.code} style={style}>
            <a
              className={'linked'}
              onClick={() => window.open(`/works/view/${link.code}`, '_blank')}>
              <LinkOutlined style={{ fontSize: '14px', marginRight: '10px' }} />
              {WordBreak(renderTitle(link.title))}
            </a>
          </div>
        ))
      ) : (
        <EmptyText>{emptyText || 'Không có.'}</EmptyText>
      )}
    </LinkedWorkWrapper>
  )
}

export default LinkedWork
