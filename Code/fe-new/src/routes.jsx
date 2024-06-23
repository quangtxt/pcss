import DetailProfileSupervisorPage from "./pages/DetailProfileSupervisorPage";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import CreateIdeaPage from "./pages/Registration/CreateIdeaPage/CreateIdeaPage";
import ListRequestPage from "./pages/Registration/ListRequestPage/ListRequestPage";
import ListSupervisorsPage from "./pages/Registration/ListSupervisorsPage/ListSupervisorsPage";
import TeamPage from "./pages/Registration/TeamPage/TeamPage";

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
    path: "/registration/createIdea",
    component: CreateIdeaPage,
    name: "CreateIdeaPage",
  },
  {
    path: "/registration/supervisors",
    component: ListSupervisorsPage,
    name: "ListSupervisorsPage",
  },
  {
    path: "/profile",
    component: ProfilePage,
    name: "ProfilePage",
  },
  {
    path: "/registration/supervisors/detail/:supervisorId",
    component: DetailProfileSupervisorPage,
    name: "Detail Profile Supervisor",
  },
];
