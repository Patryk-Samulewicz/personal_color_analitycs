import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// eslint-disable-next-line no-undef
const eyeDropper = new EyeDropper();
const pickTips = {
  start: "Kliknij na lewo na kolor który chcesz wybrać.",
  skin: "Wybierz teraz kolor skóry.",
  hair: "Wybierz teraz kolor włosów.",
  eye: "Wybierz teraz kolor oczu.",
  end: 'Jeśli skończyłeś, kliknij pod zdjęciem "Przejdź dalej".',
};

const MAX_ZOOM = 2;
const MIN_ZOOM = 0.5;

const colors = {
  skin: null,
  hair: null,
  eye: null,
};

const StepTwo = ({ setStep, file, setFile }) => {
  const [currentTip, setCurrentTip] = useState(pickTips.start);
  const [colorsPicked, setColorsPicked] = useState(colors);
  const [zoom, setZoom] = useState(1);

  const backToStepOne = () => {
    setFile(null);
    setStep(0);
  };

  const isCanGoNext = () => {
    return colorsPicked.skin && colorsPicked.hair && colorsPicked.eye;
  };

  const zooming = (e) => {
    if (e.deltaY < 0 && zoom < MAX_ZOOM) {
      setZoom(zoom + 0.1);
    } else if (e.deltaY > 0 && zoom > MIN_ZOOM) {
      setZoom(zoom - 0.1);
    }
  };

  const startPicking = (color) => {
    return () => {
      setCurrentTip(pickTips[color]);

      eyeDropper.open().then((colorPick) => {
        setColorsPicked((prev) => ({
          ...prev,
          [color]: colorPick.sRGBHex,
        }));

        setCurrentTip(pickTips.end);
      });
    };
  };

  return (
    <Box>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          paddingTop="2rem"
        >
          <Grid item md={12} xs={12} alignItems="center">
            <Typography variant="h4" gutterBottom align="center">
              Zaznacz kolory na zdjęciu.
            </Typography>
            <Typography variant="body1" align="center">
              {currentTip}
            </Typography>
          </Grid>

          <Grid
            item
            md={2}
            xs={12}
            marginTop={{
              xs: "1rem",
              md: "0",
            }}
          >
            <Stack spacing={2} direction={{ xs: "row", md: "column" }}>
              <Paper
                elevation={12}
                className="color-pickers"
                onClick={startPicking("skin")}
              >
                <Typography variant="h6" gutterBottom align="center">
                  Kolor skóry
                </Typography>
                <Typography
                  sx={{
                    backgroundColor: colorsPicked.skin,
                  }}
                >
                  {colorsPicked.skin ? null : "Kliknij tutaj, aby wybrać"}
                </Typography>
              </Paper>
              <Paper
                elevation={12}
                className="color-pickers"
                onClick={startPicking("hair")}
              >
                <Typography variant="h6" gutterBottom align="center">
                  Kolor włosów
                </Typography>
                <Typography
                  sx={{
                    backgroundColor: colorsPicked.hair,
                  }}
                >
                  {colorsPicked.hair ? null : "Kliknij tutaj, aby wybrać"}
                </Typography>
              </Paper>
              <Paper
                elevation={12}
                className="color-pickers"
                onClick={startPicking("eye")}
              >
                <Typography variant="h6" gutterBottom align="center">
                  Kolor oczu
                </Typography>
                <Typography
                  sx={{
                    backgroundColor: colorsPicked.eye,
                  }}
                >
                  {colorsPicked.eye ? null : "Kliknij tutaj, aby wybrać"}
                </Typography>
              </Paper>
            </Stack>
          </Grid>
          <Grid
            item
            component={Paper}
            elevation={24}
            md={9}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              maxWidth: "100%",
              maxHeight: "100%",
              overflow: "hidden",
              margin: "2rem",
            }}
            onWheel={zooming}
          >
            <Box
              component="img"
              sx={{
                maxWidth: "100%",
                maxHeight: "100%",
                transform: `scale(${zoom})`,
              }}
              src={URL.createObjectURL(file)}
              alt=""
            />
          </Grid>
          <Grid
            container
            md={12}
            justifyContent="space-evenly"
            marginTop="1rem"
          >
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={backToStepOne}
            >
              Wybierz inne zdjęcie
            </Button>

            <Tooltip
              title={isCanGoNext() ? "" : "Najpierw wybierz wszystkie kolory."}
              arrow
              placement="top"
            >
              <span>
                <Button
                  variant="outlined"
                  endIcon={<ArrowForwardIcon />}
                  disabled={!isCanGoNext()}
                >
                  Przejdź dalej
                </Button>
              </span>
            </Tooltip>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default StepTwo;
