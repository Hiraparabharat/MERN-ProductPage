import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Details from "./component/Details";
import Home from "./component/Home";
import Main from "./component/main";
import NorouteMatch from "./component/NorouteMatch";
import theme from "./Files/Theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route element={<Main />}>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />
          <Route path="*" element={<NorouteMatch />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
