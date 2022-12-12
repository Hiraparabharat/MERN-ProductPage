import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  Input,
  InputAdornment,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../api";
import { ReactComponent as SearchIcon } from "../Files/icons/SearchIcon.svg";

const Home = () => {
  const [filter, setFilter] = useState({
    search: "",
    category: "",
    sort: "",
    sortBy: "ASC",
  });
  const [search, setSearch] = useState("");
  const { data, error } = useSWR(["/products", filter], fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });
  const navigate = useNavigate();

  console.log(filter);

  return (
    <Grid container p="15px" rowGap="15px">
      <Grid item xs={12} md={3} pr="15px">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setFilter((prev) => ({ ...prev, search: search }));
          }}
        >
          <Input
            variant="text"
            placeholder="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </form>
        <Typography mt="10px" varaint="body2">
          Category
        </Typography>
        <Select
          variant="standard"
          value={filter?.category}
          onChange={(e, v) => {
            setFilter((prev) => ({ ...prev, category: e.target.value }));
          }}
          placeholder="Select Category"
        >
          {[
            "electronics",
            "jewelery",
            "men's clothing",
            "women's clothing",
          ].map((key) => (
            <MenuItem value={key} key={key}>
              {key}
            </MenuItem>
          ))}
        </Select>
        <Grid container columnGap="10px" mt="10px">
          <Grid item xs={12}>
            <Typography varaint="body2">Sort</Typography>
          </Grid>
          <Grid xs>
            <Select
              variant="standard"
              value={filter?.sort}
              onChange={(e, v) => {
                setFilter((prev) => ({ ...prev, sort: e.target.value }));
              }}
              placeholder="Sort By"
            >
              {["price", "title"].map((key) => (
                <MenuItem value={key} key={key}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid xs="auto">
            <Select
              variant="standard"
              value={filter?.sortBy}
              onChange={(e, v) => {
                setFilter((prev) => ({ ...prev, sortBy: e.target.value }));
              }}
              placeholder="Direction"
            >
              {["ASC", "DESC"].map((key) => (
                <MenuItem value={key} key={key}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container spacing="15px" alignItems="stretch" xs={12} md={9}>
        {data && data?.length > 0 ? (
          data.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Grid
                boxShadow={3}
                borderRadius="3px"
                heigth="100%"
                px="15px"
                py="10px"
              >
                <Avatar
                  src={product.image}
                  alt="fakeStore"
                  variant="square"
                  sx={{
                    display: "block",
                    margin: "0 auto",
                    width: "fit-content",
                    height: "250px",
                  }}
                />
                <Typography noWrap>
                  <Typography component="span" fontWeight="bold">
                    {product.title} -{" "}
                  </Typography>
                  <Typography variant="body2" component="span">
                    {product.description}
                  </Typography>
                </Typography>
                <Grid container justifyContent="space-between">
                  <Grid item xs="auto">
                    <Typography variant="h6">₹ {product.price}</Typography>
                  </Grid>
                  <Grid item xs="auto">
                    <Button
                      onClick={() =>
                        navigate("/details", { state: { id: product._id } })
                      }
                    >
                      Know More
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))
        ) : !data && !error ? (
          <Grid container justifyContent="center" alignItems="center" p="15px">
            <CircularProgress />
          </Grid>
        ) : (
          <Typography p="15px" width="100%" variant="h6" textAlign="center">
            No data
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Home;
