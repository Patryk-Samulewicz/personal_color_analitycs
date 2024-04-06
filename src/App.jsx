import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./styles/App.css";
import Menu from "./Menu/Menu";
import { Box } from "@mui/material";
import Homepage from "./Homepage/Homepage";
import LoginForm from "./Security/LoginForm";
import RegisterForm from "./Security/RegisterForm";
import Profile from "./User/Profile";
import Generator from "./Generator/Generator";

const App = () => {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== "/generate" && <Menu />}
      <Box>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/generate" element={<Generator />} />
        </Routes>
      </Box>
    </>
  );
};

export default App;
