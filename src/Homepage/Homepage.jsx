import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Homepage = () => {
  return (
    <>
      <Box
        className="homepageGradient"
        sx={{
          height: "65vh",
        }}
      >
        <Container>
          <Grid container justifyContent="center" sx={{ paddingTop: "10rem" }}>
            <Grid item md={6}></Grid>
            <Grid item md={6}>
              <Typography
                variant="h1"
                gutterBottom
                sx={{
                  color: "white",
                  textShadow: "2px 2px 4px #000000",
                }}
              >
                Twoja analiza kolorystyczna
              </Typography>
              <Typography
                variant="h4"
                paragraph
                sx={{
                  color: "white",
                  textShadow: "2px 2px 4px #000000",
                }}
              >
                Zdobądź swój kolor za darmo!
              </Typography>
              <Typography
                paragraph
                sx={{
                  color: "white",
                  textShadow: "2px 2px 4px #000000",
                }}
              >
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
        <Container sx={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
          <Grid container justifyContent="center" sx={{ textAlign: "center" }}>
            <Grid item md={4}>
              <Typography variant="h4" gutterBottom>
                Krok 1
              </Typography>
            </Grid>
            <Grid item md={4}>
              <Typography variant="h4" gutterBottom>
                Krok 2
              </Typography>
            </Grid>
            <Grid item md={4}>
              <Typography variant="h4" gutterBottom>
                Krok 3
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" sx={{ textAlign: "center" }}>
            <Grid
              item
              md={4}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Typography variant="body1" paragraph>
                Wyślij zdjęcie
              </Typography>
            </Grid>
            <Grid
              item
              md={4}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Typography variant="body1" paragraph>
                Zaznacz na nim kluczowe elementy:
                <br />
                <b>Skórę, Włosy i Oczy</b>
              </Typography>
            </Grid>
            <Grid
              item
              md={4}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Typography variant="body1" paragraph>
                Gotowe! <br /> Spersonalizowane AI dobierze specjalnie dla
                Ciebie paletę kolorów
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" sx={{ textAlign: "center" }}>
            <Grid item md={4}>
              <Typography variant="body1" paragraph>
                <UploadIcon
                  sx={{
                    fontSize: "4rem",
                  }}
                />
              </Typography>
            </Grid>
            <Grid item md={4}>
              <Typography variant="body1" paragraph>
                <FaceRetouchingNaturalIcon
                  sx={{
                    fontSize: "4rem",
                  }}
                />
              </Typography>
            </Grid>
            <Grid item md={4}>
              <Typography variant="body1" paragraph>
                <CheckCircleIcon
                  sx={{
                    fontSize: "4rem",
                  }}
                />
              </Typography>
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
          <Grid
            container
            sx={{ paddingTop: "5rem", paddingBottom: "5rem", height: "60vh" }}
          >
            <Grid
              item
              md={6}
              sx={{
                padding: "2rem",
              }}
            >
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
              sx={{
                backgroundImage: "url(assets/landing_foto.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "100%",
              }}
            ></Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Homepage;
