import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import Navbar from "./components/Navbar";
import ShoppingList from "./components/ShoppingList";

const font = "Nunito";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#5C6269",
    },
    success: {
      main: "#4D81B7",
    },
  },
  fontFamily: font,
  typography: {
    palette: {
      primary: {
        main: "#2A323C",
      },
      secondary: {
        main: "#5C6269",
      },
    },
    fontFamily: font,
    button: {
      textTransform: "none",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar />
        <ShoppingList />
      </div>
    </ThemeProvider>
  );
}

export default App;
