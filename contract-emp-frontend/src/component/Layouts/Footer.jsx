import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#FFCC00',
        p: 6,
       marginTop: 9
      }}
    >
      <Container maxWidth="lg">
        <Box>
          <Typography align="center" style={{color: '#154295'}}>
          เจ้าของระบบ : แผนกอุปกรณ์และเทคโนโลยีรักษาความปลอดภัย (หอทป-ห.) กองปฏิบัติการรักษาความปลอดภัย (กปป-ห.) ฝ่ายความปลอดภัย (อปภ.) โทร. 64281
            <br />
            พัฒนาโดย กองบริหารระบบงานดิจิทัล (กบด-ห.) ฝ่ายจัดการและพัฒนาระบบดิจิทัล (อจท.) เบอร์ xxx-xxx-xxxx
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;