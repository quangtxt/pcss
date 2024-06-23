import React from "react";
import { Spinner, SpinnerWrapper } from "./LoadingSpinnerStyled";
import { useObserver } from "mobx-react-lite";
import loadingAnimationStore from "../../stores/loadingAnimationStore";
import commonStore from "../../stores/commonStore";

const LoadingSpinner = () => {
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
    );
  };

  return useObserver(() => (
    <SpinnerWrapper visible={loadingAnimationStore.isVisible.toString()}>
      <Spinner theme={commonStore.appTheme} />
      {animation()}
    </SpinnerWrapper>
  ));
};

export default LoadingSpinner;
