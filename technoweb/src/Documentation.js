import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {
    Collapse,
  } from "@material-ui/core";
  import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
  import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
  import { useState } from "react";
  import './adminpage.css';

  
var cl = true;

export default function Documentation(r) {


    const [expand, setExpand] = useState();


    const clique = () => {
      setExpand(!expand);
      cl = !cl;
      console.log(cl);
    }

    return(
      <Box>
          <Paper>
          <Card style={{ textAlign: "center" }}>
          <div  style={{width: "100%"}} onClick={() => clique()} className="clickable">
              <div style={{width: "80%", display:"inline-block"}}>
                  <h2 style={{marginLeft:"25%"}}>{r.que}</h2>
              </div>
              <div style={{width: "20%", display:"inline-block"}} id="icone">
              {cl ? <ArrowDropDownIcon /> : <ArrowDropUpIcon /> }
              </div>
          </div>
            <Collapse in={expand}>
              <br/>
              {r.rep.map((re,index) =>(
                <div key={index}>
                  <Typography>{re}</Typography>
                  <br/>
                </div>
              ))}
            </Collapse>
          </Card>
        </Paper>
        <br/>
        </Box>
    )

}