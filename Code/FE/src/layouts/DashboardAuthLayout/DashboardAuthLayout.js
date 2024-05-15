import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  ContentWrapper,
  LayoutWrapper,
  MainWrapper,
  SmallSidebarWrapper,
} from '../DashboardLayout/DashboardLayoutStyled'
import MainHeaderBar from '../../components/MainHeaderBar'
import { inject, observer } from 'mobx-react'
import MainFooter from '../../components/MainFooter'

const DashboardAuthLayout = props => {
  const { children, title, showFooter } = props

  return (
    <Fragment>
      <SmallSidebarWrapper left={0}>
        <MainHeaderBar title={title} />
      </SmallSidebarWrapper>
      <MainWrapper>
        <LayoutWrapper>
          <ContentWrapper style={{ width: '100%' }}>{children}</ContentWrapper>
        </LayoutWrapper>
      </MainWrapper>
      {showFooter && <MainFooter />}
    </Fragment>
  )
}

DashboardAuthLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
}

export default inject('commonStore')(observer(DashboardAuthLayout))
