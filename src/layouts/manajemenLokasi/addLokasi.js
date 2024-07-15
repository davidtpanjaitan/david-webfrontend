import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

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

function AddLokasi() {
  const baseUrl = "https://david-test-webapp.azurewebsites.net/api";
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  const [errors, setErrors] = useState({});

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

  const handleButtonSimpan = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setShowModal(true);
    } else {
      console.log('Form validation failed');
    } 
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.namaLokasi.trim()) {
      newErrors.namaLokasi = "Nama lokasi tidak boleh kosong";
    }

    if (!formData.namaPetani.trim()) {
      newErrors.namaPetani = "Nama petani tidak boleh kosong";
    }

    if (!formData.koordinat.trim()) {
      newErrors.koordinat = "Koordinat tidak boleh kosong";
    }

    if (!formData.lokasiLengkap.trim()) {
      newErrors.lokasiLengkap = "Lokasi lengkap tidak boleh kosong";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const confirmSubmit = async (e) => {
    setShowModal(false);
    // setIsLoading(true);
    console.log(formData);

    try {
      const response = await axios.post(`${baseUrl}/lokasi`, {
        namaLokasi: formData.namaLokasi,
        namaPetani: formData.namaPetani,
        koordinat: formData.koordinat,
        lokasiLengkap: formData.lokasiLengkap,
      });
      console.log("Lokasi berhasil disimpan:", response.data);
      navigate('/lokasi');
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
      <MDBox mt={6} mb={3} component="form" method="post" onSubmit={handleButtonSimpan}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h4" align="center">Tambah Lokasi</MDTypography>
              </MDBox>
              <MDBox pt={2} px={5}>
                <Grid container spacing={3} justifyContent='center'>
                  <Grid item xs={12} md={9}>
                    {/* <MDTypography variant="caption">Tambah Lokasi</MDTypography> */}
                    <MDInput 
                      name="namaLokasi"
                      label="Nama Lokasi" 
                      onChange={handleChange} 
                      value={formData.namaLokasi} 
                      fullWidth />
                      {errors.namaLokasi && (
                        <MDTypography variant="caption" color="error" fontWeight="regular">
                            {errors.namaLokasi}
                        </MDTypography>
                      )}
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <MDInput 
                      name="namaPetani"
                      label="Nama Petani" 
                      value={formData.namaPetani} 
                      onChange={handleChange} 
                      fullWidth />
                    {errors.namaPetani && (
                      <MDTypography variant="caption" color="error" fontWeight="regular">
                        {errors.namaPetani}
                      </MDTypography>
                    )}
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <MDInput 
                      name="koordinat"
                      label="Koordinat Lokasi" 
                      value={formData.koordinat} 
                      onChange={handleChange} 
                      fullWidth />
                      {errors.koordinat && (
                        <MDTypography variant="caption" color="error" fontWeight="regular">
                          {errors.koordinat}
                        </MDTypography>
                      )}
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <MDInput 
                      name="lokasiLengkap"
                      label="Lokasi Lengkap" 
                      value={formData.lokasiLengkap} 
                      onChange={handleChange} 
                      fullWidth />
                      {errors.lokasiLengkap && (
                        <MDTypography variant="caption" color="error" fontWeight="regular">
                          {errors.lokasiLengkap}
                        </MDTypography>
                      )}
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox p={3} display="flex" justifyContent="center">
                <MDButton variant="gradient" color="secondary" style={{ marginRight: '10px' }} onClick={handleButtonKembali}>Kembali</MDButton>
                <MDButton type="submit" variant="gradient" color="primary" style={{ marginLeft: '10px' }}>Simpan</MDButton>
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
                  Apakah Anda yakin untuk menyimpan lokasi baru?
                </MDTypography>
              </MDBox>
              <Divider sx={{ my: 0 }} />
              <MDBox display="flex" justifyContent="space-between" p={1.5}>
                <MDButton variant="gradient" color="secondary" onClick={toggleModal}>
                  Batal
                </MDButton>
                <MDButton variant="gradient" color="info" onClick={confirmSubmit}>
                  Simpan 
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

export default AddLokasi;
