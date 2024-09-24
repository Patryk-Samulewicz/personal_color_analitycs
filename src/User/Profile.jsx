import React, { useContext, useState } from "react";
import { Paper, Container, Grid, Button } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { TabContext } from "@mui/lab";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PaletteIcon from "@mui/icons-material/Palette";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import { Animated } from "../utilities/Animated";
import axios from "axios";
import { AlertContext } from "../contexts/AlertContext";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const TabItem = styled(Tab)(({ theme }) => ({
  textTransform: "initial",
  margin: theme.spacing(0, 2),
  minWidth: 0,
  fontWeight: "normal",
  letterSpacing: 0.5,
  color: "#fff",
  borderRadius: "8px",
  [`&.${tabClasses.selected}`]: {
    color: "#fff",
  },
  [theme.breakpoints.up("md")]: {
    minWidth: 0,
  },
}));

const host = process.env.REACT_APP_API_URL;

const Profile = () => {
  const [currentTab, setCurrentTab] = useState("0");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { setAlert } = useContext(AlertContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (event, newTab) => {
    setCurrentTab(newTab);
  };

  const logout = async () => {
    setIsLoggingOut(true);
    const res = await axios.get(host + "/logout");
    if (res.data.status === "success") {
      setAlert({
        title: "Sukces",
        text: "Zostałeś wylogowany.",
        icon: "success",
      });
      setUser({
        isLoggedIn: false,
      });
      navigate("/");
    } else {
      setAlert({
        title: "Błąd",
        text: "Wystąpił błąd spróbuj ponownie.",
        icon: "error",
      });
    }
    setIsLoggingOut(false);
  };

  return (
    <Animated>
      <Container
        component="main"
        maxWidth="false"
        sx={{
          marginTop: "10rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container>
          <TabContext value={currentTab}>
            <Grid item md={2} p={2}>
              <Tabs
                value={currentTab}
                onChange={handleChange}
                orientation="vertical"
                variant="scrollable"
                sx={{
                  width: "100%",
                  borderRadius: "8px",
                  background: "linear-gradient(180deg, #1e3d5b, #faad96)",
                  padding: "10px",
                  boxShadow: "0px 3px 15px rgba(34, 35, 58, 0.5)",
                  [`& .${tabsClasses.indicator}`]: {
                    width: "100%",
                    borderRadius: "8px",
                    backgroundColor: "rgba(255, 255, 255, .2)",
                  },
                }}
              >
                <TabItem
                  disableRipple
                  label="Twoje dane"
                  value="0"
                  icon={<AccountBoxIcon />}
                  iconPosition="start"
                />
                <TabItem
                  disableRipple
                  label="Twoje analizy"
                  value="1"
                  icon={<PaletteIcon />}
                  iconPosition="start"
                />
                <TabItem
                  disableRipple
                  label="Ustawienia"
                  value="2"
                  icon={<SettingsIcon />}
                  iconPosition="start"
                />
                <Button
                  startIcon={<LogoutIcon />}
                  sx={{
                    textTransform: "initial",
                    margin: 2,
                    minWidth: 0,
                    fontWeight: "normal",
                    letterSpacing: 0.5,
                    color: "#fff",
                    borderRadius: "8px",
                  }}
                  variant="contained"
                  onClick={logout}
                  disabled={isLoggingOut}
                >
                  Wyloguj się
                </Button>
              </Tabs>
            </Grid>
            <Grid item md={10} p={2}>
              <Paper
                elevation={16}
                sx={{
                  borderRadius: "8px",
                }}
              >
                <TabPanel value="0">
                  <h1>Twoje dane</h1>
                </TabPanel>
                <TabPanel value="1">
                  <h1>Twoje analizy</h1>
                </TabPanel>
                <TabPanel value="2">
                  <h1>Ustawienia</h1>
                  <Grid container spacing={5}>
                    <Grid item md={6}>
                      <Paper elevation={10}>
                        <h3> Ustawienia konta</h3>
                      </Paper>
                    </Grid>
                    <Grid item md={6}>
                      <Paper elevation={10}>
                        <h3> Ustawienia konta</h3>
                      </Paper>
                    </Grid>
                  </Grid>
                </TabPanel>
              </Paper>
            </Grid>
          </TabContext>
        </Grid>
      </Container>
    </Animated>
  );
};

export default Profile;
