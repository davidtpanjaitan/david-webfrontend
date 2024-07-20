import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Dashboard 2 React example components
import Sidenav from "./examples/Sidenav";

// Material Dashboard 2 React themes
import theme from "./assets/theme";

// Material Dashboard 2 React routes
import routes from "./routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "./context";

// Images
import brandWhite from "./assets/images/logo-ct.png";

// Page Login
import Login from "./layouts/auth/Login";
import AuthProvider from "./layouts/auth/AuthProvider";

// Pages Lokasi
import AddLokasi from "./layouts/manajemenLokasi/AddLokasi";
import DetailLokasi from "./layouts/manajemenLokasi/DetailLokasi";
import EditLokasi from "./layouts/manajemenLokasi/EditLokasi";

// Pages Manajemen User
import AddUser from "./layouts/manajemenUser/AddUser";
import EditUser from "./layouts/manajemenUser/EditUser";
import DetailUser from "./layouts/manajemenUser/DetailUser";
import ChangePassword from "./layouts/manajemenUser/ChangePassword";

// Pages Panen
import GenerateQrPanen from "./layouts/panen/admin/GenerateQrPanen";

function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <AuthProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brandWhite}
            brandName="SGI"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
        </>
      )}
      {layout === "vr"}
      <Routes>
        {getRoutes(routes)}

        { localStorage.getItem("token")? (
          <Route path="*" element={<Navigate to="/dashboard" />} />
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
        
        <Route path="/login" element={<Login />} />

        <Route path="/lokasi/tambah" element={<AddLokasi />} />
        <Route path="/lokasi/:id" element={<DetailLokasi />} />
        <Route path="/lokasi/:id/ubah" element={<EditLokasi />} />

        <Route path="/user/tambah" element={<AddUser />} />
        <Route path="/user/:id" element={<DetailUser />} />
        <Route path="/user/:id/ubah" element={<EditUser />} />
        <Route path="/user/:id/ubah-password" element={<ChangePassword />} />

        <Route path="/panen/generate-qr" element={<GenerateQrPanen />} />
      </Routes>
    </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
