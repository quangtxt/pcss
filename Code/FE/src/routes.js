import HomePage from "./pages/HomePage/HomePage";
import RegNewsPage from "./pages/RegNewsPage/RegNewsPage";
import TeamPage from "./pages/Registration/TeamPage/TeamPage";
import ListRequestPage from "./pages/Registration/ListRequestPage/ListRequestPage";
import CreateIdeaPage from "./pages/Registration/CreateIdeaPage/CreateIdeaPage";
import ListSupervisorsPage from "./pages/Registration/ListSupervisorsPage/ListSupervisorsPage";
import GroupInvitedMentorPage from "./pages/GroupInvitedMentorPage/GroupInvitedMentorPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import DetailProfileSupervisorPage from "./pages/DetailProfileSupervisorPage";
import ListStudentPage from "./pages/ListStudentPage";
import ListGroupPage from "./pages/ListGroupPage";

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
    component: CreateIdeaPage,
    name: "CreateIdeaPage",
  },
  {
    path: "/registration/listSupervisors",
    component: ListSupervisorsPage,
    name: "ListSupervisorsPage",
  },
  {
    path: "/profile",
    component: ProfilePage,
    name: "ProfilePage",
  },
  {
    path: "/registration/supervisor/detail",
    component: DetailProfileSupervisorPage,
    name: "DetailProfileSupervisorPage",
  },

  //mentor
  {
    path: "/registration/std-request",
    component: GroupInvitedMentorPage,
    name: "GroupInvitedMentorPage",
  },

  //staff
  {
    path: "/student/list",
    component: ListStudentPage,
    name: "ListStudentPage",
  },
  {
    path: "/group/list",
    component: ListGroupPage,
    name: "ListGroupPage",
  },
];
