import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Animated } from "../utilities/Animated";
import { Link } from "react-router-dom";
import landingImgUrl from "../assets/landing_foto.jpg";

const Homepage = () => {
  return (
    <Animated>
      <Box
        className="homepageGradient"
        sx={{
          minHeight: "65vh",
        }}
      >
        <Container>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            flexDirection={{ xs: "column", md: "row" }}
            sx={{ paddingTop: "10rem" }}
          >
            <Grid item md={6} xs={0}></Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="h2" gutterBottom className="homepageHeader">
                Twoja analiza kolorystyczna
              </Typography>
              <Typography variant="h4" gutterBottom className="homepageHeader">
                Zdobądź swój kolor za darmo!
              </Typography>
              <Typography gutterBottom className="homepageHeader">
                Celem analizy kolorystycznej jest określenie, które kolory
                najlepiej pasują do Ciebie i Twojej urody. Dzięki temu dowiesz
                się, jakie kolory ubrań, makijażu i dodatków będą dla Ciebie
                idealne.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box>
        <Container sx={{ paddingTop: "5rem", paddingBottom: "2rem" }}>
          <Grid
            container
            justifyContent="space-between"
            sx={{ textAlign: "center" }}
          >
            <Grid item md={4} xs={4}>
              <Typography variant="h4" gutterBottom>
                Krok 1
              </Typography>
            </Grid>
            <Grid item md={4} xs={4}>
              <Typography variant="h4" gutterBottom>
                Krok 2
              </Typography>
            </Grid>
            <Grid item md={4} xs={4}>
              <Typography variant="h4" gutterBottom>
                Krok 3
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="space-between"
            sx={{ textAlign: "center" }}
          >
            <Grid item md={4} xs={4}>
              <Typography variant="body1">
                <UploadIcon
                  sx={{
                    fontSize: "4rem",
                  }}
                />
              </Typography>
            </Grid>
            <Grid item md={4} xs={4}>
              <Typography variant="body1">
                <FaceRetouchingNaturalIcon
                  sx={{
                    fontSize: "4rem",
                  }}
                />
              </Typography>
            </Grid>
            <Grid item md={4} xs={4}>
              <Typography variant="body1">
                <CheckCircleIcon
                  sx={{
                    fontSize: "4rem",
                  }}
                />
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="space-between"
            sx={{ textAlign: "center" }}
          >
            <Grid item md={4} xs={4}>
              <Typography variant="body1" paragraph className="v-center">
                Wyślij zdjęcie
              </Typography>
            </Grid>
            <Grid item md={4} xs={4}>
              <Typography variant="body1" paragraph className="v-center">
                Zaznacz na nim kluczowe elementy: <b>Skórę, Włosy i Oczy</b>
              </Typography>
            </Grid>
            <Grid item md={4} xs={4}>
              <Typography variant="body1" paragraph className="v-center">
                Gotowe! <br /> Spersonalizowane AI dobierze specjalnie dla
                Ciebie paletę kolorów
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" sx={{ paddingTop: "2rem" }}>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                size="large"
                component={Link}
                to={"/register"}
              >
                Zacznij już teraz
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        sx={{
          backgroundColor: "#f5f5dc",
        }}
      >
        <Container>
          <Grid container paddingY="5rem">
            <Grid item md={6} xs={12}>
              <Typography variant="h2" gutterBottom>
                Dlaczego warto?
              </Typography>
              <Typography variant="body1" paragraph>
                Analiza kolorystyczna u specjalistów potrafi kosztować od 600 zł
                do nawet <b>1000 zł</b>. Z naszą aplikacją zrobisz to{" "}
                <b>za darmo</b>! <br />
                Ponadto przestaniesz marnować czas na przymierzanie i
                wyszukiwanie ubrań, które nie są dopasowane do Twojej urody.{" "}
                <br />
              </Typography>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              sx={{
                maxHeight: "40vh",
                maxWidth: "100%",
              }}
            >
              <Box
                component="img"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                src={landingImgUrl}
                alt="AI color pallete image"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Animated>
  );
};

export default Homepage;
