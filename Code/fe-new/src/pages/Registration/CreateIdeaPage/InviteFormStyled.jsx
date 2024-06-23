import styled from "styled-components";
import { css } from "styled-components";
import Select from "react-select";

export const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

export const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

export const InviteSection = styled.div`
  margin-top: 20px;
`;

export const Instruction = styled.p`
  font-size: 14px;
  color: #666;
`;

export const InviteContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

export const InviteInput = styled.div`
  flex-grow: 1;
  margin-right: 10px;

  ${Select} {
    width: 100%;
    ${(props) => css`
      .react-select__control {
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 5px 10px;
        font-size: 16px;
        &:hover {
          border-color: #999;
        }
      }
      .react-select__value-container {
        padding: 0;
      }
      .react-select__input {
        font-size: 16px;
      }
      .react-select__menu {
        z-index: 2;
      }
    `}
  }
`;
export const InviteButton = styled.button`
  width: 100px;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
export const UserList = styled.div`
  margin-top: 20px;
`;

export const UserItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  background-color: #ccc;
  border-radius: 50%;
  margin-right: 10px;
`;

export const UserEmail = styled.span`
  font-size: 16px;
`;
