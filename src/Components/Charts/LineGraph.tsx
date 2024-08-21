
import{ Line }  from "react-chartjs-2" ;

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from  "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



function LineGraph(props) {
    const labels = props.labels;
    const datasets = props.datasets;
    const borderColor = props.background;

    const data = {
      labels: labels,
      datasets: datasets,
      borderColor : borderColor
    };
    return (
        <Line data={
            data
        }></Line> 
    );
}

export default LineGraph;