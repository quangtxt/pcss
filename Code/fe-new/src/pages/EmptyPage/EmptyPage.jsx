import React from "react";
import { MainEmpty, EmptyTop, EmptyBottom } from "./EmptyPageStyled";
import ToastCry from "../../assets/photos/toadscry.png";
const EmptyPage = (props) => {
  const { title, content } = props;

  return (
    <MainEmpty>
      <EmptyTop>
        <img src={ToastCry} alt="logo" />
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
