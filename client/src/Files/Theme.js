import { createTheme, responsiveFontSizes } from "@mui/material";

const defaultTheme = createTheme();

let theme = createTheme({
  ...defaultTheme,
  components: {
    MuiButton: {
      defaultProps: {
        disableFocusRipple: true,
        disableTouchRipple: true,
        disableRipple: true,
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          fontFamily: "Givonic",
          textTransform: "none",
        },
        text: {
          background: defaultTheme.palette.primary.main,
          color: defaultTheme.palette.text.primary,
          "&:hover": {
            background: defaultTheme.palette.primary.main,
            color: defaultTheme.palette.text.primary,
          },
        },
      },
    },
    MuiInput: {
      defaultProps: {
        fullWidth: true,
        disableUnderline: true,
        size: "medium",
      },
      styleOverrides: {
        root: {
          border: "1px solid #000000aa",
          borderRadius: "3px",
          padding: "0 7px",
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
