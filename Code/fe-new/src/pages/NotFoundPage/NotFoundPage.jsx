import React, { Fragment } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Wrapper } from "./NotFoundPageStyled";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <title>404 | Logiware</title>
        </Helmet>
        <Result
          status="404"
          title="404"
          subTitle="Trang bạn tìm kiếm không tồn tại."
          extra={
            <Fragment>
              <Button onClick={() => navigate(-1)}>Quay lại trang trước</Button>
              <Button type={"primary"} onClick={() => navigate("/")}>
                Về trang chủ
              </Button>
            </Fragment>
          }
        />
      </Wrapper>
    </HelmetProvider>
  );
};

export default NotFoundPage;
