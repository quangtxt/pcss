import styled, { css } from "styled-components";
import { Avatar } from "antd";
import { blue } from "../../color";

export const ListItemWrapper = styled.div`
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  width: 100%;
  background-color: ${(props) => !props.isRead && "#e7efff"};
  margin: -12px 0;
  padding: 12px 10px 12px 12px;

  .notification-content * {
    font-size: 12px;
  }
`;
export const ListItemLeft = styled.div`
  display: flex;
  margin-right: 10px;
`;
export const ListItemRight = styled.div``;

export const ContentNotification = styled.span`
  ${(props) =>
    !props.isRead
      ? css`
          font-weight: bold;
        `
      : css`
          font-weight: unset;
        `}
  span {
    overflow: hidden;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    word-wrap: break-word;
  }
`;

export const ContentLoading = styled.div`
  margin: 20px 0;
  padding: 30px 50px;
  text-align: center;
  border-radius: 4px;
`;

export const ListWrapper = styled.div`
  .ant-list-item {
    cursor: pointer;
    padding: 12px 0;
    transition: 0.3s;

    &:hover {
      background-color: #f7f7f7;
    }
  }
`;
