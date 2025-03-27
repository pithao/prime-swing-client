import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App/App";
import "./index.css";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Create a new cache instance
const muiCache = createCache({
  key: "mui",
  prepend: true, // Ensures MUI styles are loaded first
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CacheProvider value={muiCache}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CacheProvider>
  </React.StrictMode>
);
