import React from 'react';
import {Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';


ChartJS.register(
    Tooltip, Legend, ArcElement
)

function PieChart(props) {

    return (
            <Pie data ={props.data} >

            </Pie >
    );
}

export default PieChart;