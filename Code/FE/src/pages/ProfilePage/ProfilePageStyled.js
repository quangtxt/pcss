import styled from "styled-components";
import PropTypes from "prop-types";

export const PortalContent = styled.div`
  max-width: 1140px;
  margin: 2rem auto 2rem;
  .ant-card {
    border-radius: 6px;
    transition: all ease-in-out 0.25s;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 24px 32px rgba(0, 0, 0, 0.04),
        0px 16px 24px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04),
        0px 0px 1px rgba(0, 0, 0, 0.04);
    }
    .ant-card-meta-title {
      margin: 4px 0 !important;
    }
  }
`;

export const LoginWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
      to right bottom,
      rgb(170 202 255 / 80%),
      rgb(0 0 0 / 80%)
    ),
    url(${(props) => props.bgImage});
  background-size: cover;
  background-position: top;
  #loginForm {
    padding: 30px;
    width: 370px;
    background: rgba(0, 21, 41, 0.8);
    border-radius: 4px;
  }
  .ant-form-item-label > label,
  .ant-form-item-control h2 {
    color: #ffffff;
    margin: 0;
  }
`;

export const Profile = styled.div`
  .ant-form {
    display: flex;
    align-items: stretch;
    gap: 40px;
    position: relative;
  }
  .ant-form::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    width: 1px;
    background-color: #d9d9d9;
  }
`;

export const ContentInformation = styled.div`
  background-color: white;
  border-radius: 6px;
`;

export const GroupButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

export const BoldContent = styled.div`
  font-size: 14px;
  font-weight: 600;
  text-align: center;
`;

export const MarginLeftLabel = styled.div`
  .ant-col {
    label {
      margin-left: 9px;
    }
  }
`;
export const NoMarginBottom = styled.div`
  .ant-typography,
  .ant-row {
    margin-bottom: 0 !important;
  }
`;

export const GroupBtn = styled.div`
  margin-top: 24px;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const TextForm = styled.div`
  label,
  input,
  textarea {
    font-size: 14px;
  }
`;
export const FontSize14px = styled.div`
  font-size: 14px !important;
  .ant-table {
    font-size: 14px !important;
  }
`;
