// import React from 'react';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "../Components/Rockets/Rocket";
import Demo from "../Components/Demo";
import Ship from "../Components/Ships/Ship";

function MyRouters() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Homepage props={"prop"}></Homepage>}
        ></Route>
        <Route path="/shipData" element={<Ship></Ship>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default MyRouters;
