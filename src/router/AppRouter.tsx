import { Typography } from "antd";
import { createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "../components";
import LoginPage from "../page/Auth/Login/Login";


const AppRoute = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
  path: '/', element: <AdminLayout />, children: [
    { path: '/home', element: <Typography>Tertawa</Typography> }
  ]
},
])

export default AppRoute