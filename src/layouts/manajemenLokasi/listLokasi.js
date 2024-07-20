import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { InputAdornment } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";
import MDInput from "../../components/MDInput";

// Material Dashboard 2 React example components
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Footer from "../../examples/Footer";
import DataTable from "../../examples/Tables/DataTable";

// Data
import useLokasiTable from "./data/listLokasiTable";

function ListLokasi() {
    const baseUrl = "https://david-test-webapp.azurewebsites.net/api";
    const navigate = useNavigate();
    const [listLokasi, setListLokasi] = useState([]);

    useEffect(() => {
        axios
          .get(`${baseUrl}/lokasi`)
          .then((res) => {
            setListLokasi(res.data);
          })
          .catch((err) => console.log(err));
      }, [listLokasi]);

    const { columns, rows } = useLokasiTable(listLokasi);

    const handleButtonTambahLokasi = () => {
        navigate("/lokasi/tambah")
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={3} pb={3}>
                <Grid item xs={12} container justifyContent="center">
                    <MDTypography variant="h2">Daftar Lokasi Panen</MDTypography>
                </Grid>
                <Grid item xs={12} container justifyContent="center" spacing={2} pt={3} pb={3}>
                    <Grid item>
                        <MDButton variant="gradient" color="primary" onClick={handleButtonTambahLokasi}>
                            + Tambah Lokasi
                        </MDButton>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <MDBox pt={3}>
                            <DataTable
                                table={{ columns, rows }}
                                canSearch={true}
                                isSorted={false}
                                entriesPerPage={true}
                                showTotalEntries={true}
                                noEndBorder
                            />
                        </MDBox>
                    </Card>
                </Grid>
            </MDBox>
        {/* <Footer /> */}
        </DashboardLayout>
    );
}

export default ListLokasi;
