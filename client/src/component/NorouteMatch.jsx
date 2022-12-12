import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NorouteMatch = () => {
  return (
    <Typography>
      No route Match <Link to="/">home</Link>
    </Typography>
  );
};
export default NorouteMatch;
