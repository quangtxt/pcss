import HomePage from "./pages/HomePage/HomePage";
import RegNewsPage from "./pages/RegNewsPage/RegNewsPage";
import RegTeamPage from "./pages/RegTeamPage/RegTeamPage";
import RegCreateIdeaPage from "./pages/RegCreateIdeaPage/RegCreateIdeaPage";
import ListSupervisorsPage from "./pages/Registration/ListSupervisorsPage/ListSupervisorsPage";

export const normalRoutes = [
  {
    path: "/login",
    component: HomePage,
    name: "Login",
  },
];

export const routes = [
  {
    path: "/",
    component: HomePage,
    name: "Trang chủ",
  },
  {
    path: "/home",
    component: HomePage,
    name: "DashboardPage",
  },
  {
    path: "/registration/news",
    component: RegNewsPage,
    name: "RegNewsPage",
  },
  {
    path: "/registration/team",
    component: RegTeamPage,
    name: "RegNewsPage",
  },
  {
    path: "/registration/createIdea",
    component: RegCreateIdeaPage,
    name: "RegCreateIdeaPage",
  },
  {
    path: "/registration/listSupervisors",
    component: ListSupervisorsPage,
    name: "ListSupervisorsPage",
  },
];
