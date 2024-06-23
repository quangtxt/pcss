import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../../routes";

const SimpleBreadCrumb = (props) => {
  const { location } = props;
  const pathSnippets =
    location !== undefined ? location.pathname.split("/").filter((i) => i) : [];

  const breadcrumbItems = [
    {
      title: <Link to="/">Home</Link>,
    },
    ...pathSnippets.reduce((items, _, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      const route = routes.find((r) => r.path === url);
      if (route) {
        items.push({
          title: <Link to={route.path}>{route.name}</Link>,
        });
      }

      return items;
    }, []),
  ];

  return <Breadcrumb items={breadcrumbItems} />;
};

export default SimpleBreadCrumb;
