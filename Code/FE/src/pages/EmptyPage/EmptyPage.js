import React, { Fragment } from "react";
import { Helmet } from "react-helmet/es/Helmet";
import { MainEmpty, EmptyTop, EmptyBottom } from "./EmptyPageStyled";
import { Button, Result } from "antd";
import { useHistory } from "react-router-dom";

const EmptyPage = (props) => {
  const { title, content } = props;

  return (
    <MainEmpty>
      <EmptyTop>
        <img
          src={`${process.env.PUBLIC_URL}/assets/photos/toadscry.png`}
          alt="logo"
        />
      </EmptyTop>
      <EmptyBottom>
        {" "}
        <p>{title}</p>
        <p>{content}</p>
      </EmptyBottom>
    </MainEmpty>
  );
};

export default EmptyPage;
