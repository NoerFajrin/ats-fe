import { Typography } from "antd";
import { createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "../components";
import LoginPage from "../page/Auth/Login/Login";
import FieldPersonel from "../page/FieldPersonel";
import Penugasan from "../page/Tugas/Penugasan";
import Persuratan from "../page/Tugas/Persuratan";
import TugasAktif from "../page/Tugas/TugasAktif";
import { Dashboard, DetailPenugasan, Statistic } from "../page";
import AuthProtector from "./AuthProtector";


const AppRoute = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/statistic', element: <Statistic /> },
  // { path: '/', element: <AdminLayout />, children: [{ path: '/monitoring', element: <Dashboard />}]},
  {
    path: '/', element: <AuthProtector><AdminLayout/></AuthProtector>, children: [
      { path: '/tugas-aktif', element: <TugasAktif /> },
      { path: '/surat-tugas', element: <Persuratan /> },
      { path: '/penugasan', element: <Penugasan /> },
      { path: '/penugasan/detail/:penugasanId', element: <DetailPenugasan /> },
      { path: '/field-personel', element: <FieldPersonel /> }
    ]
  },
])

export default AppRoute