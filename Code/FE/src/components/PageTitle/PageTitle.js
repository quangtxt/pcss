import React from 'react'
import PropTypes from 'prop-types'
import { BackButton, TitleWrapper, Wrapper } from './PageTitleStyled'
import { Tooltip } from 'antd'
import SimpleBreadCrumb from '../SimpleBreadCrumb/SimpleBreadCrumb'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

const PageTitle = props => {
  const {
    title,
    marginBottom,
    marginTop,
    children,
    location,
    showTitle,
    status,
    routerGoBack,
    hiddenGoBack,
    customBreadcrumb,
  } = props

  let history = useHistory()

  const renderTitle = string => {
    if (string) {
      if (string.length <= 90) return string
      return (
        <Tooltip title={string}>
          {string.substring(0, 90).concat('...')}
        </Tooltip>
      )
    }
  }

  return (
    <>
      <Wrapper marginBottom={marginBottom} marginTop={marginTop}>
        {customBreadcrumb ? (
          customBreadcrumb
        ) : (
          <SimpleBreadCrumb location={location} />
        )}
        {children}
      </Wrapper>
      {showTitle && (
        <TitleWrapper>
          {!hiddenGoBack && (
            <BackButton
              onClick={() =>
                routerGoBack ? history.push(routerGoBack) : history.goBack()
              }>
              <ArrowLeftOutlined />
            </BackButton>
          )}
          {renderTitle(title)}
          <span style={{ marginLeft: 8, display: 'flex' }}>{status}</span>
        </TitleWrapper>
      )}
    </>
  )
}

PageTitle.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  marginBottom: PropTypes.number,
  marginTop: PropTypes.number,
  color: PropTypes.string,
  customBreadcrumb: PropTypes.func,
}

export default PageTitle
