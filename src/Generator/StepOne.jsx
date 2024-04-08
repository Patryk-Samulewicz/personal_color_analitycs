import React, { useMemo } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

const baseStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "2rem",
  height: "50vh",
  width: "100%",
  padding: "2rem",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const StepOne = ({ setStep, file, setFile }) => {
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragActive,
    isDragReject,
  } = useDropzone({
    accept: { "image/*": [".jpeg", ".png"] },
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      setStep(1);
    },
    maxFiles: 1,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <Box>
      <Container>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          paddingTop="2rem"
        >
          <Grid item>
            <Typography variant="h4" gutterBottom align="center">
              Wgraj swoje zdjęcie
            </Typography>
            <Typography variant="body1" align="center">
              Kliknij w przycisk poniżej, aby wgrać swoje zdjęcie.
            </Typography>
          </Grid>
          <Grid item {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <p>
              {isDragActive
                ? "Upuść plik tutaj..."
                : "Przeciągnij i upuść plik tutaj, lub kliknij aby wybrać plik"}
            </p>
          </Grid>
          <Grid item marginTop="2rem">
            <Link to="/">
              <Button variant="outlined" startIcon={<ArrowBackIcon />}>
                Powrót na stronę główną
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default StepOne;
