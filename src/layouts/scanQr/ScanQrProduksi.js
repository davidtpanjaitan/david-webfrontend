import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import QrScanner from 'react-qr-scanner';
import "./QrStyles.css";
import QrFrame from "./qr-frame.svg";

import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";

function ScanQrProduksi() {
    const navigate = useNavigate();
    const [scanning, setScanning] = useState(false);
    const [result, setResult] = useState('No result');

    const user = JSON.parse(localStorage.getItem("user"));

    const handleScan = useCallback((data) => {
      if (data) {
          console.log(data);
          setResult(data);

          if (user.role === "petugasProduksi"){
            navigate(`/produksi/${data.text}/isi-data`)
          } else {
            navigate(`/produksi/${data.text}`)
          }

          setScanning(false);
      }
  }, [navigate]);

  const handleError = useCallback((err) => {
      console.error(err);
  }, []);
  
    const previewStyle = {
      // height: 240,
      // width: 320,
      width: '100%',
      position: 'relative'
    };

    // useEffect(() => {
    //     const html5QrCodeScanner = new Html5QrcodeScanner(
    //       "reader",
    //       { fps: 10, qrbox: 250 },
    //       false
    //     );
    
    //     const onScanSuccess = (decodedText) => {
    //       // Redirect to the detail page with the scanned QR code data
    //       navigate(`/produksi/${decodedText}/isi-data`);
    //       html5QrCodeScanner.clear();
    //     };
    
    //     const onScanFailure = (error) => {
    //       console.warn(`QR code scan error: ${error}`);
    //     };
    
    //     html5QrCodeScanner.render(onScanSuccess, onScanFailure);
    
    //     return () => {
    //       html5QrCodeScanner.clear();
    //     };
    //   }, []);

    return(
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox mt={3} mb={3}>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} lg={8}>
                  <Card>
                    <MDBox p={3} align="center">
                        <MDTypography variant="h4">Scan QR Panen</MDTypography>
                    </MDBox>
                      {!scanning ? (
                        <MDBox align="center" mt={5} mb={2}>
                          <MDButton variant="gradient" color="primary" onClick={() => setScanning(true)}>Start</MDButton>
                        </MDBox>
                      ) : (
                        <MDBox pt={2} px={5}>
                          <Grid container spacing={3} align='center'>
                            <Grid item xs={12} md={12}>
                              <QrScanner
                                delay={300}
                                style={previewStyle}
                                onError={handleError}
                                onScan={handleScan}
                              />
                              <img 
                                src={QrFrame} 
                                alt="Qr Frame" 
                                className="scan-box-overlay"
                              />
                            </Grid>
                            <Grid item xs={12} md={12} mb={2}>
                              <MDButton variant="gradient" color="error" onClick={() => setScanning(false)}>Stop</MDButton>
                            </Grid>
                          
                          </Grid>
                        </MDBox>
                      )}   
                  </Card>
                </Grid> 
              </Grid>
            
            
            </MDBox>
            

            
        </DashboardLayout>
    )
}

export default ScanQrProduksi;