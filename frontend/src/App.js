import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageNotFound from './pages/PageNotFound';
import AppContext, { ContextProvider } from "./context/AppContext";
import EditTask from "./pages/EditTask";
import Protected from "./pages/Protected";
import TaskDetail from "./pages/TaskDetail";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/home",
      element: <Protected><Dashboard /></Protected>,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },

    {
      path: "/signup",
      element:
        <SignupPage />,
    },
    {
      path: "/edit-task/:id",
      element:
        <Protected><EditTask /></Protected>,
    },
    {
      path: "/:id/task_detail",
      element:
        <Protected><TaskDetail /></Protected>,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },

  ]);
  return (
    <ContextProvider>
      <div className="w-full h-full">
        <RouterProvider router={router} />
      </div>
    </ContextProvider>
  );
}










