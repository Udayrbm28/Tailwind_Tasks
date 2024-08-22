// import React from 'react';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "../Components/Rockets/Launches";
import Demo from "../Components/Demo";
import Ship from "../Components/Ships/Ship";
import Rocket from "../Components/Rockets/Rocket";

function MyRouters() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage props={"prop"}></Homepage>}></Route>
        <Route path="/shipData" element={<Ship></Ship>}></Route>
        <Route path="/rocketData" element={<Rocket></Rocket>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default MyRouters;
