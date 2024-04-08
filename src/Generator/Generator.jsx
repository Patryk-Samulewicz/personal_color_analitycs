import React, { useState } from "react";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

const Generator = () => {
  const steps = ["Krok 1", "Krok 2", "Krok 3"];
  const [step, setStep] = useState(0);
  const [file, setFile] = useState(null);

  return (
    <Box>
      <Stepper
        activeStep={step}
        alternativeLabel
        sx={{
          paddingTop: "2rem",
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {step === 0 && (
        <StepOne setStep={setStep} file={file} setFile={setFile} />
      )}
      {step === 1 && (
        <StepTwo setStep={setStep} file={file} setFile={setFile} />
      )}
    </Box>
  );
};

export default Generator;
