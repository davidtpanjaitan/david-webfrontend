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
import useUserTable from "./data/listUserTable";

function ListUser() {
    const baseUrl = "https://david-test-webapp.azurewebsites.net/api";
    const navigate = useNavigate();
    const [listUser, setListUser] = useState([]);

    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    useEffect(() => {
        axios
          .get(`${baseUrl}/user`)
          .then((res) => {
            setListUser(res.data);
          })
          .catch((err) => console.log(err));
      }, [listUser]);

    const { columns, rows } = useUserTable(listUser);

    const handleButtonTambahUser = () => {
        navigate("/user/tambah")
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={3} pb={3}>
                <Grid item xs={12} container justifyContent="center">
                    <MDTypography variant="h2">Daftar User</MDTypography>
                </Grid>
                <Grid item xs={12} container justifyContent="center" spacing={2} pt={3} pb={3}>
                    <Grid item>
                        <MDButton variant="gradient" color="primary" onClick={handleButtonTambahUser}>
                            + Tambah User
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

export default ListUser;
