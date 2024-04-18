import React, { useContext } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./styles/App.css";
import Menu from "./Menu/Menu";
import { Box, getContrastRatio, ThemeProvider } from "@mui/material";
import Homepage from "./Homepage/Homepage";
import LoginForm from "./Security/LoginForm";
import RegisterForm from "./Security/RegisterForm";
import Profile from "./User/Profile";
import Generator from "./Generator/Generator";
import { AlertContext } from "./contexts/AlertContext";
import { UserContext } from "./contexts/UserContext";
import axios from "axios";
import { createTheme } from "@mui/material/styles";
import { useQuery } from "react-query";

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

const fullPageStyle = {
  height: "100vh",
  maxHeight: "100vh",
  backgroundColor: "#f5f5dc",
};

const host = process.env.REACT_APP_API_URL;

const fetchUser = async () => {
  const res = await axios.get(host + "/current-user");
  if (res.data.status === "success") {
    return res.data.user;
  } else {
    throw new Error("Sesja wygasła. Zaloguj się ponownie.");
  }
};

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAlert } = useContext(AlertContext);
  const { setUser } = useContext(UserContext);

  const isFullPage = location.pathname === "/generate";
  const viewMenu = location.pathname !== "/generate";

  const {
    data: user,
    isLoading,
    error,
  } = useQuery("user", fetchUser, {
    retry: false,
    onSuccess: (data) => {
      setUser({
        isLoggedIn: true,
        ...data,
      });
    },
    onError: () => {
      setUser({
        isLoggedIn: false,
        name: "",
        surname: "",
        email: "",
        roles: [],
      });

      setAlert({
        title: "Błąd",
        text: "Sesja wygasła. Zaloguj się ponownie.",
        icon: "error",
      });

      navigate("/login");
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {viewMenu && <Menu />}
      <Box sx={isFullPage ? fullPageStyle : {}}>
        {!isLoading && (
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/generate" element={<Generator />} />
          </Routes>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default App;
