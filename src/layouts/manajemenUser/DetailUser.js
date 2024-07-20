import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";
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

function DetailLokasi() {
  const baseUrl = "https://david-test-webapp.azurewebsites.net/api";
  const navigate = useNavigate();
  const { id } = useParams();
  const [dataUser, setDataUser] = useState('');

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    axios
      .get(`${baseUrl}/user/${id}`)
      .then((res) => {
        setDataUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [formData, setFormData] = useState({
    namaLokasi: '',
    namaPetani: '',
    koordinat: '',
    lokasiLengkap: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleButtonKembali = () => {
    navigate(-1);
  }

  const handleButtonUbah = () => {
    navigate(`/user/${id}/ubah`);
  }

  const handleButtonHapus = (e) => {
    e.preventDefault();

    // if (validateForm()) {
      setShowModal(true);
    // } else {
    //   console.log('Form validation failed');
    // } 
  };

  const confirmSubmit = async (e) => {
    setShowModal(false);
    // setIsLoading(true);
    console.log(formData);

    try {
      const response = await axios.delete(`${baseUrl}/user/${id}`);
      console.log("User berhasil dihapus:", response.data);
      navigate('/user');
    } catch (error) {
      console.error('Error:', error);
    }
    // } finally {
    //   setIsLoading(false); 
    // }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h4" align="center">Detail User</MDTypography>
              </MDBox>
              <MDBox pt={2} px={5} align="center">
                {/* Employee ID */}
                <Grid container spacing={3} align="left" ml={2}>
                  <Grid item xs={4} md={4} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="regular">NIK</MDTypography>
                  </Grid>
                  <Grid item xs={1} md={1} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">:</MDTypography>
                  </Grid>
                  <Grid item xs={7} md={7} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">{dataUser?.employeeId}</MDTypography>
                  </Grid>
                </Grid>
                {/* Nama */}
                <Grid container spacing={3} align="left" ml={2}>
                  <Grid item xs={4} md={4} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="regular">Nama</MDTypography>
                  </Grid>
                  <Grid item xs={1} md={1} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">:</MDTypography>
                  </Grid>
                  <Grid item xs={7} md={7} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">{dataUser?.name}</MDTypography>
                  </Grid>
                </Grid>
                {/* Username */}
                <Grid container spacing={3} align="left" ml={2}>
                  <Grid item xs={4} md={4} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="regular">Username</MDTypography>
                  </Grid>
                  <Grid item xs={1} md={1} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">:</MDTypography>
                  </Grid>
                  <Grid item xs={7} md={7} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">{dataUser?.username}</MDTypography>
                  </Grid>
                </Grid>
                {/* Role */}
                <Grid container spacing={3} align="left" ml={2}>
                  <Grid item xs={4} md={4} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="regular">Role</MDTypography>
                  </Grid>
                  <Grid item xs={1} md={1} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">:</MDTypography>
                  </Grid>
                  <Grid item xs={7} md={7} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">{dataUser?.role}</MDTypography>
                  </Grid>
                </Grid>
              </MDBox>
              {/* Buttons */}
              <MDBox p={3} display="flex" justifyContent="center">
                <MDButton variant="gradient" color="secondary" style={{ width: '100px' }} onClick={handleButtonKembali}>Kembali</MDButton>
                <MDButton variant="gradient" color="warning" style={{ marginLeft: '20px', marginRight: '20px', width: '100px' }} onClick={handleButtonUbah}>Ubah</MDButton>
                <MDButton variant="gradient" color="error" style={{ width: '100px' }} onClick={handleButtonHapus}>Hapus</MDButton>
              </MDBox>
            </Card>
          </Grid>
        </Grid>

        <Modal open={showModal} onClose={toggleModal} sx={{ display: "grid", placeItems: "center"}}>
          <Slide direction="down" in={showModal} timeout={500}>
            <MDBox
              position="relative"
              width="100%"
              maxWidth="450px"
              display="flex"
              flexDirection="column"
              borderRadius="xl"
              bgColor="white"
              shadow="xl"
            >
              <MDBox display="flex" alignItems="center" justifyContent="space-between" p={2}>
                <MDTypography variant="h5">Konfirmasi</MDTypography>
                <Icon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModal}>close</Icon> 
              </MDBox>
              <Divider sx={{ my: 0 }} />
              <MDBox p={2} my={3}>
                <MDTypography variant="body2" color="secondary" fontWeight="regular" align="center">
                  Apakah Anda yakin untuk menghapus user?
                </MDTypography>
              </MDBox>
              <Divider sx={{ my: 0 }} />
              <MDBox display="flex" justifyContent="space-between" p={1.5}>
                <MDButton variant="gradient" color="secondary" onClick={toggleModal}>
                  Batal
                </MDButton>
                <MDButton variant="gradient" color="error" onClick={confirmSubmit}>
                  Hapus 
                </MDButton>
              </MDBox>
            </MDBox>
          </Slide>
        </Modal>

      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default DetailLokasi;
