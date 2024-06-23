import { Modal } from 'antd'
import styled from 'styled-components'
import { blue } from '../../../color'

export const ModalWrapper = styled(Modal)`
  .ant-modal-body {
    min-height: 500px;
  }
`
export const TitleModal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title-modal {
    font-size: 14px;
    font-weight: 500;
    color: ${blue};
  }
`
