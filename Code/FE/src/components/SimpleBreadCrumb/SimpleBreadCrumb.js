import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import HomeOutlined from "@ant-design/icons/lib/icons/HomeOutlined";
import { routes } from "../../routes";

const SimpleBreadCrumb = (props) => {
  const { location } = props;

  const pathSnippets =
    location !== undefined ? location.pathname.split("/").filter((i) => i) : [];
  const extraBreadcrumbItems = pathSnippets
    .map((_, index) => {
      return `/${pathSnippets.slice(0, index + 1).join("/")}`;
    })
    .map((url) => routes.find((route) => route.path === url))
    .filter((route) => route)
    .map((route) => (
      <Breadcrumb.Item key={route.path}>
        <Link to={route.path}>{route.name}</Link>
      </Breadcrumb.Item>
    ));

  const breadcrumbItems = [
    <Breadcrumb.Item key="home" href="/home">
      <HomeOutlined />
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return <Breadcrumb>{breadcrumbItems}</Breadcrumb>;
};

export default SimpleBreadCrumb;
