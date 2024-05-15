import styled from 'styled-components'

export const SpinnerWrapper = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.8);
`
export const Spinner = styled.div`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  border: 6px solid rgb(233, 234, 235);
  border-bottom-color: ${props => props.theme.solidColor};
  border-top-color: ${props => props.theme.solidColor};
  animation: loading-spinner 0.5s infinite linear;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
