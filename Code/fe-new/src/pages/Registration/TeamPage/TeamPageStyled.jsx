import styled from "styled-components";

export const Team = styled.div`
  .container {
    display: flex;
    flex-direction: row;
  }
  .main {
    height: auto;
    flex-basis: 90%;
    flex-direction: column;
    background-color: rgba(116, 112, 233, 0.05);
    box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset;
    overflow: hidden;
    overflow-x: auto;
    width: 70%;
  }

  .sidebar--right {
    width: 30%;
    background: #ffffff;
    flex-basis: 30%;
    height: auto;
    border: none;
    left: 0;
    overflow-x: hidden;
    top: 0;
    box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset;
  }
  .informGroup {
    background: #ffffff;
    padding: 24px;
    height: -webkit-fill-available;
    box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset;
  }
  .introGroup {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .nameProject {
    display: flex;
    align-items: center;
  }
  .btnAddMem {
    display: flex;
    margin-right: 24px;
    align-items: center;
  }
  .someInforms {
    display: flex;
    width: 80%;
    margin-top: 24px;
    flex-direction: column;
  }
  .someInforms--top,
  .someInforms--bottom {
    display: flex;
    width: 100%;
  }
  .abbreviations,
  .vietnamTitle,
  .professional,
  .specialty {
    flex-basis: 50%;
    line-height: 24px;
  }
  .title {
    font-size: 16px;
    font-weight: 400;
    color: rgba(100, 100, 111, 0.8);
  }
  .content {
    font-size: 16px;
    font-weight: 600;
    font-style: italic;
    margin: 12px 0 12px 20px;
    word-break: break-word;
    display: flex;
  }
  .nameProject img {
    width: 58px;
    height: 58px;
    border-radius: 8px;
    margin-right: 12px;
  }
  .inforGro > p:first-child {
    font-weight: 600;
    font-size: 20px;
  }
  .inforGro {
    display: flex;
    flex-direction: column;
  }
  .keywordText {
    display: flex;
    margin-top: 12px;
  }

  .showMember {
    margin-top: 18px;
  }
  .numMember {
    width: 50%;
    display: flex;
    margin-right: 60px;
    justify-content: space-between;
  }
  .members {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
  .informMember {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    align-items: baseline;
  }
  .info {
    display: flex;
    align-items: center;
    width: 60%;
  }
  .role {
    font-weight: 600;
    font-size: 14px;
    color: rgba(28, 31, 39, 0.5);
  }
  .role p {
    font-size: 16px;
  }
  .menuMember button {
    width: 36px;
    height: 36px;
    cursor: pointer;
    padding: 0 8px;
    border-radius: 8px;
    border: none;
    background-color: rgba(28, 31, 39, 0.1);
    transition: all 1s;
  }
  .fa-solid,
  .fas {
    font-weight: 900;
  }
  .menuMember__dropdown {
    width: 200px;
    position: absolute;
    right: 22%;
    background-color: #ffffff;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    padding: 12px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    visibility: hidden;
    opacity: 0;
    transition: all 0.5s ease-in-out;
  }
  .menuMember__dropdown.active {
    opacity: 1;
    visibility: visible;
  }
  .menuMember__dropdown a {
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    color: #1c1f27;
    padding: 12px;
    width: 100px;
    width: 100%;
    border-radius: 8px;
    transition: all 0.3s;
  }

  .info img {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    margin-right: 12px;
  }
  .memInfo a {
    text-decoration: none;
    color: #1c1f27;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  .memInfo p {
    color: rgba(28, 31, 39, 0.5);
    font-weight: 400;
    font-size: 14px;
  }
  .fa-ellipsis-v:before,
  .fa-ellipsis-vertical:before {
    content: "\f142";
  }
  .centered-button {
    display: flex;
    justify-content: center;
  }
  .numMemberInfor {
    font-size: 15px;
  }
`;
export const InformMember = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: baseline;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
`;

export const UserAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  margin-right: 12px;
  margin-right: 16px;
`;

export const MemberInfo = styled.div``;

export const MemberEmail = styled.a`
  text-decoration: none;
  color: #1c1f27;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const MemberName = styled.p`
  color: rgba(28, 31, 39, 0.5);
  font-weight: 400;
  font-size: 14px;
`;

export const Role = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: rgba(28, 31, 39, 0.5);
  p {
    font-size: 16px;
  }
`;
