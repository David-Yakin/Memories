import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "./features/layout/Layout";
import Router from "./features/routes/Router";
import { SnackbarProvider } from "./features/general/providers/SnackbarProvider";
import ThemeProvider from "./features/general/providers/ThemeProvider";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider>
          <SnackbarProvider>
            <Layout>
              <Router />
            </Layout>
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
