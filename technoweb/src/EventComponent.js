import React, {useEffect } from 'react';
import Card from '@mui/material/Card';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const axios = require('axios');

const requetEventsActifs =  () => {
    try {
        const result = axios.get(
            `/EvenementsActifs`
        );
        return result;
    } catch (err) {
        console.log(err);
    }
};

const fonction = (e) => {
    e.currentTarget.parentNode.parentNode.parentNode.remove();
};
var firstreload=true;
var tabTest = [];
const getMap = (data) => {
    if (firstreload){
        try {
            for (var i = 0; i < data.length; i++) {
                tabTest.push(data[i]);
            }
        } catch (err) {
            console.log(err);
            return [];
        }
    }
};

export default function EventComponent() {
    useEffect(() => {
   
        requetEventsActifs().then((results) => { getMap(results.data); });
    }, []);

    return (<>
        {
            tabTest.map((eventAlbi, idx) => {

                return (<Card key={idx} sx={{ display: 'flex', width: '100%' }} style={{ backgroundColor: "rgb(30, 82, 166)" }}>
                    <div style={{ width: "100%" }}>
                        <div style={{ width: "92%", display: "inline-block", textAlign: "center" }}>
                            <h1 style={{ color: "#fff" }}>{eventAlbi.nomEvent} ({eventAlbi.dateEventDeb}/{eventAlbi.dateEventFin})</h1>
                        </div>
                        <div style={{ width: "8%", display: "inline-block", cursor: "pointer" }}>
                            <HighlightOffIcon onClick={fonction} style={{ color: "#fff" }} />
                        </div>
                        <div style={{ color:"white", textAlign:"center", width:"100%", fontSize:"120%" ,paddingRight:"5%",paddingLeft:"5%"}}>
                            <p>{eventAlbi.descEvent}</p>
                        </div>
                    </div>
                </Card>);

            }
            )
        }</>

    );
}
