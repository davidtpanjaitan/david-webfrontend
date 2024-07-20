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

export default function useUserTable( data ) {
  const navigate = useNavigate();

    const columns = useMemo(() => [
      { Header: "Id", accessor: "id", align: "center" },
      { Header: "Nama", accessor: "nama", align: "center" },
      { Header: "Username", accessor: "username", align: "center" },
      { Header: "Role", accessor: "role", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ], []);

    const rows = useMemo(() => data.map((user) => ({
      id: (
        <MDTypography variant="subtitle2" color="text" fontWeight="medium">
          {user.employeeId}
        </MDTypography>
      ),
      nama: (
        <MDTypography variant="subtitle2" color="text" fontWeight="medium">
          {user.name}
        </MDTypography>
      ),
      username: (
        <MDTypography variant="subtitle2" color="text" fontWeight="medium">
          {user.username}
        </MDTypography>
      ),
      role: (
        <MDTypography variant="subtitle2" color="text" fontWeight="medium">
          {user.role}
        </MDTypography>
      ),
      action: (
        <MDBox>
          <MDButton 
            style={{ marginRight: '10px'}}
            variant="outlined" 
            color="info" 
            size="small" 
            onClick={() => navigate(`/user/${user.id}`)}>
              Detail
          </MDButton>
          <MDButton 
            variant="outlined" 
            color="info" 
            size="small" 
            onClick={() => navigate(`/user/${user.id}/ubah-password`)}>
              Ubah Password
          </MDButton>
        </MDBox>
      ),
    })), [data, navigate]);
  
    return { columns, rows };
}