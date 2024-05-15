import styled from 'styled-components'

export const UploadFileListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  transition: all ease 0.3s;
  padding: 3px 0;
  border-bottom: 1px solid #ebebeb;

  &:hover {
    background-color: #ebebeb;
    transition: all ease 0.3s;
    text-decoration: none !important;

    .anticon-check,
    .anticon-delete {
      opacity: 1;
      visibility: visible;
      transition: all ease 0.3s;
    }
  }

  .anticon {
    color: #8c8c8c;

    &:not(.anticon-paper-clip) {
      margin-left: 5px;
    }

    &.anticon-delete {
      margin-right: 5px;
    }

    &:hover {
      &.anticon-check {
        color: ${props => props.theme.solidColor};
      }

      &.anticon-delete {
        color: red;
      }
    }
  }

  .anticon-check,
  .anticon-delete {
    visibility: hidden;
    opacity: 0;
    transition: all ease 0.3s;

    &:hover {
      cursor: pointer;
    }
  }
`
