import styled from "styled-components";
import PropTypes from "prop-types";

export const ForContent = styled.div`
  height: 100%;
  .main {
    height: 100%;
    flex-basis: 120%;
    display: flex;
    flex-direction: column;
    background-color: rgba(116, 112, 233, 0.05);
    box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
      rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
    overflow: hidden;
    overflow-x: auto;
  }
  .requestMain {
    height: 100%;
    margin-left: 0;
    margin-right: 0;
    border-radius: 0;
    background-color: #ffffff;
    align-items: center;
    flex-wrap: wrap;
    padding: 20px;
    margin-bottom: 24px;
  }
  .formSearch {
    margin-left: 6%;
    display: grid;
    margin-top: 20px;
    grid-template-columns: 2fr 1fr;
  }
  .gridColumn {
    display: flex;
    margin-bottom: 10px;
    padding-right: -9%;
    width: 145%;
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
