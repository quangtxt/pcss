import { Card, Col, List } from "antd";
import styled, { css } from "styled-components";
export const Container = styled.div`
  .current-milestone {
    background-color: #f1f5f9;
  }
  .custom-table {
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    border-collapse: collapse;
  }

  .custom-table th,
  .custom-table td {
    border-bottom: 1px solid #e8e8e8;
    padding: 16px 24px;
  }

  .custom-table th {
    background-color: #fafafa;
    font-weight: 500;
  }
  .ant-spin-nested-loading {
    background-color: white;
  }

  .ant-table-tbody {
    .ant-table-row {
      cursor: pointer;
    }
  }

  .ant-table-thead > tr > th {
    background-color: #2c65ac;
    color: white;
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
export const FormLogin = styled.div`
  .formLogin {
    content: "";
    background-color: #ffffff;
    border-radius: 40px 5px;
    padding: 10px 10px;
    z-index: 10;
  }
  .formLogin {
    width: 600px;
    max-width: 600px;
    background-color: #ffffff;
    border-radius: 40px 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .formLoginGG {
    content: "";
    background-color: #ffffff;
    border-radius: 40px 5px;
    inset: 5px;
    padding: 10px 10px;
    z-index: 10;
    width: 567px;
    height: 350px;
  }
  .formLoginGG {
    .intro {
      text-align: center;
      padding-bottom: 32px;
    }
    .intro {
      h1 {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 8px;
      }

      p {
        font-size: 16px;
        color: #8c8c8c;
      }
    }

    #textError {
      font-size: 14px;
      color: #ff4d4f;
    }

    .logIn {
      .selectCampus {
        label {
          font-size: 14px;
          font-weight: 500;
          color: #8c8c8c;
          margin-bottom: 4px;
        }

        select {
          width: 100%;
          height: 40px;
          padding: 0 12px;
          font-size: 14px;
          border: 1px solid #d9d9d9;
          border-radius: 4px;
          background-color: #fff;
          color: #333;

          .optionCampus {
            color: #8c8c8c;
          }
        }
      }

      .signIn {
        .signInGG {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 24px;

          button.signGG {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 40px;
            background-color: #fff;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            font-size: 14px;
            color: #333;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
              background-color: #f5f5f5;
            }

            img {
              width: 20px;
              height: 20px;
              margin-right: 8px;
            }

            #signGG {
              font-weight: 500;
            }
          }

          p {
            margin: 16px 0;
            font-size: 14px;
            color: #8c8c8c;
          }

          a#signInForm {
            font-size: 14px;
            color: #1890ff;
            text-decoration: none;
            transition: color 0.3s ease;

            &:hover {
              color: #40a9ff;
            }
          }
        }
      }
    }
  }
`;
