import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import PricingAndActivities from "./pages/AboutAndPricing";
import Hero from "./pages/Hero";
import Gallery from "./pages/Gallery";
import ContactPage from "./pages/Contact";
import Registration from "./pages/Registration";
import GoogleRegistration from "./pages/GoogleRegistration";

function App() {
  return (
    <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<PricingAndActivities />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/registration" element={<GoogleRegistration />} />

    </Routes>
  );
}

export default App;
