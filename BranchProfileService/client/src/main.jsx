import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ Import BrowserRouter
import "./index.css";
import App from "./App.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter> {/* ✅ Wrap App with BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>
);