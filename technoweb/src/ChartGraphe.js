import { useState,useEffect } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";


export default function ChartGraphe(r) {
  Chart.register()



  const [userData] = useState({
    labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
    datasets: [
      {
        label: 'This week',
          data: [50, 110, 60, 290, 200, 115, 130, 170, 90, 210, 240, 280, 350],
          
          backgroundColor: 'rgba(26, 115, 232, 0.18)',
          borderColor: [
              '#1F3BB3',
          ],
          borderWidth: 1.5,
          fill: true, // 3: no fill
          pointBorderWidth: 1,
          pointRadius: [4, 4, 4, 4, 4,4, 4, 4, 4, 4,4, 4, 4],
          pointHoverRadius: [2, 2, 2, 2, 2,2, 2, 2, 2, 2,2, 2, 2],
          pointBackgroundColor: ['#1F3BB3', '#1F3BB3', '#1F3BB3', '#1F3BB3','#1F3BB3', '#1F3BB3', '#1F3BB3', '#1F3BB3','#1F3BB3', '#1F3BB3', '#1F3BB3', '#1F3BB3','#1F3BB3'],
          pointBorderColor: ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff'],
          tension: 0.4,
       },
    ],
  });


  return (
    <div className="App">

      <div style={{ width: 700 }}>
        <Line data={userData} />
      </div>

    </div>
  );
}
