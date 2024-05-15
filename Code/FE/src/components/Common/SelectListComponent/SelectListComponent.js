import { BankOutlined, TeamOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import React from 'react'
import { ASSIGNEE_TYPE } from '../../../constants'
import selectPeopleStore from '../../../stores/selectPeopleStore'
import { AvatarHasName } from '../Avatar'
import { SelectList } from './SelectListComponentStyled'

const SelectListComponent = ({ userList, style = {}, status = '' }) => {
  return (
    <SelectList style={{ marginBottom: 8, ...style }}>
      {userList?.map(el => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Tag
            className={'tag-selected'}
            color={'blue'}
            key={el.id}
            closable
            onClose={() => selectPeopleStore.handleRemoveSelect(el)}>
            <AvatarHasName
              imgId={el.image_id}
              size={22}
              name={el.full_name}
              icon={
                (el.assignee_type === ASSIGNEE_TYPE.DEPARTMENT && (
                  <BankOutlined />
                )) ||
                (el.assignee_type === ASSIGNEE_TYPE.GROUP && <TeamOutlined />)
              }
            />
          </Tag>
        </div>
      ))}
    </SelectList>
  )
}

export default SelectListComponent
