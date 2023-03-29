import React, { Fragment } from "react";
import Navbar from "./components/Navigation/Navbar";
import logo from "./logo.svg";
import "./App.css";
import Landing from "./components/Landing/Landing";

function App() {
  return (
    <Fragment>
      <Navbar />
      <Landing />
    </Fragment>
  );
}

export default App;
