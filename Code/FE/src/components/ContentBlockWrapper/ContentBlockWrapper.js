import React from 'react'
import { Wrapper } from './ContentBlockWrapperStyled'

const ContentBlockWrapper = props => {
  const { children } = props

  return <Wrapper {...props}>{children}</Wrapper>
}

export default ContentBlockWrapper
