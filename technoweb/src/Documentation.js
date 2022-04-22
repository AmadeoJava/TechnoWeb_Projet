import * as React from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Card from '@mui/material/Card';

import CreateIcon from '@mui/icons-material/Create';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import BarChartIcon from '@mui/icons-material/BarChart';
import Checkbox from '@mui/material/Checkbox';
import ArticleIcon from '@mui/icons-material/Article';
import $ from "jquery";
import FormControl from '@mui/material/FormControl';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {
    CardActions,
    CardHeader,
    Collapse,
    makeStyles,
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
              <div>
                <Typography>{re}</Typography>
                <br/>
              </div>
            ))}
          </Collapse>
        </Card>
      </Paper>
    )

}