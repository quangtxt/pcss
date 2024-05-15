import React, { useState } from 'react'
import { Button, Form, Input, message, Modal } from 'antd'
import { inject, observer } from 'mobx-react'
import { apiUrl, systemName } from '../../config'

const { TextArea } = Input

const ReportIncidentModal = props => {
  const {
    isModalReportVisible,
    handleCancel,
    authenticationStore,
    loadingAnimationStore,
    base64Image,
    commonServiceStore,
  } = props
  const [form] = Form.useForm()
  const [isReporting, setIsReporting] = useState(false)

  const { currentUser } = authenticationStore

  const handleCancelModal = () => {
    form.resetFields()
    handleCancel()
  }

  const onFinish = async value => {
    let env = ''
    if (apiUrl.includes('stg')) {
      env = systemName + ' - stg'
    } else {
      if (apiUrl.includes('uat')) {
        env = systemName + ' - uat'
      } else {
        env = systemName + ' - prod'
      }
    }
    const payload = {
      content: value.report,
      env: env,
      username: currentUser.username,
      accessToken: JSON.parse(localStorage.getItem('jwt'))?.access_token,
      screenshot: base64Image.replace('data:image/png;base64,', ''),
    }
    try {
      setIsReporting(true)
      await commonServiceStore.reportBug(payload)
      handleCancelModal()
      message.success('Báo cáo sự có thành công!')
    } catch (err) {
      console.log(err)
      message.error(err.vi || 'Đã có lỗi xảy ra!')
    } finally {
      setIsReporting(false)
    }
  }

  return (
    <Modal
      zIndex={99999}
      forceRender={true}
      width={1200}
      maskClosable={false}
      title="Báo cáo sự cố"
      visible={isModalReportVisible}
      footer={null}
      onCancel={handleCancelModal}>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name={'report'}>
          <TextArea
            autoSize={{ minRows: 4 }}
            placeholder={'Vui lòng mô tả sự cố bạn gặp phải.'}
          />
        </Form.Item>
        <Button
          type={'primary'}
          loading={isReporting}
          block
          htmlType={'submit'}>
          Gửi phản ánh sự cố
        </Button>
      </Form>
      <div style={{ marginTop: 20 }} id={'screenshot-preview'} />
    </Modal>
  )
}

ReportIncidentModal.propTypes = {}

export default inject(
  'loadingAnimationStore',
  'commonServiceStore',
  'authenticationStore'
)(observer(ReportIncidentModal))
