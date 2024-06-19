import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  transition: all 0.25s linear;
  ${props =>
    props.background &&
    css`
      background-color: {props.background};
    `};
  ${props =>
    !props.background &&
    css`
      background: #ffffff;
    `};
  ${props =>
    props.shadow &&
    css`
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    `};
  ${props =>
    props.isSelectGroup &&
    css`
      background-color: #cddaf4;
      color: #1d5199;
      box-shadow: none;
    `};
  ${props =>
    props.hover &&
    !props.isSelectGroup &&
    css`
      &:hover {
        background-color: #cddaf4;
        color: #1d5199;
        box-shadow: none;
      }
    `};

  padding: 2rem;
  width: 100%;
  border-radius: 6px;
`
