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

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import MDAvatar from "../../../components/MDAvatar";
import MDBadge from "../../../components/MDBadge";

// Images
import team2 from "../../../assets/images/team-2.jpg";
import team3 from "../../../assets/images/team-3.jpg";
import team4 from "../../../assets/images/team-4.jpg";

export default function listLokasiTable( data ) {
  // const baseUrl = "https://david-test-webapp.azurewebsites.net/api";
  // const [listLokasi, setListLokasi] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`${baseUrl}/lokasi`)
  //     .then((res) => {
  //       setListLokasi(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, [listLokasi]);


  // const Author = ({ image, name, email }) => (
  //   <MDBox display="flex" alignItems="center" lineHeight={1}>
  //     <MDAvatar src={image} name={name} size="sm" />
  //     <MDBox ml={2} lineHeight={1}>
  //       <MDTypography display="block" variant="button" fontWeight="medium">
  //         {name}
  //       </MDTypography>
  //       <MDTypography variant="caption">{email}</MDTypography>
  //     </MDBox>
  //   </MDBox>
  // );

  // const Job = ({ title, description }) => (
  //   <MDBox lineHeight={1} textAlign="left">
  //     <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
  //       {title}
  //     </MDTypography>
  //     <MDTypography variant="caption">{description}</MDTypography>
  //   </MDBox>
  // );

    const columns = [
      { Header: "nama lokasi", accessor: "nama_lokasi", width: "45%", align: "center" },
      { Header: "nama petani", accessor: "nama_petani", align: "center" },
      { Header: "koordinat", accessor: "koordinat", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ];

    const rows = data.map((lokasi) => ({
      nama_lokasi: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {lokasi.namaLokasi}
        </MDTypography>
      ),
      nama_petani: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {lokasi.namaPetani}
        </MDTypography>
      ),
      koordinat: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {lokasi.koordinat}
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href="#" color="text">
          <Icon>more_vert</Icon>
        </MDTypography>
      ),
    }));
  
    return { columns, rows };
  
}
