import React, { useState, useEffect } from "react";
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
import { EyeDropper } from "react-eyedrop";
import Canvas from "./Canvas";

const pickTips = {
  start: "Wybierz każdy z trzech kolorów.",
  skin: "Wybierz teraz kolor skóry.",
  hair: "Wybierz teraz kolor włosów.",
  eye: "Wybierz teraz kolor oczu.",
  missing: "Wybierz brakujące kolory.",
  end: 'Jeśli skończyłeś, kliknij pod zdjęciem "Przejdź dalej".',
};

const StepTwo = ({ setStep, file, setFile }) => {
  const colorsToPick = {
    skin: null,
    hair: null,
    eye: null,
  };

  const [currentTip, setCurrentTip] = useState(pickTips.start);
  const [colorsPicked, setColorsPicked] = useState(colorsToPick);

  const handleSkinColor = ({ rgb }) => {
    setColorsPicked({ ...colorsPicked, skin: rgb });
  };

  const handleHairColor = ({ rgb }) => {
    setColorsPicked({ ...colorsPicked, hair: rgb });
  };

  const handleEyeColor = ({ rgb }) => {
    setColorsPicked({ ...colorsPicked, eye: rgb });
  };

  const backToStepOne = () => {
    setFile(null);
    setStep(0);
  };

  const isCanGoNext = () => {
    return colorsPicked.skin && colorsPicked.hair && colorsPicked.eye;
  };

  useEffect(() => {
    if (isCanGoNext()) {
      setCurrentTip(pickTips.end);
      return;
    }

    setCurrentTip(pickTips.missing);
  }, [colorsPicked]);

  const skinButton = ({ onClick }) => {
    return (
      <Paper
        elevation={12}
        className={
          currentTip === pickTips.skin
            ? "color-pickers active"
            : "color-pickers"
        }
        onClick={onClick}
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
    );
  };

  const hairButton = ({ onClick }) => {
    return (
      <Paper
        elevation={12}
        className={
          currentTip === pickTips.hair
            ? "color-pickers active"
            : "color-pickers"
        }
        onClick={onClick}
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
    );
  };

  const eyeButton = ({ onClick }) => {
    return (
      <Paper
        elevation={12}
        className={
          currentTip === pickTips.eye ? "color-pickers active" : "color-pickers"
        }
        onClick={onClick}
        id="eye-picker"
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
    );
  };

  return (
    <Box>
      <Container>
        <Grid
          container
          justifyContent="space-evenly"
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
            xs={11}
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
              <EyeDropper
                onChange={handleSkinColor}
                customComponent={skinButton}
                onPickStart={() => setCurrentTip(pickTips.skin)}
                cursorActive="crosshair"
              />
              <EyeDropper
                onChange={handleHairColor}
                customComponent={hairButton}
                onPickStart={() => setCurrentTip(pickTips.hair)}
                cursorActive="crosshair"
              />
              <EyeDropper
                onChange={handleEyeColor}
                customComponent={eyeButton}
                onPickStart={() => setCurrentTip(pickTips.eye)}
                cursorActive="crosshair"
              />
            </Stack>
          </Grid>
          <Grid item md={10} xs={12}>
            <Canvas file={file} />
          </Grid>
          <Grid item container md={12} justifyContent="space-evenly" gap={1}>
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
