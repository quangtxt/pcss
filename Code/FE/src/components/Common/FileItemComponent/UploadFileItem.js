import React from 'react'
import {
  DeleteOutlined,
  FileExcelOutlined,
  FileImageOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  FileWordOutlined,
  FileZipOutlined,
} from '@ant-design/icons'
import { blue, green, purple9, redPrimary } from '../../../color'
import { UploadFileListItem } from './FileItemComponentStyled'
import { Tooltip } from 'antd'
import fileStore from '../../../stores/fileStore'

const UploadFileItem = props => {
  const {
    file_id,
    file_name,
    file_type,
    handleRemoveFileFromUploadList,
    isDownloadFile,
  } = props

  let iconFile = <FileTextOutlined />
  if (file_type === 'pdf') {
    iconFile = <FilePdfOutlined style={{ color: redPrimary }} />
  }
  if (file_type === 'doc' || file_type === 'docx') {
    iconFile = <FileWordOutlined style={{ color: blue }} />
  }
  if (
    [
      'jpg',
      'bmp',
      'dib',
      'jpe',
      'jfif',
      'gif',
      'tif',
      'tiff',
      'png',
      'heic',
    ].includes(file_type)
  ) {
    iconFile = <FileImageOutlined style={{ color: purple9 }} />
  }
  if (file_type === 'rar' || file_type === 'zip') {
    iconFile = <FileZipOutlined style={{ color: '#e67e22' }} />
  }
  if (file_type === 'xlsx') {
    iconFile = <FileExcelOutlined style={{ color: green }} />
  }

  return (
    <UploadFileListItem>
      <div
        style={isDownloadFile && { cursor: 'pointer' }}
        onClick={() =>
          isDownloadFile && fileStore.handleDownloadFile(file_id, file_name)
        }>
        {iconFile}
        <span style={{ marginLeft: 4 }}>{file_name}</span>
      </div>
      <Tooltip title={'Xoá tập tin'}>
        <DeleteOutlined onClick={handleRemoveFileFromUploadList} />
      </Tooltip>
    </UploadFileListItem>
  )
}

UploadFileItem.propTypes = {}

export default UploadFileItem
