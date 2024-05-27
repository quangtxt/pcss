import HomePage from "./pages/HomePage/HomePage";
import RegNewsPage from "./pages/RegNewsPage/RegNewsPage";
import TeamPage from "./pages/Registration/TeamPage/TeamPage";
import ListRequestPage from "./pages/Registration/ListRequestPage/ListRequestPage";
import RegCreateIdeaPage from "./pages/RegCreateIdeaPage/RegCreateIdeaPage";
import ListSupervisorsPage from "./pages/Registration/ListSupervisorsPage/ListSupervisorsPage";
import GroupInvitedMentorPage from "./pages/GroupInvitedMentorPage/GroupInvitedMentorPage";
import RegProfilePage from "./pages/RegProfilePage/RegProfilePage";

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
    component: TeamPage,
    name: "TeamPage",
  },
  {
    path: "/registration/myRequest",
    component: ListRequestPage,
    name: "ListRequestPage",
  },
  {
    path: "/registration/listSupervisors",
    component: ListSupervisorsPage,
    name: "ListSupervisorsPage",
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
  {
    path: "/registration/profile",
    component: RegProfilePage,
    name: "RegProfilePage",
  },
  //mentor
  {
    path: "/registration/std-request",
    component: GroupInvitedMentorPage,
    name: "GroupInvitedMentorPage",
  },
];
