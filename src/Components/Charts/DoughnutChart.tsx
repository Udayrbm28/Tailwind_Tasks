import React from "react";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(Tooltip, Legend, ArcElement);

function DoughnutChart(props) {
  return <Doughnut data={props.data}></Doughnut>;
}

export default DoughnutChart;
