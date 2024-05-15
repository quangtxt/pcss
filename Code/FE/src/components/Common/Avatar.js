import React from 'react'
import { Avatar } from 'antd'
import { blue } from '../../color'
import { subStringAvatar } from './CellText'
import utils from '../../utils'
import { apiUrl } from '../../config'

export const AvatarHasName = props => {
  const { imgId, name, justifyContent, position, icon, size } = props

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: justifyContent || 'flex-start',
        alignItems: 'center',
      }}>
      <Avatar
        size={size || 28}
        style={{ backgroundColor: blue, fontSize: 12 }}
        src={imgId && `${apiUrl}/api/v1/images/${imgId}`}>
        {icon ? icon : subStringAvatar(name)}
      </Avatar>
      <div
        style={{
          fontWeight: 600,
          marginLeft: 5,
          display: 'flex',
          flexDirection: 'row',
        }}>
        <span>{utils.getNameInCapitalize(name)}</span>
        {position && (
          <i style={{ fontWeight: 400, marginLeft: 4 }}>({position})</i>
        )}
      </div>
    </div>
  )
}
