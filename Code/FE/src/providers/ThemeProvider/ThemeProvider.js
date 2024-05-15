import React, { memo } from 'react'
import { inject, observer } from 'mobx-react'
import { GlobalStyle } from './ThemeProviderStyled'

const ThemeProvider = ({ commonStore, children }) => {
  return (
    <>
      <GlobalStyle theme={commonStore.appTheme} />
      {children}
    </>
  )
}

export default memo(inject('commonStore')(observer(ThemeProvider)))
