import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom";

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
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import MDButton from "../../../components/MDButton";
import MDInput from "../../../components/MDInput";

// Material Dashboard 2 React example components
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import Footer from "../../../examples/Footer";

function DetailPanen() {
  const baseUrl = "https://david-test-webapp.azurewebsites.net/api";
  const navigate = useNavigate();
  const { id } = useParams();
  const [dataPanen, setDataPanen] = useState('');

  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [showModalKonfirmasi, setShowModalKonfirmasi] = useState(false);
  const toggleModalKonfirmasi = () => setShowModalKonfirmasi(!showModalKonfirmasi);
  const [showModalHapus, setShowModalHapus] = useState(false);
  const toggleModalHapus = () => setShowModalHapus(!showModalHapus);

  const approver = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`${baseUrl}/panen/${id}`)
      .then((res) => {
        setDataPanen(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  };

  const handleButtonKembali = () => {
    navigate(-1);
  }

  const handleButtonHapus = (e) => {
    e.preventDefault();
    setShowModalHapus(true);
  };

  const confirmHapus = async (e) => {
    setShowModalHapus(false);
    // setIsLoading(true);

    try {
      const response = await axios.delete(`${baseUrl}/panen/${id}`);
      console.log("Panen berhasil dihapus:", response.data);
      navigate('/panen');
    } catch (error) {
      console.error('Error:', error);
    }
    // } finally {
    //   setIsLoading(false); 
    // }
  };

  const handleButtonKonfirmasi = (e) => {
    e.preventDefault();
    setShowModalKonfirmasi(true);
  }

  const confirmSubmit = async (e) => {
    setShowModalKonfirmasi(false);
    // setIsLoading(true);

    try {
      const response = await axios.put(`${baseUrl}/panen/${id}/approve-done`, {
        approve: true,
        idApprover: approver.id,
        namaApprover: approver.name
      });
      console.log("Data panen berhasil di-approve:", response.data);
      navigate('/panen');
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
                <MDTypography variant="h4" align="center">Detail Panen</MDTypography>
              </MDBox>
              <MDBox pt={2} px={5} align="center">
                {/* ID Panen */}
                <Grid container spacing={3} align="left" ml={2}>
                  <Grid item xs={4} md={4} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="regular">ID Panen</MDTypography>
                  </Grid>
                  <Grid item xs={1} md={1} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">:</MDTypography>
                  </Grid>
                  <Grid item xs={7} md={7} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">{dataPanen?.id}</MDTypography>
                  </Grid>
                </Grid>
                {/* Status */}
                <Grid container spacing={3} align="left" ml={2} mb={2}>
                  <Grid item xs={4} md={4} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="regular">Status</MDTypography>
                  </Grid>
                  <Grid item xs={1} md={1} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">:</MDTypography>
                  </Grid>
                  <Grid item xs={7} md={7} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">{dataPanen?.status}</MDTypography>
                  </Grid>
                </Grid>

                {/* Nama Lokasi */}
                <Grid container spacing={3} align="left" ml={2}>
                  <Grid item xs={4} md={4} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="regular">Lokasi Panen</MDTypography>
                  </Grid>
                  <Grid item xs={1} md={1} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">:</MDTypography>
                  </Grid>
                  <Grid item xs={7} md={7} mb={2}>
                    <Link to={`/lokasi/${dataPanen?.idLokasi}`}>
                      <MDTypography variant="subtitle2" fontWeight="medium">{dataPanen?.namaLokasi}</MDTypography>
                    </Link>
                  </Grid>
                </Grid>
                {/* Tanggal Panen */}
                <Grid container spacing={3} align="left" ml={2}>
                  <Grid item xs={4} md={4} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="regular">Tanggal Panen</MDTypography>
                  </Grid>
                  <Grid item xs={1} md={1} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">:</MDTypography>
                  </Grid>
                  <Grid item xs={7} md={7} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">{formatDate(dataPanen?.tanggalPanen)}</MDTypography>
                  </Grid>
                </Grid>
                {/* Berat Total */}
                <Grid container spacing={3} align="left" ml={2}>
                  <Grid item xs={4} md={4} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="regular">Berat Total</MDTypography>
                  </Grid>
                  <Grid item xs={1} md={1} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">:</MDTypography>
                  </Grid>
                  <Grid item xs={7} md={7} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">{dataPanen?.beratPanen}</MDTypography>
                  </Grid>
                </Grid>
                {/* Jenis madu */}
                <Grid container spacing={3} align="left" ml={2}>
                  <Grid item xs={4} md={4} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="regular">Jenis madu</MDTypography>
                  </Grid>
                  <Grid item xs={1} md={1} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">:</MDTypography>
                  </Grid>
                  <Grid item xs={7} md={7} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">{dataPanen?.jenisMadu}</MDTypography>
                  </Grid>
                </Grid>
                {/* Nama Petugas Panen */}
                <Grid container spacing={3} align="left" ml={2}>
                  <Grid item xs={4} md={4} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="regular">Petugas Panen</MDTypography>
                  </Grid>
                  <Grid item xs={1} md={1} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">:</MDTypography>
                  </Grid>
                  <Grid item xs={7} md={7} mb={2}>
                    <Link to={`/user/${dataPanen?.idPetugasPanen}`}>
                      <MDTypography variant="subtitle2" fontWeight="medium">{dataPanen?.namaPetugasPanen}</MDTypography>
                    </Link>
                  </Grid>
                </Grid>
                {/* Nama PIC Panen */}
                <Grid container spacing={3} align="left" ml={2} mb={2}>
                  <Grid item xs={4} md={4} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="regular">PIC Panen</MDTypography>
                  </Grid>
                  <Grid item xs={1} md={1} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">:</MDTypography>
                  </Grid>
                  <Grid item xs={7} md={7} mb={2}>
                    <Link to={`/user/${dataPanen?.idPICPanen}`}>
                      <MDTypography variant="subtitle2" fontWeight="medium">{dataPanen?.namaPICPanen}</MDTypography>
                    </Link>
                  </Grid>
                </Grid>
        
                {/* Tanggal sampai di WH */}
                <Grid container spacing={3} align="left" ml={2}>
                  <Grid item xs={4} md={4} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="regular">Tanggal tiba di warehouse</MDTypography>
                  </Grid>
                  <Grid item xs={1} md={1} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">:</MDTypography>
                  </Grid>
                  <Grid item xs={7} md={7} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">{formatDate(dataPanen?.tanggalWarehouse)}</MDTypography>
                  </Grid>
                </Grid>
                {/* Berat sampai di WH */}
                <Grid container spacing={3} align="left" ml={2}>
                  <Grid item xs={4} md={4} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="regular">Berat Tiba di Warehouse</MDTypography>
                  </Grid>
                  <Grid item xs={1} md={1} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">:</MDTypography>
                  </Grid>
                  <Grid item xs={7} md={7} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">{dataPanen?.beratWarehouse}</MDTypography>
                  </Grid>
                </Grid>
                {/* Petugas WH */}
                <Grid container spacing={3} align="left" ml={2}>
                  <Grid item xs={4} md={4} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="regular">Petugas Warehouse</MDTypography>
                  </Grid>
                  <Grid item xs={1} md={1} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">:</MDTypography>
                  </Grid>
                  <Grid item xs={7} md={7} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">{dataPanen?.namaPetugasWarehouse}</MDTypography>
                  </Grid>
                </Grid>
                {/* Catatan WH */}
                <Grid container spacing={3} align="left" ml={2}>
                  <Grid item xs={4} md={4} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="regular">Catatan Warehouse</MDTypography>
                  </Grid>
                  <Grid item xs={1} md={1} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">:</MDTypography>
                  </Grid>
                  <Grid item xs={7} md={7} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">{dataPanen?.catatanWarehouse}</MDTypography>
                  </Grid>
                </Grid>

               
              </MDBox>
              {/* Buttons */}
              <MDBox p={3} display="flex" justifyContent="center">
                <MDButton variant="gradient" color="secondary" style={{ width: '100px' }} onClick={handleButtonKembali}>Kembali</MDButton>
                <MDButton disabled={dataPanen.status!="GENERATED"} variant="gradient" color="primary" style={{ marginLeft: '10px' }} onClick={handleButtonKonfirmasi}>Konfirmasi</MDButton>

                {dataPanen?.status === "GENERATED" && 
                  <MDButton variant="gradient" color="error" style={{ width: '100px', marginLeft: '10px' }} onClick={handleButtonHapus}>Hapus</MDButton>
                }
                
              </MDBox>
            </Card>
          </Grid>
        </Grid>

        <Modal open={showModalKonfirmasi} onClose={toggleModalKonfirmasi} sx={{ display: "grid", placeItems: "center"}}>
          <Slide direction="down" in={showModalKonfirmasi} timeout={500}>
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
                <Icon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModalKonfirmasi}>close</Icon> 
              </MDBox>
              <Divider sx={{ my: 0 }} />
              <MDBox p={2} my={3}>
                <MDTypography variant="body2" color="secondary" fontWeight="regular" align="center">
                  Apakah Anda yakin untuk melakukan konfirmasi data panen?
                </MDTypography>
              </MDBox>
              <Divider sx={{ my: 0 }} />
              <MDBox display="flex" justifyContent="space-between" p={1.5}>
                <MDButton variant="gradient" color="secondary" onClick={toggleModalKonfirmasi}>
                  Batal
                </MDButton>
                <MDButton variant="gradient" color="info" onClick={confirmSubmit}>
                  Konfirmasi
                </MDButton>
  
              </MDBox>
            </MDBox>
          </Slide>
        </Modal>

        <Modal open={showModalHapus} onClose={toggleModalHapus} sx={{ display: "grid", placeItems: "center"}}>
          <Slide direction="down" in={showModalHapus} timeout={500}>
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
                <Icon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModalKonfirmasi}>close</Icon> 
              </MDBox>
              <Divider sx={{ my: 0 }} />
              <MDBox p={2} my={3}>
                <MDTypography variant="body2" color="secondary" fontWeight="regular" align="center">
                  Apakah Anda yakin untuk menghapus data panen?
                </MDTypography>
              </MDBox>
              <Divider sx={{ my: 0 }} />
              <MDBox display="flex" justifyContent="space-between" p={1.5}>
                <MDButton variant="gradient" color="secondary" onClick={toggleModalKonfirmasi}>
                  Batal
                </MDButton>
                <MDButton variant="gradient" color="info" onClick={confirmHapus}>
                  Konfirmasi
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

export default DetailPanen;
