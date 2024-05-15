import styled from 'styled-components'

export const AuthPageWrapper = styled.div`
  background: ${props => props.bg};
  min-height: 100vh;
  padding: 60px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  &:after {
    display: block;
    content: '';
    width: 100%;
    height: 100%;
    background: url(${props => props.bgImage}) no-repeat center center;
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    color: transparent;
    opacity: 0.4;
  }
`
export const FormWrapper = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  min-width: 640px;
  position: relative;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 40px 70px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  margin-bottom: 25px;
`
export const LogoWrapper = styled.div`
  display: block;
  text-align: center;
  img {
    height: 100px;
  }
`
