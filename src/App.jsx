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

const fullPageStyle = {
  height: "100vh",
  maxHeight: "100vh",
  backgroundColor: "#f5f5dc",
};

const App = () => {
  const { pathname } = useLocation();
  const isFullPage = pathname === "/generate";
  const viewMenu = pathname !== "/generate";

  return (
    <>
      {viewMenu && <Menu />}
      <Box sx={isFullPage ? fullPageStyle : {}}>
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
