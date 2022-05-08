import { useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import $ from "jquery";
const axios = require('axios');

var toutOkG=true;
var week=["SUN","MON","TUE","WED","THU","FRI","SAT"];
var jour=0;
var tout=[];
var semN=[];

export default function ChartGraphe() {
  Chart.register()

  const remplirGraphe = (a,sem) =>{
    for(let j=0; j<sem.length;j++){
      var g=sem[j];
      var ve = true;
      for (let i=0; i<a.length; i++){
        var d = a[i];
        if(d.dateFrequentation==g){
          tout.push(d.nbVisites);
          ve=false;
        }
      }
      if(ve){
        tout.push(0);
      }
    }
    console.log(tout);
  }

  const semaine = (l,lm,f,fm) =>{
    var semain=[];
    jour=f.getDay();
    for (let i=0;i<7;i++){
      semN.push(week[i%7]);
    }
    console.log(semN);
    if (f.getMonth()==l.getMonth()){
      //console.log("ok")
      for(let i=f.getDate(); i<l.getDate()+1;i++){
        var m=l.getMonth()+1;
        var j=i;
        if(m<10){
          m="0"+m;
        }
        if(j<10){
          j="0"+j;
        }
        var dat = l.getFullYear()+"-"+m+"-"+j;
        semain.push(dat);
      }
    }else{
      for(let i=f.getDate(); i<32;i++){
        var m=l.getMonth()+1;
        var j=i;
        if(m<10){
          m="0"+m;
        }
        if(j<10){
          j="0"+j;
        }
        var dat = l.getFullYear()+"-"+m+"-"+j;
        semain.push(dat);
      }
      for(let i=1; i<l.getDate()+1;i++){
        var m=l.getMonth()+1;
        var j=i;
        if(m<10){
          m="0"+m;
        }
        if(j<10){
          j="0"+j;
        }
        var dat = l.getFullYear()+"-"+m+"-"+j;
        semain.push(dat);
      }
    }
    return semain;
  }

  const dateFormat = (d) =>{
    var y = d.getFullYear();
    var m = d.getMonth()+1;
    if (parseInt(m)<10){
      m="0"+m;
    }
    var j = d.getDate();
    if (parseInt(j)<10){
      j="0"+j;
    }
    return(y+"-"+m+"-"+j);
  }



  var [userData] = useState({
    labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
    datasets: [
      {
        label: 'Frequentation',
          data: [50, 110, 60, 290, 200, 115, 130],
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

  if(toutOkG) {
    var d= new Date();

    var curr = new Date;
    var first = curr.getDate() - curr.getDay();
    var last = first - 6;

    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));

    var fd = dateFormat(firstday);
    var ld = dateFormat(lastday);

    var sem = semaine(firstday,fd,lastday,ld);

    console.log(sem);

    try {
      const result = axios.get(
        `/frequentation`
      );
    
      result.then((resp) =>
        remplirGraphe(resp.data,sem)
      );
  
    } catch (err) {
      console.log(err);
    }
    toutOkG=false;
    userData.datasets[0].data=tout;
    userData.labels=semN;
    console.log(userData);    
  }

  return (
    <div className="App">

      <div style={{ width: 700 }}>
        <Line data={userData} id="graphique" />
      </div>

    </div>
  );
}
