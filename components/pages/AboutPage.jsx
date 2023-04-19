"use client"
import { Container, Typography, Box, Grid } from "@mui/material";
import Image from "next/image";

const AboutPage = () => {
  return (
    <Box minHeight="90vh" marginTop="40px" component="section">
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" component="h2" color="secondary">
              درباره کافی شاپ آقا امین
            </Typography>
            <Typography
              variant="h6"
              component="p"
              color="primary"
              lineHeight="2.5"
              sx={{ textAlign: "justify", marginTop: "1.5rem" }}
            >
              کافه آقا امین از سال 1310 شروع به فعالیت نمود . اکنون بعد از گذشت سال
              ها هنوز به جایگاه و موقعیتی که باید داشته باشد ، نرسیده است. اما ما
              همچنان به کار خود ادامه می دهیم و مفتخریم که می توانیم از شما پذیرایی
              کنیم . منتظر حضور پرشور شما هستیم
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box width="100%" height="400px" position="relative">
              <Image src="/images/coffee.svg" fill alt="about us" priority={true}/>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutPage;