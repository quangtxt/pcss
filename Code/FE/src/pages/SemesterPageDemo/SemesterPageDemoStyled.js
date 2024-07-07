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

export const ListGroup = styled.div`
  .ant-tabs-nav-wrap {
    // justify-content: center;
  }
`;
export const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const PopupImport = styled.div`
  .formImport {
    max-width: 570px !important;
    width: 100% !important;
  }
  .tbStudent {
    margin-bottom: 20px;
    overflow: auto;
    table {
      width: 800px !important;
    }
  }
`;

export const PhaseTabs = styled.div`
  .ant-tabs-tab-btn,
  .ant-collapse-header {
    font-size: 14px !important;
  }
  h3 {
    margin-bottom: 0 !important;
  }
`;
export const SemesterLayout = styled.div`
  .ant-col-8 {
    // width: calc(100% - 5px);
  }
  .ant-col-16 {
    background-color: #fff;
  }
`;
export const SemesterItem = styled.div`
  .ant-row,
  .ant-col {
    background-color: #fff;
  }
`;
export const LimitLine = styled.div`
  h5 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
