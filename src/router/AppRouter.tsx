import { Typography } from "antd";
import { createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "../components";
import LoginPage from "../page/Auth/Login/Login";
import Penugasan from "../page/Tugas/Penugasan";
import Persuratan from "../page/Tugas/Persuratan";
import TugasAktif from "../page/Tugas/TugasAktif";


const AppRoute = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/', element: <AdminLayout />, children: [{ path: '/tugas-aktif', element: <TugasAktif />}]},
  { path: '/', element: <AdminLayout />, children: [{ path: '/surat-tugas', element: <Persuratan />}]},
  { path: '/', element: <AdminLayout />, children: [{ path: '/penugasan', element: <Penugasan />}]},
])

export default AppRoute