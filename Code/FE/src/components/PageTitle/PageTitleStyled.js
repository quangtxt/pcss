import styled from 'styled-components'
import { blue } from '../../color'

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-weight: 400;
  margin-bottom: 0.5rem;

  .ant-breadcrumb > span:last-child {
    font-weight: 500;
  }
`
export const TitleWrapper = styled.h1`
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  word-break: break-all;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`

export const BreadCrumbWrapper = styled.div`
  margin-bottom: 20px;
`

export const BackButton = styled.span`
  transform: translateX(-10px);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  display: flex;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #fff;
    span {
      color: ${blue};
    }
  }
`
