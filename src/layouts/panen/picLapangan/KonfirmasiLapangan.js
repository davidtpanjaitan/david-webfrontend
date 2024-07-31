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
import { InputAdornment } from "@mui/material";
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
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
import { styled } from '@mui/system';

const StyledSelect = styled(Select)(({ theme }) => ({
  "&.Mui-disabled": {
    color: theme.palette.text.primary,
    backgroundColor: "#f0f2f5",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.divider
    },
  },
  "& .MuiSelect-select.Mui-disabled": {
    color: theme.palette.text.primary, // Warna teks saat disabled
  }
}));

const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  "& .MuiInputBase-root.Mui-disabled": {
    color: theme.palette.text.primary,
    backgroundColor: "#f0f2f5", // Warna background abu-abu
    "& .MuiInputBase-input.Mui-disabled": {
      color: "#495057", // Warna teks saat disabled
    },
    "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.divider, // Menggunakan warna border default
  },
  },
  "& .MuiInputBase-input.Mui-disabled": {
    color: "#495057", // Warna teks ketika disabled
  },
  // "& .MuiOutlinedInput-notchedOutline": {
  //   borderColor: theme.palette.divider, // Menggunakan warna border default
  // },
}));

function KonfirmasiLapangan() {
  const baseUrl = "https://david-test-webapp.azurewebsites.net/api";
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  const [namaLokasi, setNamaLokasi] = useState('');
  const [gambarPanenUrl, setGambarPanenUrl] = useState('');
  const [jenisMadu, setJenisMadu] = useState('');
  const [beratPanen, setBeratPanen] = useState('');
  const [tanggalPanen, setTanggalPanen] = useState('');
  const [status, setStatus] = useState('');
  const [idPetugasPanen, setIdPetugasPanen] = useState('');
  const [namaPetugasPanen, setNamaPetugasPanen] = useState('');

  const approver = JSON.parse(localStorage.getItem("user"));
  // const [idApprover, setIdApprover] = useState('');
  // const [namaApprover, setNamaApprover] = useState('');

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
      .get(`${baseUrl}/panen/${id}`)
      .then((res) => {
        // setFormData(res.data);
        setJenisMadu(res.data.jenisMadu);
        setBeratPanen(res.data.beratPanen);
        setTanggalPanen(res.data.tanggalPanen);
        setIdPetugasPanen(res.data.idPetugasPanen);
        setNamaPetugasPanen(res.data.namaPetugasPanen);
        setGambarPanenUrl(res.data.gambarPanenUrl);
        setStatus(res.data.status);
        setNamaLokasi(res.data.namaLokasi);
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

  const handleButtonKonfirmasi = (e) => {
    e.preventDefault();

    setShowModal(true);
  };

  const confirmSubmit = async (e) => {
    setShowModal(false);
    // setIsLoading(true);

    console.log(approver.id);
    console.log(approver.name);
    try {
      const response = await axios.put(`${baseUrl}/panen/${id}/approve-lokasi`, {
        approve: true,
        idApprover: approver.id,
        namaApprover: approver.name,
      }
      );
      console.log("Data panen berhasil di-approve:", response.data);
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
      <MDBox mt={6} mb={3} component="form" method="post" onSubmit={handleButtonKonfirmasi}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h4" align="center">Konfirmasi Data Panen</MDTypography>
              </MDBox>
              <MDBox pt={2} px={5}>
                <Grid container spacing={3} justifyContent='center'>
                  {/* ID */}
                  <Grid item xs={12} md={9}>
                    <MDInput 
                      disabled
                      label="ID Panen" 
                      value={id} 
                      fullWidth />
                  </Grid>
                  {/* Lokasi */}
                  <Grid item xs={12} md={9}>
                    <MDInput 
                      disabled
                      label="Lokasi Panen" 
                      // value={formData.namaLokasi}
                      value={namaLokasi}
                      fullWidth />
                  </Grid>
                  {/* Berat */}
                  <Grid item xs={12} md={9}>
                    <MDInput 
                      disabled
                      name="beratPanen"
                      type="number"
                      label="Berat (kg)" 
                      // value={formData.beratPanen} 
                      value={beratPanen}
                      onChange={(e) => setBeratPanen(e.target.value)} 
                      fullWidth />
                  </Grid>
                  {/* Jenis Madu */}
                  <Grid item xs={12} md={9}>
                    <FormControl fullWidth>
                      <InputLabel id="jenis-label">Jenis Madu</InputLabel>
                      <StyledSelect
                        disabled
                        labelId="jenis-label"
                        name="jenisMadu"
                        label="Jenis Madu"
                        // value={formData.jenisMadu || ''}
                        value={jenisMadu || ''}
                        onChange={(e) => setJenisMadu(e.target.value)} 
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"A"}>Madu A</MenuItem>
                        <MenuItem value={"B"}>Madu B</MenuItem>
                        <MenuItem value={"C"}>Madu C</MenuItem>
                        <MenuItem value={"D"}>Madu D</MenuItem>
                        <MenuItem value={"E"}>Madu E</MenuItem>
                      </StyledSelect>
                    </FormControl>
                  </Grid>
                  {/* Tanggal Panen */}
                  <Grid item xs={12} md={9}>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                      <StyledDatePicker 
                        disabled
                        label="Tanggal Panen"
                        name="tanggalPanen"
                        // value={dayjs(formData.tanggalPanen)}
                        value={dayjs(tanggalPanen)}
                        onChange={(date) => setTanggalPanen(dayjs(date).format('YYYY-MM-DDTHH:mm:ss'))}
                      />
                    </LocalizationProvider>
                  </FormControl>
                  </Grid>
                  {/* Upload foto */}
                  <Grid item xs={12} md={9} display="grid">
                    <MDTypography id="MDTypography" variant="body2" fontWeight="regular">Foto</MDTypography>
                    {/* <MDInput 
                      disabled
                      type="file"
                      multiple
                      accept="image/*"
                      name="gambarPanen"
                      onChange={(e) => setGambarPanenUrl(e.target.files[0])}
                    /> */}
                    {gambarPanenUrl && (
                    <MDBox style={{ maxWidth: '100%', marginTop: '10px' }}>
                      <img src={gambarPanenUrl} style={{ width: '100%', height: 'auto', maxWidth: '100%' }} />
                    </MDBox>
                    )}
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox p={3} display="flex" justifyContent="center">
                <MDButton variant="gradient" color="secondary" style={{ marginRight: '10px' }} onClick={handleButtonKembali}>Kembali</MDButton>
                <MDButton disabled={status === "PIC_APPROVED"} type="submit" variant="gradient" color="primary" style={{ marginLeft: '10px' }}>Konfirmasi</MDButton>
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
                  Apakah Anda yakin untuk melakukan konfirmasi data panen?
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

export default KonfirmasiLapangan;