import "./App.css";
import react, { useState } from "react";
import Home from "./Pages/Home";
import Layout from "./Layout/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import Download from "./Pages/Download";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/download/:id" element={<Download />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
