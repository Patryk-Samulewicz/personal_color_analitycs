import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// eslint-disable-next-line no-undef
const eyeDropper = new EyeDropper();
const pickTips = {
  start: "Wybierz każdy z trzech kolorów.",
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

        if (isCanGoNext()) {
          setCurrentTip(pickTips.end);
        } else {
          setCurrentTip(pickTips.start);
        }
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
          paddingTop="1rem"
          paddingBottom="1rem"
        >
          <Grid item md={12} xs={12} alignItems="center">
            <Typography variant="h5" gutterBottom align="center">
              Zaznacz kolory na zdjęciu.
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{
                fontSize: "0.9rem",
              }}
            >
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
            <Stack
              spacing={2}
              direction={{ xs: "row", md: "column" }}
              justifyContent="center"
            >
              <Paper
                elevation={12}
                className="color-pickers"
                onClick={startPicking("skin")}
              >
                <Typography variant="subtitle2">Kolor&nbsp;skóry</Typography>
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
                <Typography variant="subtitle2">Kolor&nbsp;włosów</Typography>
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
                <Typography variant="subtitle2">Kolor&nbsp;oczu</Typography>
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
          <Grid container md={12} justifyContent="space-evenly" gap={1}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={backToStepOne}
            >
              Wybierz inne zdjęcie
            </Button>
            <Button
              variant="outlined"
              endIcon={<ArrowForwardIcon />}
              disabled={!isCanGoNext()}
            >
              Przejdź dalej
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default StepTwo;
