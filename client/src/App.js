import "./App.css";
import react, { useState } from "react";
import Home from "./Pages/Home";
import Layout from "./Layout/Layout";
import { Routes, Route } from "react-router-dom";

function App() {
  const [form, setForm] = useState({});
  const [fileURL, setFileURL] = useState("");
  const handletest = async () => {
    await fetch("http://localhost:4004/download", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ filename: "8eba600e3244f2a703c959cfd30511cf" }),
    })
      .then((res) => res.blob())
      .then((data) => {
        const objURL = URL.createObjectURL(data);
        console.log(objURL);
        setFileURL(objURL);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
      {/* <button onClick={handletest}>Test</button>
      <a href={fileURL} download>
        download
      </a> */}
    </>
  );
}

export default App;
