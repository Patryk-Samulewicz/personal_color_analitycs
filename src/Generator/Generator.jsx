import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { AlertContext } from "../contexts/AlertContext";
import { useNavigate } from "react-router-dom";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { Animated } from "../utilities/Animated";

const Generator = () => {
  const steps = ["Krok 1", "Krok 2", "Krok 3"];
  const [step, setStep] = useState(0);
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  const { setAlert } = React.useContext(AlertContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isLoggedIn) {
      setAlert({
        title: "Błąd",
        text: "Aby korzystać z generatora, musisz być zalogowany.",
        icon: "error",
      });

      navigate("/login");
    }
  }, [navigate, setAlert, user.isLoggedIn]);

  return (
    <Animated>
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
    </Animated>
  );
};

export default Generator;
