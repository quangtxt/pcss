import { Card, Col, List } from "antd";
import styled, { css } from "styled-components";

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
