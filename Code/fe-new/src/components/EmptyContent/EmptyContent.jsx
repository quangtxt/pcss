import React from 'react'
import PropTypes from 'prop-types'
import { Empty } from 'antd'

const EmptyContent = props => {
  const { description, minHeight } = props

  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={description || 'Không có dữ liệu'}
      style={{ minHeight: minHeight ? minHeight : 'auto' }}
    />
  )
}

EmptyContent.propTypes = {
  description: PropTypes.string,
}

export default EmptyContent
