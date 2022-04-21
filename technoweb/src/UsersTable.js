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
import profile from './images/faces/face8.jpg';
import Card from '@mui/material/Card';
import CreateIcon from '@mui/icons-material/Create';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import BarChartIcon from '@mui/icons-material/BarChart';
import Checkbox from '@mui/material/Checkbox';
import ArticleIcon from '@mui/icons-material/Article';
import $ from "jquery";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { mergeBreakpointsInOrder } from '@mui/system';

function createDataUsers(firstname, name, surname, administrateur, password) {
    return { firstname, name, surname, administrateur, password};
  }// add data
  var rowsUsers = [
    createDataUsers('Sherlock', 'Holmes', 'Détective', "Oui", "********"),
    createDataUsers('Shinishi', 'Kudo', 'Lycéen', "Non", "********"),
    createDataUsers('Jules', 'Maigret', 'Commisaire', "Non", "********"),
    createDataUsers('David', 'Panzoli', 'Dieu ?', "Non", "********"),
    createDataUsers('Naruto', 'Uzumaki', 'Hokage', "Non", "********"),
    createDataUsers('Monkey', 'Luffy', 'Pirate', "Non", "********"),
    createDataUsers('Natsu', 'Dragnir', 'Salamander', "Non", "********"),
    createDataUsers('Arnaud', 'Cros', 'Ark Tryharder', "Oui", "********"),
    createDataUsers('Antonin', 'Pidet', 'Fourmi', "Oui", "********"),
    createDataUsers('Amadéo', 'Soufflet', 'Pentester', "Oui", "********"),
    createDataUsers('François', 'Pouit', 'PuitPuit', "Non", "********"),
    createDataUsers('Nicolas', 'Garric', 'Bricoleur', "Non", "********"),
    createDataUsers('Laura', 'Brillon', 'Matheuse', "Non", "********"),
    createDataUsers('Thierry', 'Montaut', 'Relou', "Non", "********"),
  
  ];

  const rowsUsers1 = [
    createDataUsers('Sherlock', 'Holmes', 'Détective', "Oui", "********"),
    createDataUsers('Shinishi', 'Kudo', 'Lycéen', "Non", "********"),
    createDataUsers('Jules', 'Maigret', 'Commisaire', "Non", "********"),
    createDataUsers('David', 'Panzoli', 'Dieu ?', "Non", "********"),
    createDataUsers('Naruto', 'Uzumaki', 'Hokage', "Non", "********"),
    createDataUsers('Monkey', 'Luffy', 'Pirate', "Non", "********"),
    createDataUsers('Natsu', 'Dragnir', 'Salamander', "Non", "********"),
    createDataUsers('Arnaud', 'Cros', 'Ark Tryharder', "Oui", "********"),
    createDataUsers('Antonin', 'Pidet', 'Fourmi', "Oui", "********"),
    createDataUsers('Amadéo', 'Soufflet', 'Pentester', "Oui", "********"),
    createDataUsers('François', 'Pouit', 'PuitPuit', "Non", "********"),
    createDataUsers('Nicolas', 'Garric', 'Bricoleur', "Non", "********"),
    createDataUsers('Laura', 'Brillon', 'Matheuse', "Non", "********"),
    createDataUsers('Thierry', 'Montaut', 'Relou', "Non", "********"),
  
  ];
  
  
  const columnsUsers = [
    { id: 'firstname'},
    { id: 'name'},
    { id: 'surname'},
    { id: 'administrateur'},
    { id: 'password'}
  ];

  export default function UsersTable() {
    var timeou;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const myfonction = () =>{
      setPage(0);
      clearInterval(timeou);
    };

    const montrer = (el) =>{
      var val = $("#"+el).val();
      val = val.toUpperCase();
      //console.log(val);
      rowsUsers=rowsUsers1;
      if (val){
        var ro=[];
        for (let i = 0; i <rowsUsers.length; i++){
          var r = (rowsUsers[i].firstname).toUpperCase()+" "+(rowsUsers[i].name).toUpperCase()+" "+(rowsUsers[i].surname).toUpperCase();
          //console.log(r);
          if(r.includes(val)){
            ro.push(rowsUsers[i]);
          }
        }
        rowsUsers=ro;
      }

      console.log(rowsUsers);

      /*
      $('#userrows').remove();

      $('#usertable').append(rows);
      */
      setPage(1);
      timeou = setTimeout(myfonction, 10);
    }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <div>
      <TextField
          id="usersearch"
          label="Recherche"
          defaultValue=""
          variant="standard"
          onChange={()=>montrer("usersearch")}
        />
      </div>
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table" id="usertable">  
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{fontWeight: "bold"}}>Prénom</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Nom</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Pseudo</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Administrateur</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Mot de passe</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Modifier</TableCell>
          </TableRow>
        </TableHead>
        <TableBody id="userrows">
          {rowsUsers
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columnsUsers.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align="center">
                        {value}
                      </TableCell>
                    );
                  })}
                  <TableCell align="center">
                    <IconButton id={row[columnsUsers[2].id]} onClick={event=>alert(row[columnsUsers[2].id])}>
                      <EditIcon style={{color: '#1976d2'}}/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
rowsPerPageOptions={[5, 10, 25, 100]}
component="div"
count={rowsUsers.length}
rowsPerPage={rowsPerPage}
page={page}
onPageChange={handleChangePage}
onRowsPerPageChange={handleChangeRowsPerPage}
/>
  </Paper>
  );
}
