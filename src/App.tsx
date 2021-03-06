import { Web3Provider } from "./contexts/Web3Context";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Routes } from "./Routes";
import theme from "./theme";
import GlobalStyle from "./globalStyles";
import Header from "./components/Header";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Web3Provider>
        <GlobalStyle />
        <Header />
        <Router>
          <Routes />
        </Router>
      </Web3Provider>
    </ThemeProvider>
  );
};
