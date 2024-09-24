import React, { useContext } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { UserContext } from "../contexts/UserContext";
import PaletteIcon from "@mui/icons-material/Palette";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const Menu = () => {
  const [open, setOpen] = React.useState(false);
  const { user } = useContext(UserContext);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: 2,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          variant="regular"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            borderRadius: "999px",
            bgcolor: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(24px)",
            maxHeight: 40,
            border: "1px solid",
            borderColor: "divider",
            boxShadow: `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`,
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              ml: "-18px",
              px: 0,
            }}
          >
            <Link to="/" className="menu-logo-brand">
              <img src="assets/logo.png" alt="logo" className="menu-logo" />
              <div className="menu-brand-name">
                <Typography className="menu-brand-name-text">Paleta</Typography>
                <Typography className="menu-brand-name-text">
                  Personalna
                </Typography>
              </div>
            </Link>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <MenuItem
                component={Link}
                to={"/generate"}
                sx={{ py: "6px", px: "12px" }}
              >
                <Typography variant="body2" color="text.primary">
                  Generuj
                </Typography>
              </MenuItem>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 0.5,
              alignItems: "center",
            }}
          >
            {user.isLoggedIn ? (
              <Button
                color="primary"
                variant="text"
                component={Link}
                to={"/profile"}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
                Profil
              </Button>
            ) : (
              <>
                <Button
                  color="primary"
                  variant="text"
                  component={Link}
                  to={"/login"}
                >
                  Zaloguj się
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  component={Link}
                  to={"/register"}
                >
                  Zarejestruj się
                </Button>
              </>
            )}
          </Box>
          <Box sx={{ display: { sm: "", md: "none" } }}>
            <Button
              variant="text"
              color="primary"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ minWidth: "30px", p: "4px" }}
            >
              <MenuIcon />
            </Button>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
              <Box
                sx={{
                  minWidth: "60dvw",
                  p: 2,
                  backgroundColor: "background.paper",
                  flexGrow: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                    flexGrow: 1,
                  }}
                ></Box>

                {user.isLoggedIn ? (
                  <>
                    <MenuItem
                      component={Link}
                      to={"/profile"}
                      sx={{
                        py: "6px",
                        px: "12px",
                      }}
                    >
                      <AccountBoxIcon />
                      <Typography
                        variant="body2"
                        color="text.primary"
                        sx={{ pl: 2 }}
                      >
                        Profil
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to={"/generate"}
                      sx={{ py: "6px", px: "12px" }}
                    >
                      <PaletteIcon />
                      <Typography
                        variant="body2"
                        color="text.primary"
                        sx={{ pl: 2 }}
                      >
                        Generuj
                      </Typography>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem
                      component={Link}
                      to={"/login"}
                      sx={{ py: "6px", px: "12px" }}
                    >
                      <Typography variant="body2" color="text.primary">
                        Zaloguj się
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to={"/register"}
                      sx={{ py: "6px", px: "12px" }}
                    >
                      <Typography variant="body2" color="text.primary">
                        Zarejestruj się
                      </Typography>
                    </MenuItem>
                  </>
                )}
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Menu;
