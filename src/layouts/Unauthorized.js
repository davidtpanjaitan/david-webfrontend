import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { InputAdornment } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "../components/MDBox";
import MDTypography from "../components/MDTypography";
import MDButton from "../components/MDButton";

// Material Dashboard 2 React example components
import PageLayout from "../examples/LayoutContainers/PageLayout";
// import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";

function Unauthorized() {
    const navigate = useNavigate();

    const handleButtonKembali = () => {
        navigate("/")
    };

    return (
      <PageLayout>
        <MDBox py={3} sx={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12} align="center">
              <MDTypography variant="h3">
                Anda tidak memiliki akses ke halaman ini
              </MDTypography>
            </Grid>
            <Grid item xs={12} md={12} lg={12} align="center">
              <MDButton variant="gradient" color="secondary" onClick={handleButtonKembali}>
                Kembali
              </MDButton>
            </Grid>
          </Grid>
        </MDBox>
      </PageLayout>
    );
}

export default Unauthorized;
