import Login from "@/Login";
import Register from "@/Register";
import Home from "@/Home";
import Assessment from "@/Assessment";
import JobPage from "@/JobPage";
import JobDetail from "@/JobDetail";
import InterviewSimulation from "@/InterviewSimulation";
import Results from "@/Results";
import History from "@/History";
import JobMatches from "@/Recommendations";
import Recommendations from "@/Recommendations";

export type PageType = {
  name: string;
  path: string;
  element: JSX.Element;
  hideNavbar?: boolean;
  isAuth?: boolean;
};

export const PAGES: PageType[] = [
  {
    name: "Login",
    path: "/login",
    element: <Login />,
    hideNavbar: true,
  },
  {
    name: "Register",
    path: "/register",
    element: <Register />,
    hideNavbar: true,
  },
  {
    name: "Home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "Jobs",
    path: "/jobdetail/:id",
    element: <JobDetail />,
  },
  {
    name: "Assessment",
    path: "/assessment",
    element: <Assessment />,
    isAuth: true,
  },
  {
    name: "Jobs",
    path: "/jobs",
    element: <JobPage />,
  },
  {
    name: "Interview Simulation",
    path: "/interview",
    element: <InterviewSimulation />,
    isAuth: true,
  },
  {
    name: "Results",
    path: "/results/:id",
    element: <Results />,
    isAuth: true,
  },
  {
    name: "History",
    path: "/history",
    element: <History />,
    isAuth: true,
  },
  {
    name: "Job Recommendations",
    path: "/recommendations",
    element: <Recommendations />,
    isAuth: true,
  },
];