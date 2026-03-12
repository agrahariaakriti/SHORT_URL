// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Route, Routers } from "react-router-dom";
import Home from "./pages/homepage";
import SINGUP from "./pages/signup";
import SININ from "./pages/signin";
import SHORTENER from "./pages/urlshortener";
import ClickTracker from "./pages/clicktracker";
const App = () => {
  console.log("Hyy in the app");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SINGUP />} />
          <Route path="/signin" element={<SININ />} />
          <Route path="/shorten" element={<SHORTENER />} />
          <Route path="/clicks" element={<ClickTracker />} />
        </Routes>
      </BrowserRouter>
      {/* <SHORTENER /> */}
    </>
  );
};

export default App;
