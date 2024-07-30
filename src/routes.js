// Material Dashboard 2 React layouts
import Dashboard from "./layouts/dashboard/Dashboard";
import ListPanen from "./layouts/panen/admin/ListPanen";
import ListProduksi from "./layouts/produksi/admin/ListProduksi";
import ScanQrPanen from "./layouts/scanQr/ScanQrPanen";
import ScanQrProduksi from "./layouts/scanQr/ScanQrProduksi";
import ListUser from "./layouts/manajemenUser/ListUser";
import ListLokasi from "./layouts/manajemenLokasi/ListLokasi";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Scan QR Panen",
    key: "scan-qr-panen",
    icon: <Icon fontSize="small">crop_free</Icon>,
    route: "/scan-qr-panen",
    component: <ScanQrPanen />,
  },
  {
    type: "collapse",
    name: "Scan QR Produksi",
    key: "scan-qr-produksi",
    icon: <Icon fontSize="small">crop_free</Icon>,
    route: "/scan-qr-produksi",
    component: <ScanQrProduksi />,
  },
  {
    type: "collapse",
    name: "Panen",
    key: "panen",
    icon: <Icon fontSize="small">hive</Icon>,
    route: "/panen",
    component: <ListPanen />,
  },
  {
    type: "collapse",
    name: "Produksi",
    key: "produksi",
    icon: <Icon fontSize="small">inventory</Icon>,
    route: "/produksi",
    component: <ListProduksi />,
  },
  {
    type: "collapse",
    name: "Lokasi",
    key: "lokasi",
    icon: <Icon fontSize="small">place</Icon>,
    route: "/lokasi",
    component: <ListLokasi />,
  },
  {
    type: "collapse",
    name: "Manajemen User",
    key: "user",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/user",
    component: <ListUser />,
  },
];

export default routes;