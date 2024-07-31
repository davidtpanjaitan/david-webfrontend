import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import dayjs from 'dayjs';

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";
import Icon from "@mui/material/Icon";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper  } from '@mui/material';

import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Material Dashboard 2 React components
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import MDButton from "../../../components/MDButton";
import MDInput from "../../../components/MDInput";

// Material Dashboard 2 React example components
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import Footer from "../../../examples/Footer";
// import TableComponent from './TableComponent';
import QRScannerComponent from './QrScannerComponent';

function IsiDataProduk() {
  const baseUrl = "https://david-test-webapp.azurewebsites.net/api";
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [showModal, setShowModal] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  // const [scannedPanen, setScannedPanen] = useState('');
  const toggleModal = () => setShowModal(!showModal);
  const [errors, setErrors] = useState({});

  const [tanggal,setTanggal] = useState('');
  const [nama, setNama] = useState('');
  const [status, setStatus] = useState('');
  const [listPanen, setListPanen] = useState([]);

  const petugasMixing = JSON.parse(localStorage.getItem("user"));
  const [idPetugasMixing, setIdPetugasMixing] = useState('');
  const [namaPetugasMixing, setNamaPetugasMixing] = useState('');

  const [scannedPanen, setScannedPanen] = useState({
    id: id,
    namaLokasi: '',
    tanggalPanen: '',
    jenisMadu: '',
    berat: 0, 
  });

  // function createData(id, name) {
  //   return { id, name };
  // }
  
  // const [data, setData] = useState([]);


  // const rows = [
  //   createData('123', "MADU ABC"),
  //   createData('456', "MADU CDA"),
  // ];

  // const [formData, setFormData] = useState({
  //   jenisMadu: '',
  //   beratPanen: '',
  //   tanggalPanen: '',
  //   gambarPanenUrl: '',
  //   idPetugasPanen: '',
  //   namaPetugasPanen: '',
  // });

  useEffect(() => {
    axios
      .get(`${baseUrl}/produk/${id}`)
      .then((res) => {
        setTanggal(res.data.tanggal);
        setNama(res.data.nama);
        setIdPetugasMixing(res.data.idPetugasMixing);
        setNamaPetugasMixing(res.data.namaPetugasMixing);
        setStatus(res.data.status);
        setListPanen(res.data.listPanen);
      })
      .catch((err) => console.log(err));
      
  }, []);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name == "tanggalPanen"){
  //     // console.log(value);
  //     setFormData({
  //       ...formData,
  //       [name]: value.format('YYYY-MM-DDTHH:mm:ss'),
  //     });
  //   } 
  //   else {
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   }
  // };

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

  const toggleQRScanner = () => {
    setShowQRScanner(!showQRScanner);
  };

  const handleScan = async (result) => {
    if (result) {

      try {
        const response = await axios.get(`${baseUrl}/panen/${result.text}`);
        
        setScannedPanen(response.data);
        // console.log(scannedPanen);
      } catch (error) {
        console.error('Error:', error);
      }
      
      toggleQRScanner();
      setShowConfirmation(true);
    }
  };

  const handleConfirm = () => {
    console.log(scannedPanen);
    
    setListPanen(prevData => [...prevData, scannedPanen]);
    setShowConfirmation(false);
    setScannedPanen('');
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setScannedPanen('');
  };


  const validateForm = () => {
    const newErrors = {};

    // if (!formData.employeeId.trim()) {
    //   newErrors.employeeId = "Nama lokasi tidak boleh kosong";
    // }

    // if (!formData.username.trim()) {
    //   newErrors.username = "Nama petani tidak boleh kosong";
    // }

    // if (!formData.role.trim()) {
    //   newErrors.role = "Koordinat tidak boleh kosong";
    // }

    // if (!formData.name.trim()) {
    //   newErrors.name = "Nama tidak boleh kosong";
    // }

    // if (!formData.password.trim()) {
    //   newErrors.password = "Lokasi lengkap tidak boleh kosong";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (id, value) => {
    setListPanen(prevData => 
      prevData.map(panen =>
        panen.id === id ? { ...panen, berat: value } : panen
      )
    );
  };

  const confirmSubmit = async (e) => {
    setShowModal(false);
    // setIsLoading(true);
    console.log(nama);
    console.log(idPetugasMixing);
    console.log(namaPetugasMixing);
    console.log(tanggal);
    console.log(listPanen);
    try {
      const response = await axios.put(`${baseUrl}/produk/${id}`, {
        id,
        nama,
        idPetugasMixing,
        namaPetugasMixing,
        tanggal,
        listPanen,
      });
      console.log("Data produk berhasil disimpan:", response.data);
      navigate('/');
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
                <MDTypography variant="h4" align="center">Data Produk</MDTypography>
              </MDBox>
              <MDBox pt={2} px={5}>
                <Grid container spacing={3} justifyContent='center'>
                  {/* ID */}
                  <Grid item xs={12} md={9}>
                    <MDInput 
                      disabled
                      label="ID Produk" 
                      value={id} 
                      fullWidth />
                  </Grid>
                  {/* Nama Produk */}
                  <Grid item xs={12} md={9}>
                    <MDInput 
                      // disabled={status === "PIC_APPROVED"}
                      error={errors.nama}
                      helperText={errors.nama ? "Nama tidak boleh kosong" : ""}
                      name="nama"
                      label="Nama Produk" 
                      // value={formData.beratPanen} 
                      value={nama}
                      onChange={(e) => setNama(e.target.value)} 
                      fullWidth />
                  </Grid>

                  {/* Tanggal Produksi */}
                  <Grid item xs={12} md={9}>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                      <DatePicker 
                        disabled={status === "PIC_APPROVED"}
                        label="Tanggal Produksi"
                        name="tanggal"
                        // value={dayjs(formData.tanggalPanen)}
                        value={dayjs(tanggal)}
                        onChange={(date) => setTanggal(dayjs(date).format('YYYY-MM-DDTHH:mm:ss'))}
                      />
                    </LocalizationProvider>
                  </FormControl>
                  </Grid>

                  {/* Tabel Komposisi Madu */}
                  <Grid item xs={12} md={9}>
                    <MDTypography id="MDTypography" variant="caption">Komposisi Madu</MDTypography>
                    <TableContainer component={Paper} variant="outlined" sx={{ boxShadow: 'none' }}>
                      <Table>
                        {/* <TableHead sx={{ width: '100%' }}> */}
                          <TableRow>
                            <TableCell sx={{ width: '50%' }} align="center">
                              <MDTypography variant="body2" fontWeight="regular">ID Panen Madu</MDTypography>
                            </TableCell>
                            <TableCell sx={{ width: '50%' }} align="center">
                            <MDTypography variant="body2" fontWeight="regular">Berat Dipakai</MDTypography>
                            </TableCell>
                          </TableRow>
                        {/* </TableHead> */}
                        <TableBody>
                          {listPanen.map((panen) => (
                            <TableRow
                              key={panen.id}
                              // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell sx={{ width: '50%' }} align="center">
                                {panen.id}
                              </TableCell>
                              <TableCell sx={{ width: '50%'}} align="center">
                                  <MDInput
                                    fullWidth
                                    label="Berat(kg)"
                                    inputProps={{ style: { maxWidth: '100%' } }}
                                    value={panen.berat || ''}
                                    onChange={(e) => handleInputChange(panen.id, e.target.value)}
                                  />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  {/* Tombol Scan QR */}
                  <Grid item xs={12} md={9}>
                    <MDButton variant="gradient" color="secondary" onClick={toggleQRScanner}>
                      Scan QR
                    </MDButton>
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

        {/* Modal QR Scanner */}
      <Modal open={showQRScanner} onClose={toggleQRScanner} sx={{ display: "grid", placeItems: "center"}}>
        <Slide direction="down" in={showQRScanner} timeout={500}>
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
              <MDTypography variant="h5">QR Scanner</MDTypography>
              <Icon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleQRScanner}>close</Icon> 
            </MDBox>
            <Divider sx={{ my: 0 }} />
            <MDBox p={2} my={3}>
              <QRScannerComponent onScan={handleScan} />
            </MDBox>
          </MDBox>
        </Slide>
      </Modal>

      {/* Modal Confirmation Menambahkan Panen */}
      <Modal open={showConfirmation} onClose={handleCancel} sx={{ display: "grid", placeItems: "center"}}>
        <Slide direction="down" in={showConfirmation} timeout={500}>
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
              <Icon fontSize="medium" sx={{ cursor: "pointer" }} onClick={handleCancel}>close</Icon> 
            </MDBox>
            <Divider sx={{ my: 0 }} />
            <MDBox p={2} my={3}>
              <MDTypography variant="body2" color="secondary" fontWeight="regular" align="center">
                Apakah Anda yakin untuk menambahkan data berikut ke tabel?
              </MDTypography>
              <MDTypography variant="body1" color="primary" fontWeight="medium" align="center" mt={2}>
                ID: {scannedPanen.id}
              </MDTypography>
              <MDTypography variant="body1" color="primary" fontWeight="medium" align="center" mt={2}>
                Lokasi Panen: {scannedPanen.namaLokasi}
              </MDTypography>
              {/* <MDTypography variant="body1" color="primary" fontWeight="medium" align="center" mt={2}>
                Tanggal Panen: {scannedPanen.tanggalPanen}
              </MDTypography> */}
            </MDBox>
            <Divider sx={{ my: 0 }} />
            <MDBox display="flex" justifyContent="space-between" p={1.5}>
              <MDButton variant="gradient" color="secondary" onClick={handleCancel}>
                Batal
              </MDButton>
              <MDButton variant="gradient" color="info" onClick={handleConfirm}>
                Tambahkan 
              </MDButton>
            </MDBox>
          </MDBox>
        </Slide>
      </Modal>

        {/* Modal Confirmation Submit Produk */}
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
                  Apakah Anda yakin untuk membuat produk baru?
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

export default IsiDataProduk;
