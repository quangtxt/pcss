import React, { Fragment } from "react";
import { Helmet } from "react-helmet/es/Helmet";
import { Wrapper } from "./NotFoundPageStyled";
import { Button, Result } from "antd";
import { useHistory } from "react-router-dom";

const NotFoundPage = (props) => {
  const history = useHistory();

  return (
    <Wrapper>
      <Helmet>
        <title>404 | Pcms Portal</title>
      </Helmet>
      <Result
        status="404"
        title="404"
        subTitle="Trang bạn tìm kiếm không tồn tại."
        extra={
          <Fragment>
            <Button onClick={() => history.goBack()}>Back</Button>
            <Button type={"primary"} onClick={() => history.push("/")}>
              Home
            </Button>
          </Fragment>
        }
      />
    </Wrapper>
  );
};

export default NotFoundPage;
