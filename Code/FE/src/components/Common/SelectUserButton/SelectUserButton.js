import { UserOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import React from 'react'
import { blue } from '../../../color'

const SelectUserButton = ({ handleOnClick, title="Chọn người:", tooltipTitle="Chọn người vote" ,style={}}) => {
  return (
    <div
      style={{
        marginBottom: 8,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...style
      }}>
      <span>{title}</span>
      <Space>
        <Tooltip title={tooltipTitle} color={blue}>
          <Button
            icon={<UserOutlined style={{ color: blue }} />}
            onClick={handleOnClick}
          />
        </Tooltip>
      </Space>
    </div>
  )
}

export default SelectUserButton
