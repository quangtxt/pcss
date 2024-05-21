import DemoTagPage from "./pages/Demo/DemoTagPage";
import PortalPageV2 from "./pages/PortalPageV2/PortalPageV2";
import DashboardPageV2 from "./pages/HomePage/HomePage";

export const normalRoutes = [
  {
    path: "/login",
    component: DashboardPageV2,
    name: "Login",
  },
  {
    path: "/portalv2",
    component: PortalPageV2,
    name: "Trang chủ",
  },
];

export const routes = [
  {
    path: "/",
    component: PortalPageV2,
    name: "Trang chủ",
  },
  {
    path: "/home",
    component: DashboardPageV2,
    name: "DashboardPage",
  },
];
