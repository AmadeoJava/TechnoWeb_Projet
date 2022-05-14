import { useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";



export default function ChartGraphe(rep) {
  Chart.register()

  var [userData] = useState({
    labels: rep.j,
    datasets: [
      {
        label: 'Frequentation cette semaine',
          data: rep.da,
          backgroundColor: 'rgba(26, 115, 232, 0.18)',
          borderColor: [
              '#1F3BB3',
          ],
          borderWidth: 1.5,
          fill: true,
          pointBorderWidth: 1,
          pointRadius: [4, 4, 4, 4, 4,4, 4, 4, 4, 4,4, 4, 4],
          pointHoverRadius: [2, 2, 2, 2, 2,2, 2, 2, 2, 2,2, 2, 2],
          pointBackgroundColor: ['#1F3BB3', '#1F3BB3', '#1F3BB3', '#1F3BB3','#1F3BB3', '#1F3BB3', '#1F3BB3'],
          pointBorderColor: ['#fff','#fff','#fff','#fff','#fff','#fff','#fff'],
          tension: 0.4,
       },
    ],
  });

  return (
    <div className="graph" id={rep.ide}>

      <div style={{ width: "50%", display:"inline-block" }}>
        <Line data={userData} id="graphique"/>
      </div>

    </div>
  );
}
