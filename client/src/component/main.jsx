import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Main = () => {
  return (
    <Grid height={window.innerHeight}>
      <Grid
        height="60px"
        container
        bgcolor="#F7F9F9"
        alignItems="center"
        boxShadow={1}
      >
        <Header />
      </Grid>
      <Grid height={`100% - 60px)`}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Main;
