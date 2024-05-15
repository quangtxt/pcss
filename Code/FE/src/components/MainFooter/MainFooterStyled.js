import styled from 'styled-components'

export const FooterWrapper = styled.footer`
  padding: 10px 20px;
  text-align: center;
  font-size: 13px;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  font-weight: 600;
  color: #ffffff;
  background: #004e9f url(${props => props.imgUrl}) left bottom no-repeat;
`

export const FooterContainer = styled.div`
  max-width: 1140px;
  margin: 10px auto;
`
export const FooterContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  a {
    color: #fff;
    text-decoration: underline;
  }
`
