import styled from 'styled-components'
import PropTypes from 'prop-types'

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
`

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
    url(${props => props.bgImage});
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
  `

export const Profile = styled.div`
.btnEdit, .btnCancel, .btnAdd, .btnImport, .btnDownload, .btnUpload {
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  padding: 0 20px;
  height: 40px;
}
.btnAdd {
  border: 1px solid #3a5a7d;
  background-color: #3a5a7d;
}
.btnAdd:hover {
  background-color: unset;
  color: #3a5a7d;
}
.btnImport {
  border: 1px solid #1D6F42;
  background-color: #1D6F42;
}
.btnImport:hover {
  background-color: unset;
  color: #1D6F42;
}
.btnEdit {
  border: 1px solid #3a5a7d;
  background-color: #3a5a7d;
}
.btnEdit:hover {
  background-color: unset;
  color: #3a5a7d;
}
.btnCancel {
  border: 1px solid rgba(204, 204, 204, 0.6);
  background-color: rgba(204, 204, 204, 0.6);
  color: #000;
}
.btnCancel:hover {
  border: 1px solid rgb(204, 204, 204);
  background-color: rgb(204, 204, 204);
  color: #000;
}
.btnUpload {
  border: 1px solid rgb(204, 204, 204, 0.6);
  background-color: #fff;
  color: #000;
}
..btnUpload:hover {  
  background-color: rgb(204, 204, 204, 0.6);
  color: #000;
}
.btnDownload {
  border: 1px solid #f0062e;
  background-color: #f0062e;
}
.btnDownload:hover {
  border: 1px solid #f0062e;
  background-color: #f0062e;
}
.grBtn {
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 24px;
  display: flex;
}
.inputForm {
  .ant-form-item-label > label {
    text-align: left;
    width: 100%;
    font-weight: 500;
    font-size: 16px;
  }
  .ant-form-item-label > label::before, .ant-form-item-label > label::after {
      display: none !important;
  }
  .ant-row {
    display: grid;
    grid-template-columns: 30% 70%;
    .ant-col {
      max-width: 100% !important;
    }
  }
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
.formProfile {
  max-width: 100% ;
  display: grid;
  grid-template-columns: 50% 50%;
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
        .btnEdit.active {
          display: none;
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
  
      .radioForm.active {
        .ant-row {
          .ant-col {
            .ant-radio-group {
              pointer-events: all;
            }
          }
        }
      }
    }
  } 
  .grBtn {
    display: none;
  }
  .grBtn.active {
    display: flex;
  }
  .ant-row {
    display: grid;
    grid-template-columns: 30% 70%;
    .ant-col {
      max-width: 100% !important;
    }
  }
  .inputForm.active {
    input {
      border: 1px solid #d9d9d9;
      pointer-events: all;
    }
    textarea {
      border: 1px solid #d9d9d9;
      pointer-events: all;
    }
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
  .inputForm.important {
    .ant-form-item-label > label::after {
      display: inline-block !important;
      margin-right: 4px;
      color: #ff4d4f;
      font-size: 16px;
      line-height: 1;
      content: '*';
    }
  }
}
.formProfile::before {
  content: "";
  position: absolute;
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1px;
  height: calc(100% - 50px);
  background: rgba(204, 204, 204, 0.8);
}
.changeEmail {
  display: block;
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
      display: block;
      .ant-col {
        width: 100%;
        max-width: 100%;
        input, textarea {
          font-size: 16px;
          border: 1px solid #d9d9d9;
          pointer-events: all;
        }
        input::placeholder {
          font-size: 16px;
        }
      }
    }
  }
}
.changeEmail.active {
  display: block;
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
.overlay.active {
  display: block;
}

.detailProfileSupervisor {
  display: flex;
  align-items: flex-start;
  gap: 30px;
  .left, .right {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px 30px;
  }
  .left {
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    p {
      font-size: 20px;
      font-weight: 600;
    }
  }
  .right {
    width: 75%;
    .inputForm {
      padding: 20px 0;
      border-bottom: 1px solid rgba(204, 204, 204, 0.8);
      .ant-row {
        grid-template-columns: 20% 80%;
        margin-bottom: 0 !important;   
      }
    }
    .inputForm:first-child {
      padding-top: 0;
    }
    .inputForm:last-child {
      padding-bottom: 0;
    }
  }
}
`

export const GroupButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`
export const BoldContent = styled.div`
  font-size: 16px;
  font-weight: 600;
  text-align: center;
`
