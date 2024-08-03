import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom";
import ReactLoading from "react-loading";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";
import Icon from "@mui/material/Icon";
import { InputAdornment } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper  } from '@mui/material';

// Material Dashboard 2 React components
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import MDButton from "../../../components/MDButton";
import MDInput from "../../../components/MDInput";

// Material Dashboard 2 React example components
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import Footer from "../../../examples/Footer";

function DetailProduksi() {
  const baseUrl = "https://david-test-webapp.azurewebsites.net/api";
  const navigate = useNavigate();
  const { id } = useParams();
  const [dataProduk, setDataProduk] = useState('');

  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [showModalKonfirmasi, setShowModalKonfirmasi] = useState(false);
  const toggleModalKonfirmasi = () => setShowModalKonfirmasi(!showModalKonfirmasi);
  const [showModalHapus, setShowModalHapus] = useState(false);
  const toggleModalHapus = () => setShowModalHapus(!showModalHapus);
  const [isLoading, setIsLoading] = useState(false);

  const approver = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`${baseUrl}/produk/${id}`)
      .then((res) => {
        setDataProduk(res.data);
        console.log(res.data);
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
    setIsLoading(true);

    try {
      const response = await axios.delete(`${baseUrl}/produk/${id}`);
      console.log("Produk berhasil dihapus:", response.data);
      navigate('/produksi');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false); 
    }
  };

  const handleButtonKonfirmasi = (e) => {
    e.preventDefault();
    setShowModalKonfirmasi(true);
  }

  const confirmSubmit = async (e) => {
    setShowModalKonfirmasi(false);
    setIsLoading(true);

    try {
      const response = await axios.put(`${baseUrl}/produk/${id}/approve-admin`, {
        approve: true,
        idApprover: approver.id,
        namaApprover: approver.name
      });
      console.log("Data produk berhasil di-approve:", response.data);
      navigate('/produksi');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {isLoading ? 
      <ReactLoading type="balls" color="#0000FF"
      height={100} width={50} />
      :
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h4" align="center">Detail Produk</MDTypography>
              </MDBox>
              <MDBox pt={2} px={5} align="center">
                {/* ID Produk */}
                <Grid container spacing={3} align="left" ml={2}>
                  <Grid item xs={4} md={4} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="regular">ID Produk</MDTypography>
                  </Grid>
                  <Grid item xs={1} md={1} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">:</MDTypography>
                  </Grid>
                  <Grid item xs={7} md={7} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">{id}</MDTypography>
                  </Grid>
                </Grid>
                {/* Nama Produk */}
                <Grid container spacing={3} align="left" ml={2}>
                  <Grid item xs={4} md={4} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="regular">Nama Produk</MDTypography>
                  </Grid>
                  <Grid item xs={1} md={1} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">:</MDTypography>
                  </Grid>
                  <Grid item xs={7} md={7} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">{dataProduk?.nama}</MDTypography>
                  </Grid>
                </Grid>
                {/* Status */}
                <Grid container spacing={3} align="left" ml={2}>
                  <Grid item xs={4} md={4} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="regular">Status</MDTypography>
                  </Grid>
                  <Grid item xs={1} md={1} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">:</MDTypography>
                  </Grid>
                  <Grid item xs={7} md={7} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">{dataProduk?.status}</MDTypography>
                  </Grid>
                </Grid>
                {/* Petugas Mixing */}
                <Grid container spacing={3} align="left" ml={2}>
                  <Grid item xs={4} md={4} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="regular">Penanggung Jawab</MDTypography>
                  </Grid>
                  <Grid item xs={1} md={1} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">:</MDTypography>
                  </Grid>
                  <Grid item xs={7} md={7} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">{dataProduk?.namaPetugasMixing}</MDTypography>
                  </Grid>
                </Grid>
                {/* Tanggal Mixing */}
                <Grid container spacing={3} align="left" ml={2}>
                  <Grid item xs={4} md={4} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="regular">Tanggal Produk Diajukan</MDTypography>
                  </Grid>
                  <Grid item xs={1} md={1} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">:</MDTypography>
                  </Grid>
                  <Grid item xs={7} md={7} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">{formatDate(dataProduk?.tanggal)}</MDTypography>
                  </Grid>
                </Grid>
                {/* Berat Total */}
                <Grid container spacing={3} align="left" ml={2}>
                  <Grid item xs={4} md={4} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="regular">Berat Total Produk</MDTypography>
                  </Grid>
                  <Grid item xs={1} md={1} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">:</MDTypography>
                  </Grid>
                  <Grid item xs={7} md={7} mb={2}>
                    <MDTypography variant="subtitle2" fontWeight="medium">{dataProduk?.berat}</MDTypography>
                  </Grid>
                </Grid>
                
                {/* Komposisi Madu */}
                <Grid container spacing={3} align="left" sx={{ ml: { xs: 0, md: 2 } }}>
                  <Grid item xs={4} md={4}>
                    <MDTypography variant="subtitle2" fontWeight="regular">Komposisi Madu</MDTypography>
                  </Grid>
                  <Grid item xs={1} md={1}>
                    <MDTypography variant="subtitle2" fontWeight="medium">:</MDTypography>
                  </Grid>
                  <Grid item xs={12} md={10} align="center">
                    <TableContainer component={Paper} variant="outlined" sx={{ boxShadow: 'none' }}>
                      <Table>
                        <TableHead sx={{ width: '100%' }}>
                          <TableRow>
                            <TableCell sx={{ width: '50%' }} align="center">
                              <MDTypography variant="body2" fontWeight="regular">ID Panen Madu</MDTypography>
                            </TableCell>
                            <TableCell sx={{ width: '50%' }} align="center">
                            <MDTypography variant="body2" fontWeight="regular">Berat Dipakai</MDTypography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {dataProduk?.listPanen && dataProduk.listPanen.map((panen) => (
                            <TableRow
                              key={panen.id}
                              // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell sx={{ width: '50%' }} align="center">
                                <MDTypography variant="subtitle2" fontWeight="medium">{panen.id}</MDTypography>
                              </TableCell>
                              <TableCell sx={{ width: '50%'}} align="center">
                                <MDTypography variant="subtitle2" fontWeight="medium">{panen.berat}</MDTypography>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </MDBox>
              {/* Buttons */}
              <MDBox p={3} display="flex" justifyContent="center">
                <MDButton variant="gradient" color="secondary" style={{ width: '100px' }} onClick={handleButtonKembali}>Kembali</MDButton>
                <MDButton disabled={dataProduk.status==="ADMIN_APPROVED"} variant="gradient" color="primary" style={{ marginLeft: '10px' }} onClick={handleButtonKonfirmasi}>Konfirmasi</MDButton>

                {dataProduk?.status === "GENERATED" && 
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
                  Apakah Anda yakin untuk melakukan konfirmasi mixing produk?
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
                  Apakah Anda yakin untuk menghapus produk?
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
      }
    </DashboardLayout>
  );
}

export default DetailProduksi;