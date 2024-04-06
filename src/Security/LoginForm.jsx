import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = React.useState({ email: "", password: "" });

  const handleSubmit = async function (event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const response = await fetch("http://localhost:81/login", {
      method: "POST",
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const test = async function () {
    let response = await fetch("http://localhost:81/test", {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
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
        sm={8}
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
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Logowanie
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
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Hasło"
              type="password"
              id="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Zapamiętaj mnie"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Zaloguj się
            </Button>
            <Grid container>
              <Grid item xs>
                <Button onClick={test}>Zapomniałeś hasła?</Button>
              </Grid>
              <Grid item>
                <Link to="/register">{"Nie masz konta? Zarejestruj się."}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
