import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./styles/App.css";
import Menu from "./Menu/Menu";
import { Box, getContrastRatio, ThemeProvider } from "@mui/material";
import Homepage from "./Homepage/Homepage";
import LoginForm from "./Security/LoginForm";
import RegisterForm from "./Security/RegisterForm";
import Profile from "./User/Profile";
import Generator from "./Generator/Generator";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1e3d5b",
      light: "#4f648d",
      dark: "#00132c",
      contrastText:
        getContrastRatio("#1e3d5b", "#ffffff") >= 3 ? "#ffffff" : "#000000",
    },
    secondary: {
      main: "#faad96",
      light: "#ffddc1",
      dark: "#c97b63",
      contrastText:
        getContrastRatio("#faad96", "#ffffff") >= 3 ? "#ffffff" : "#000000",
    },
  },
});

const App = () => {
  const location = useLocation();
  const viewMenu = location.pathname !== "/generate";

  return (
    <ThemeProvider theme={theme}>
      {viewMenu && <Menu />}
      <Box>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/generate" element={<Generator />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
};

export default App;
