import React from 'react';

import {Bar} from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface props {
    data : {
        labels: [],
        datasets:[]
    }
}

function BarChart(props: props) {
  
   
    return (
        <Bar data={props.data}>   
        </Bar>
    );
}

export default BarChart;