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

function IsiDataPanen() {
  const baseUrl = "https://david-test-webapp.azurewebsites.net/api";
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  const [errors, setErrors] = useState({});

  const [namaLokasi, setNamaLokasi] = useState('');
  const [gambar, setGambar] = useState('');
  const [isUploadGambarBaru, setIsUploadGambarBaru] = useState(false);
  const [jenisMadu, setJenisMadu] = useState('');
  const [beratPanen, setBeratPanen] = useState('');
  const [tanggalPanen, setTanggalPanen] = useState('');
  const [status, setStatus] = useState('');

  const petugasPanen = JSON.parse(localStorage.getItem("user"));
  const [idPetugasPanen, setIdPetugasPanen] = useState('');
  const [namaPetugasPanen, setNamaPetugasPanen] = useState('');

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
        setGambar(res.data.gambarPanenUrl);
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

  const handleUploadGambar = (e) => {
    setGambar(e.target.files[0]);
    setIsUploadGambarBaru(true);
  }

  const jsonToFd = async () => {
    const fd = new FormData();
    
    console.log(gambar);
    // console.log(formData);
    console.log(tanggalPanen);

    // fd.append('gambar', gambarPanenUrl);
    // fd.append('jenisMadu', formData.jenisMadu);
    // fd.append('beratPanen', formData.beratPanen);
    // fd.append('tanggalPanen', tanggalPanen);
    // fd.append('idPetugasPanen', petugasPanen.id);
    // fd.append('namaPetugasPanen', petugasPanen.name);
    fd.append('gambar', gambar);
    fd.append('jenisMadu', jenisMadu);
    fd.append('beratPanen', beratPanen);
    fd.append('tanggalPanen', tanggalPanen);
    fd.append('idPetugasPanen', petugasPanen.id);
    fd.append('namaPetugasPanen', petugasPanen.name);

    console.log(fd);
    return fd;
  }

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

  const confirmSubmit = async (e) => {
    setShowModal(false);
    // setIsLoading(true);

    const fd = await jsonToFd();

    try {
      const response = await axios.put(`${baseUrl}/panen/${id}/submit-lokasi`, fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Data panen berhasil disimpan:", response.data);
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
                <MDTypography variant="h4" align="center">Data Panen</MDTypography>
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
                      disabled={status === "PIC_APPROVED"}
                      error={errors.beratPanen}
                      helperText={errors.beratPanen ? "Berat tidak boleh kosong" : ""}
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
                      <Select
                        disabled={status === "PIC_APPROVED"}
                        error={errors.role}
                        // helperText={errors.role ? "Jenis madu belum dipilih" : ""}
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
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* Tanggal Panen */}
                  <Grid item xs={12} md={9}>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                      <DatePicker 
                        disabled={status === "PIC_APPROVED"}
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
                    <MDTypography id="MDTypography" variant="caption">Foto</MDTypography>
                    <MDInput 
                      disabled={status === "PIC_APPROVED"}
                      type="file"
                      multiple
                      accept="image/*"
                      name="gambarPanen"
                      onChange={handleUploadGambar}
                    />
                    {isUploadGambarBaru? (
                      <MDBox style={{ maxWidth: '100%', marginTop: '40px' }} align="center" >
                        <img src={URL.createObjectURL(gambar)} style={{ width: '100%', height: 'auto', maxWidth: '100%' }} />
                      </MDBox>
                    ) : (
                      <MDBox style={{ maxWidth: '100%', marginTop: '40px' }} align="center" >
                        <img src={gambar} style={{ width: '80%', height: 'auto', maxWidth: '100%' }} />
                      </MDBox>
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
                  Apakah Anda yakin untuk menyimpan user baru?
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

export default IsiDataPanen;
