import styled from "styled-components";

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

export const InviteInput = styled.input`
  width: calc(100% - 100px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

export const InviteButton = styled.button`
  padding: 10px 20px;
  color: #fff;
  background-color: #6f37ef;
  border: none;
  border-radius: 5px;
  cursor: pointer;
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
