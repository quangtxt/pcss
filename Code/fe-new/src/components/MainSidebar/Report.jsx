import React, { useState } from 'react'
import { notification, Tooltip } from 'antd'
import { ExclamationCircleOutlined, WarningOutlined } from '@ant-design/icons'
import ReportIncidentModal from '../ReportIncidentModal'
import { blue } from '../../color'
import { inject, observer } from 'mobx-react'

const Report = props => {
  const { loadingAnimationStore } = props
  const [isModalReportVisible, setIsModalReportVisible] = useState(false)

  const openNotification = () => {
    notification.open({
      message: (
        <h3 style={{ marginBottom: 0 }}>
          Hãy chọn màn hình bạn muốn report và ấn nút "share"!
        </h3>
      ),
      placement: 'topLeft',
      style: {
        width: 600,
      },
      duration: 2,
      icon: <WarningOutlined style={{ color: blue }} />,
    })
  }

  const getDisplayMedia = options => {
    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      return navigator.mediaDevices.getDisplayMedia(options)
    }
    if (navigator.getDisplayMedia) {
      return navigator.getDisplayMedia(options)
    }
    // support Chrome và Safari
    if (navigator.webkitGetDisplayMedia) {
      return navigator.webkitGetDisplayMedia(options)
    }
    // support Firefox
    if (navigator.mozGetDisplayMedia) {
      return navigator.mozGetDisplayMedia(options)
    }
    throw new Error('getDisplayMedia is not defined')
  }

  const takeScreenshotStream = async () => {
    const width = screen.width * (window.devicePixelRatio || 1)
    const height = screen.height * (window.devicePixelRatio || 1)

    const errors = []
    let stream
    const mediaStreamConstraints = {
      audio: false,
      video: {
        width,
        height,
        frameRate: 1,
      },
    }
    try {
      stream = await getDisplayMedia(mediaStreamConstraints)
    } catch (ex) {
      errors.push(ex)
    }
    if (errors.length) {
      console.debug(...errors)
      if (!stream) {
        throw errors[errors.length - 1]
      }
    }
    return stream
  }

  const takeScreenshotCanvas = async () => {
    const stream = await takeScreenshotStream()
    const video = document.createElement('video')
    const result = await new Promise((resolve, reject) => {
      video.onloadedmetadata = () => {
        video.play()
        video.pause()
        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const context = canvas.getContext('2d')
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
        resolve(canvas)
      }
      video.srcObject = stream
    })
    stream.getTracks().forEach(function (track) {
      track.stop()
    })
    if (result == null) {
      throw new Error('Cannot take canvas screenshot')
    }

    return result
  }

  const [base64Image, setBase64Image] = useState()

  const handleGetImage = async () => {
    const canvas = await takeScreenshotCanvas()
    const img = document.createElement('img')
    img.setAttribute('src', canvas.toDataURL())
    img.setAttribute('style', 'width: 100%;')
    document.getElementById('screenshot-preview').appendChild(img)
    setBase64Image(canvas.toDataURL('image/png'))
  }

  const handleCancelReport = () => {
    setIsModalReportVisible(false)
    setBase64Image(null)
    document.getElementById('screenshot-preview').innerHTML = ''
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Tooltip placement="left" title="Phản ánh sự cố">
        <div
          style={{
            display: 'flex',
            gap: '5px',
          }}>
          <ExclamationCircleOutlined
            style={{
              fontSize: 18,
              cursor: 'pointer',
              color: '#fff',
            }}
            onClick={async () => {
              openNotification('topLeft')
              await handleGetImage()
              setIsModalReportVisible(true)
            }}
          />
        </div>
      </Tooltip>
      <ReportIncidentModal
        base64Image={base64Image}
        isModalReportVisible={isModalReportVisible}
        handleCancel={handleCancelReport}
      />
    </div>
  )
}

Report.propTypes = {}

export default inject('loadingAnimationStore')(observer(Report))
