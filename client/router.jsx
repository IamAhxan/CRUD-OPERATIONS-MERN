import { createBrowserRouter } from "react-router-dom";
import CreateUsers from "./src/CreateUser";
import Users from "./src/Users";
import UpdateUsers from "./src/UpdateUser";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Users />,
    },
    {
        path: "/create",
        element: <CreateUsers />,
    },
    {
        path: "/update/:id/",
        element: <UpdateUsers />,
    },
])

export default router