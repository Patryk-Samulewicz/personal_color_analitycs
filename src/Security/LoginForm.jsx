import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { Animated } from "../utilities/Animated";

const host = process.env.REACT_APP_API_URL;

const LoginForm = () => {
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isLoggedIn) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async function (event) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const form = new FormData(event.target);
    try {
      const response = await axios.post(host + "/login", form);

      if (response.data.token) {
        setUser({
          isLoggedIn: true,
          ...response.data.user,
        });

        navigate("/");
      }
    } catch (error) {
      setError("Nieprawidłowe dane logowania.");
    }

    setIsLoading(false);
  };

  return (
    <Animated>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={false}
          md={7}
          sx={{
            backgroundImage: "url(https://random.imagecdn.app/1920/1080)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          elevation={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              px: 3,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Logowanie
            </Typography>
            <Typography color="error" marginTop="2rem">
              {error}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Adres Email"
                name="email"
                autoComplete="email"
                error={!!error}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="plainPassword"
                label="Hasło"
                type="password"
                id="plainPassword"
                error={!!error}
              />
              <FormControlLabel
                control={
                  <Checkbox color="primary" name="_remember_me" value="true" />
                }
                label="Zapamiętaj mnie"
              />
              <Box sx={{ m: 1, position: "relative" }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isLoading}
                >
                  Zaloguj się
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
              <Grid container>
                <Grid item xs>
                  <Button>Zapomniałeś hasła?</Button>
                </Grid>
                <Grid item>
                  <Button component={Link} to="/register">
                    Nie masz konta? Zarejestruj się.
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Animated>
  );
};

export default LoginForm;
