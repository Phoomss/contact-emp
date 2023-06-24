import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#FFCC00',
        p: 1,
      }}
    >
      <Container maxWidth="lg">
        <Box>
          <Typography align="lift" style={{color: '#154295'}}>
          เจ้าของระบบ : แผนกอุปกรณ์และเทคโนโลยีรักษาความปลอดภัย (หอทป-ห.) กองปฏิบัติการรักษาความปลอดภัย (กปป-ห.) ฝ่ายความปลอดภัย (อปภ.) โทร. 64281
            <br />
            พัฒนาโดย กองบริหารระบบงานดิจิทัล (กบด-ห.) ฝ่ายจัดการและพัฒนาระบบดิจิทัล (อจท.) เบอร์ 6642
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;