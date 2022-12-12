import { Avatar, CircularProgress, Grid, Typography } from "@mui/material";
import { Navigate, useLocation } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../api";

const Details = () => {
  const { state } = useLocation();
  const { data, error } = useSWR(
    state?.id && `/products/${state?.id}`,
    fetcher
  );

  if (!state?.id) {
    return <Navigate to="/" />;
  }

  if (!data && !error) {
    return (
      <Grid container justifyContent="center">
        <CircularProgress />
      </Grid>
    );
  }
  return (
    <Grid p="15px">
      <Typography variant="h5">{data?.title}</Typography>
      <Avatar
        src={data?.image}
        alt="product"
        variant="square"
        sx={{
          display: "block",
          width: "fit-content",
          height: "250px",
          my: "25px",
        }}
      />
      <Typography variant="h5">₹ {data?.price}</Typography>
      <Typography py="5px" textTransform="capitalize" fontWeight={700}>
        {data?.category}
      </Typography>
      <Typography>{data?.description}</Typography>
    </Grid>
  );
};
export default Details;
