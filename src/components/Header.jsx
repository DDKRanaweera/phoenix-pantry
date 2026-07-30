import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Box,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import RestaurantIcon from "@mui/icons-material/Restaurant";

function Header({ user, onLogout }) {
  return (
    <AppBar
      position="static"
      color="success"
      elevation={4}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <RestaurantIcon fontSize="large" />

          <Typography
            variant="h5"
            fontWeight="bold"
          >
            Phoenix Pantry
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar
            src={user?.photoURL}
            alt={user?.displayName}
          >
            {user?.displayName?.charAt(0)}
          </Avatar>

          <Typography
            variant="body1"
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
            Welcome, {user?.displayName}
          </Typography>

          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={onLogout}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;