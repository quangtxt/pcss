import styled from "styled-components";
import PropTypes from "prop-types";

export const Profile = styled.div`
  .btnEdit {
    border-radius: 8px;
    border: 1px solid #3a5a7d;
    background-color: #3a5a7d;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    padding: 0 20px;
    height: 40px;
  }
  .btnEdit:hover {
    background-color: unset;
    color: #3a5a7d;
  }
  .btnCancel {
    border-radius: 8px;
    border: 1px solid rgba(204, 204, 204, 0.6);
    background-color: rgba(204, 204, 204, 0.6);
    font-size: 14px;
    font-weight: 600;
    padding: 0 20px;
    height: 40px;
    color: #000;
  }
  .btnCancel:hover {
    border: 1px solid rgb(204, 204, 204);
    background-color: rgb(204, 204, 204);
    color: #000;
  }
  .grBtn {
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-top: 24px;
    display: flex;
  }

  .formProfile {
    max-width: 100%;
    padding: 25px;
    border-radius: 10px;
    background: #fff;
    position: relative;
    .ant-space {
      margin-bottom: 1em;
    }
    .bigTitle {
      font-size: 16px;
      font-weight: 600;
      color: #3a5a7d;
    }
    .left {
      padding-right: 15px;
    }
    .btnChange {
      border-radius: 8px;
      border: 1px solid #3a5a7d;
      color: #3a5a7d;
      font-size: 14px;
      padding: 0 10px;
      height: 30px;
      margin-left: 11px;
    }
    .btnChange:hover {
      background-color: #3a5a7d;
      color: #fff;
    }
    .right {
      padding-left: 15px;
      .basicInfor {
        .title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1em;
          .bigTitle {
            margin-bottom: 0 !important;
          }
          .ant-btn > .anticon + span {
            margin-left: 10px;
          }
        }
        .radioForm {
          .ant-row {
            display: flex !important;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 0 !important;
            .ant-col {
              flex: unset;
              label {
                font-size: 16px !important;
                font-weight: 400;
              }
              .ant-radio-group {
                pointer-events: none;
              }
            }
          }
        }
      }
    }

    .grBtn {
      display: none;
    }
    .ant-row {
      display: grid;
      grid-template-columns: 30% 70%;
      .ant-col {
        max-width: 100% !important;
      }
    }
    .inputForm {
      input {
        font-size: 16px;
        font-weight: 400;
        border: none;
        pointer-events: none;
      }
      textarea {
        font-size: 16px;
        font-weight: 400;
        border: none;
        pointer-events: none;
        resize: none;
      }
    }
    .ant-form-item-control-input-content {
    }

    .inputForm.change {
      .ant-form-item-control-input-content {
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }
    .inputForm:last-child {
      .ant-row {
        margin-bottom: 0 !important;
      }
    }
    .ant-form-item-label > label {
      width: 100%;
      font-weight: 500;
      font-size: 16px;
    }

    .ant-form-item-label > label::before,
    .ant-form-item-label > label::after {
      display: none !important;
    }

    .inputForm.important {
      .ant-form-item-label > label::after {
        display: inline-block !important;
        margin-right: 4px;
        color: #ff4d4f;
        font-size: 16px;
        line-height: 1;
        content: "*";
      }
    }
  }

  .changeEmail {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    width: 100%;
    max-width: 570px;
    z-index: 999;
    border-radius: 10px;
    padding: 20px 30px;
    .bigTitle {
      font-size: 20px;
      font-weight: 600;
      text-align: center;
      margin-bottom: 20px;
    }
    .content {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-bottom: 20px;
      p {
        margin-bottom: 0px !important;
        font-size: 16px;
        text-align: center;
        span {
          color: #ff0000;
        }
      }
      a {
        font-size: 16px;
        font-weight: 600;
        color: #3a5a7d;
        text-align: center;
      }
    }
    .verify {
      font-size: 16px;
      font-weight: 600;
    }
    .inputForm {
      .ant-row {
        margin-bottom: 20px !important;
        .ant-col {
          width: 100%;
          max-width: 100%;
          input {
            font-size: 16px;
          }
          input::placeholder {
            font-size: 16px;
          }
        }
      }
    }
  }

  .overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 99;
  }
  .groupInput {
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 50px;
    row-gap: 30px;
    .ant-row {
      grid-template-columns: 20% 80%;
    }
  }
  .textarea-form {
    margin-bottom: 20px;
    .ant-row {
      display: block;
      .ant-form-item-label > label {
        margin-bottom: 20px;
      }
    }
  }
  .ant-form-item {
    margin-bottom: 0 !important;
  }
   {
    font-family: "Montserrat", sans-serif;
  }
`;
