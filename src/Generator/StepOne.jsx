import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

const StepOne = () => {
  return (
    <Box>
      <Container>
        <Grid>
          <Grid
            item
            md={12}
            alignItems="center"
            sx={{
              paddingTop: "4rem",
            }}
          >
            <Typography variant="h4" gutterBottom align="center">
              Wgraj swoje zdjęcie
            </Typography>
            <Typography variant="body1" align="center">
              Kliknij w przycisk poniżej, aby wgrać swoje zdjęcie.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default StepOne;
