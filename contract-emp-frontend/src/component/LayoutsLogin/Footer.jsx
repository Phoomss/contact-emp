import React from 'react';
import { Box, Container, Typography, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles'; // Import ThemeProvider and createTheme

const theme = createTheme(); // Create a theme

const Footer = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        component="footer"
        sx={{
          backgroundColor: '#154295',
          p: 1,
          bottom: 0,
          position: 'absolute',
          width: '100%',
        
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: 'center',
              display: 'flex',
            }}
          >
            <Typography align="left" style={{ color: '#ffff' }}>
              เจ้าของระบบ : แผนกอุปกรณ์และเทคโนโลยีรักษาความปลอดภัย (หอทป-ห.) กองปฏิบัติการรักษาความปลอดภัย (กปป-ห.) ฝ่ายความปลอดภัย (อปภ.) โทร. 64281
              <br />
              พัฒนาโดย กองบริหารระบบงานดิจิทัล (กบด-ห.) ฝ่ายจัดการและพัฒนาระบบดิจิทัล (อจท.) เบอร์ 64454
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;



