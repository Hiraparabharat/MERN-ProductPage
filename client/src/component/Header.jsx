import { Typography, Grid, IconButton } from "@mui/material";
import { ReactComponent as Menu } from "../Files/icons/Menu1.svg";
import { ReactComponent as Cart } from "../Files/icons/Cart.svg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <Grid item xs="auto">
        <IconButton onClick={() => navigate("/")}>
          <Menu />
        </IconButton>
      </Grid>
      <Grid item xs></Grid>
      <Grid item xs="auto">
        <Typography variant="h6" color="warning">
          FakeStore
        </Typography>
      </Grid>
      <Grid item xs></Grid>
      <Grid item xs="auto">
        <IconButton>
          <Cart />
        </IconButton>
      </Grid>
    </>
  );
};

export default Header;
