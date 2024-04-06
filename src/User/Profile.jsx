import React, { useState } from "react";
import { Paper, Container, Grid } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { TabContext } from "@mui/lab";

import { styled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";

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

const Profile = () => {
  const [value, setValue] = useState("0");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="false">
      <Grid container>
        <TabContext value={value}>
          <Grid item md={2} p={2}>
            <Tabs
              value={value}
              onChange={handleChange}
              orientation="vertical"
              variant="scrollable"
              sx={{
                width: "100%",
                borderRadius: "8px",
                background: "linear-gradient(60deg, #64b5f6, #1976d2)",
                padding: "10px",
                boxShadow: "0px 3px 15px rgba(34, 35, 58, 0.5)",
                [`& .${tabsClasses.indicator}`]: {
                  width: "100%",
                  borderRadius: "8px",
                  backgroundColor: "rgba(255, 255, 255, .2)",
                },
              }}
            >
              <TabItem disableRipple label="strona1" value="0" />
              <TabItem disableRipple label="strona2" value="1" />
              <TabItem disableRipple label="strona3" value="2" />
            </Tabs>
          </Grid>
          <Grid item md={10} p={2}>
            <Paper elevation={16}>
              <TabPanel value="0">strona1</TabPanel>
              <TabPanel value="1">strona2</TabPanel>
              <TabPanel value="2">strona3</TabPanel>
            </Paper>
          </Grid>
        </TabContext>
      </Grid>
    </Container>
  );
};

export default Profile;
