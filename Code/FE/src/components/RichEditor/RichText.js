import React from 'react'
import { DisplayContent } from './RichTextStyled'

const RichText = props => {
  return (
    <DisplayContent dangerouslySetInnerHTML={{ __html: `${props.htmlText}` }} />
  )
}

export default RichText
