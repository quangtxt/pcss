import { Button, Modal, Space } from 'antd'
import React from 'react'
import { ModalWrapper, TitleModal } from './MainModalStyled'

const MainModal = ({
  title,
  handleCancel,
  handleSubmit,
  okText = 'Đồng ý',
  isVisible,
  closeText = 'Hủy bỏ',
  footer = false,
  children,
}) => {
  return (
    <ModalWrapper
      style={{ top: 40 }}
      closable={false}
      width={800}
      title={
        <TitleModal>
          <span className={'title-modal'}>{title}</span>
          <Space>
            <Button danger onClick={handleCancel}>
              {closeText}
            </Button>
            <Button type={'primary'} htmlType={'submit'} onClick={handleSubmit}>
              {okText}
            </Button>
          </Space>
        </TitleModal>
      }
      visible={isVisible}
      footer={footer}>
      {children}
    </ModalWrapper>
  )
}

export default MainModal
