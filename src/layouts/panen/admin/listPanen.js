

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { InputAdornment } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import MDButton from "../../../components/MDButton";
import MDInput from "../../../components/MDInput";

// Material Dashboard 2 React example components
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import Footer from "../../../examples/Footer";
import DataTable from "../../../examples/Tables/DataTable";

// Data
import authorsTableData from "./data/authorsTableData";
import projectsTableData from "./data/projectsTableData";

function ListPanen() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3} pb={3}>
        <Grid item xs={12} container justifyContent="center">
          <MDTypography variant="h2">Daftar Panen</MDTypography>
        </Grid>
        <Grid item xs={12} container justifyContent="center" spacing={2} pt={3} pb={3}>
          <Grid item>
            <MDButton variant="gradient" color="primary">
              Generate QR
            </MDButton>
          </Grid>
          {/* <Grid item>
            <MDBox pr={1}>
              <MDInput
                fullWidth
                label="Search"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Icon fontSize="medium">search</Icon>
                    </InputAdornment>
                  ),
                }}
              />
            </MDBox>
          </Grid> */}
          {/* <Grid item>
            <TextField label="Search" variant="outlined" />
          </Grid> */}
        </Grid>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  canSearch={true}
                  isSorted={true}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  // noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={true}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ListPanen;
