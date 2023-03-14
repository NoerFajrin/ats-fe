import { Typography } from "antd";
import { createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "../components";
import LoginPage from "../page/Auth/Login/Login";
import TugasAktif from "../page/Tugas/TugasAktif";


const AppRoute = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
  path: '/', element: <AdminLayout />, children: [
    { path: '/tugas-aktif', element: <TugasAktif />}
  ]
},
])

export default AppRoute