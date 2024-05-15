import { Mention, MentionsInput } from 'react-mentions'
import classNames from '../../components/MentionTextInput/MentionTextInput.module.css'
import React, { memo } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

const MentionTextInput = props => {
  const { userStore } = props

  const { mentionUserList } = userStore

  function renderSuggestion(entry, search, highlightedDisplay, index, focused) {
    return (
      <div className={`user ${focused ? 'focused' : ''}`}>
        {highlightedDisplay}
      </div>
    )
  }

  return (
    <MentionsInput
      onChange={props.onChange}
      className={`mentions ${props.readonly && `readonly`}`}
      classNames={classNames}
      value={props.value}
      placeholder={props.placeHolder}
      allowSpaceInQuery={true}
      a11ySuggestionsListLabel={'Suggested mentions'}
      spellCheck={false}>
      <Mention
        markup="@[__display__](user:__id__)"
        trigger="@"
        data={mentionUserList}
        renderSuggestion={renderSuggestion}
        className={classNames.mentions__mention}
      />
    </MentionsInput>
  )
}

export default memo(withRouter(inject('userStore')(observer(MentionTextInput))))
