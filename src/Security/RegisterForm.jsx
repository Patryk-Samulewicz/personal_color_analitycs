import React from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AlertContext } from "../contexts/AlertContext";
import { UserContext } from "../contexts/UserContext";
import { Animated } from "../utilities/Animated";

const host = process.env.REACT_APP_API_URL;

const RegisterForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [validationErrors, setValidationErrors] = React.useState(null);
  const [serverError, setServerError] = React.useState(null);
  const navigate = useNavigate();
  const { setAlert } = React.useContext(AlertContext);
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    if (user.isLoggedIn) {
      navigate("/");
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setValidationErrors(null);
    setServerError(null);
    setIsLoading(true);
    const form = new FormData(event.target);
    try {
      const response = await axios.post(host + "/register", form);

      if (response.data.status === "success") {
        setAlert({
          title: "Sukces",
          text: "Konto zostało utworzone. Możesz się zalogować.",
          icon: "success",
        });
        navigate("/login");
      }
    } catch (error) {
      if (error.response.data.status === "error") {
        if (error.response.data.errors) {
          setValidationErrors(error.response.data.errors);
        } else if (error.response.data.message) {
          setServerError(error.response.data.message);
        } else {
          setServerError("Wystąpił błąd serwera. Spróbuj ponownie później.");
        }
      } else {
        setServerError("Wystąpił błąd serwera. Spróbuj ponownie później.");
      }
    }

    setIsLoading(false);
  }

  return (
    <Animated>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: "10rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Zarejestruj się
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Imię"
                  error={!!validationErrors?.name}
                  helperText={
                    validationErrors && validationErrors.name
                      ? validationErrors.name
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="surname"
                  label="Nazwisko"
                  name="surname"
                  autoComplete="surname"
                  error={!!validationErrors?.surname}
                  helperText={
                    validationErrors && validationErrors.surname
                      ? validationErrors.surname
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Adres e-mail"
                  name="email"
                  autoComplete="email"
                  error={!!validationErrors?.email}
                  helperText={
                    validationErrors && validationErrors.email
                      ? validationErrors.email
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Numer telefonu"
                  id="phone"
                  name="phone"
                  error={!!validationErrors?.phone}
                  helperText={
                    validationErrors && validationErrors.phone
                      ? validationErrors.phone
                      : null
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+48</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="plainPassword"
                  label="Hasło"
                  type="password"
                  id="plainPassword"
                  autoComplete="new-password"
                  error={!!validationErrors?.plainPassword}
                  helperText={
                    validationErrors && validationErrors.plainPassword
                      ? validationErrors.plainPassword
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  required
                  error={!!validationErrors?.rules}
                  variant="standard"
                >
                  <FormControlLabel
                    required
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="Akceptuję regulamin"
                    name="rules"
                  />
                  <FormHelperText>
                    {validationErrors && validationErrors.rules
                      ? validationErrors.rules
                      : null}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {serverError && (
                  <Typography variant="h6" color="error" textAlign="center">
                    {serverError}
                  </Typography>
                )}
              </Grid>
            </Grid>

            <Box sx={{ m: 1, position: "relative" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                Zarejestruj się
              </Button>
              {isLoading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Box>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Masz już konto? Zaloguj się.</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Animated>
  );
};

export default RegisterForm;
