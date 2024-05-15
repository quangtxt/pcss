import React from 'react'
import { Spinner, SpinnerWrapper } from './LoadingSpinnerStyled'
import { inject, observer } from 'mobx-react'

const LoadingSpinner = ({ loadingAnimationStore, commonStore }) => {
  const animation = () => {
    return (
      <style>
        {`
        @keyframes loading-spinner {
          0% { transform : translate(-50%, -50%) rotate(0); }
          100% { transform : translate(-50%, -50%) rotate(360deg); }
        }
        `}
      </style>
    )
  }

  return (
    <SpinnerWrapper visible={loadingAnimationStore.isVisible}>
      <Spinner theme={commonStore.appTheme} />
      {animation()}
    </SpinnerWrapper>
  )
}

export default inject(
  'loadingAnimationStore',
  'commonStore'
)(observer(LoadingSpinner))
