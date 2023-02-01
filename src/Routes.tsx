import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import CreateContact from "./components/CreateContact";
import { EditForm } from "./components/EditForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/addContact",
    element: <CreateContact />,
  },
  {
    path: "/edit/:id",
    element: <EditForm />,
  },
  {
    path: "*",
    element: <>Page not found!</>,
  },
]);
