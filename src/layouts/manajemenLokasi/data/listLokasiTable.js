/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import MDButton from "../../../components/MDButton";
import MDAvatar from "../../../components/MDAvatar";
import MDBadge from "../../../components/MDBadge";

// Images
import team2 from "../../../assets/images/team-2.jpg";
import team3 from "../../../assets/images/team-3.jpg";
import team4 from "../../../assets/images/team-4.jpg";

export default function useLokasiTable( data ) {
  const navigate = useNavigate();

    const columns = useMemo(() => [
      { Header: "nama lokasi", accessor: "nama_lokasi", align: "center" },
      { Header: "nama petani", accessor: "nama_petani", align: "center" },
      { Header: "koordinat", accessor: "koordinat", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ], []);

    const rows = useMemo(() => data.map((lokasi) => ({
      nama_lokasi: (
        <MDTypography variant="subtitle2" color="text" fontWeight="medium">
          {lokasi.namaLokasi}
        </MDTypography>
      ),
      nama_petani: (
        <MDTypography variant="subtitle2" color="text" fontWeight="medium">
          {lokasi.namaPetani}
        </MDTypography>
      ),
      koordinat: (
        <MDTypography variant="subtitle2" color="text" fontWeight="medium">
          {lokasi.koordinat}
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href="#" color="text">
          <MDButton variant="outlined" color="info" size="small" onClick={() => navigate(`/lokasi/${lokasi.id}`)}>
            Detail
          </MDButton>
        </MDTypography>
      ),
    })), [data, navigate]);
  
    return { columns, rows };
}
