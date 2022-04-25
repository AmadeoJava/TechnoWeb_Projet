import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import $ from "jquery";
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

function createDataPlaces(image, name, latitude, longitude, caracteristiques, description) {
    return { image, name, latitude, longitude, caracteristiques, description};
  }// add data
  var rowPlaces = [
    createDataPlaces(require('./images/places/cath.jpg'), 'Cathédrale', '8', '9', "Lieu", "Grande cathédrale"),
    createDataPlaces(require('./images/places/laut.jpg'), 'Musée Lautrec', '9', '9', "Culture", "Musée avec des tableaux"),
    createDataPlaces(require('./images/places/mod.jpg'), 'Musée de la mode', '10', '12', "Culture Restaurant", "Musée avec des vêtements"),
  ];

  const rowPlaces1 = [
    createDataPlaces(require('./images/places/cath.jpg'), 'Cathédrale', '8', '9', "Lieu", "Grande cathédrale"),
    createDataPlaces(require('./images/places/laut.jpg'), 'Musée Lautrec', '9', '9', "Culture", "Musée avec des tableaux"),
    createDataPlaces(require('./images/places/mod.jpg'), 'Musée de la mode', '10', '12', "Culture Restaurant", "Musée avec des vêtements"),
  ];
  
  
  const columnsPlaces = [
    { id: 'image'},
    { id: 'name'},
    { id: 'latitude'},
    { id: 'longitude'},
    { id: 'caracteristiques'},
    { id: 'description'}
  ];

  export default function PlacesTable() {
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
      rowPlaces=rowPlaces1;
      if (val){
        var ro=[];
        for (let i = 0; i <rowPlaces.length; i++){
          var r = ((rowPlaces[i].name).toUpperCase())+" "+((rowPlaces[i].caracteristiques).toUpperCase())+" "+((rowPlaces[i].description).toUpperCase());
          //console.log(r);
          if(r.includes(val)){
            ro.push(rowPlaces[i]);
          }
        }
        rowPlaces=ro;
      }

      console.log(rowPlaces);

      setPage(1);
      timeou = setTimeout(myfonction, 1);
    }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <div>
      <TextField
          id="placesearch"
          label="Recherche"
          defaultValue=""
          variant="standard"
          onChange={()=>montrer("placesearch")}
        />
      </div>
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table" id="usertable">  
        <TableHead>
          <TableRow>
          <TableCell align="center" style={{fontWeight: "bold"}}>Image</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Nom</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Latitude</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Longitude</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Caractéristiques</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Description</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Modifier</TableCell>
          </TableRow>
        </TableHead>
        <TableBody id="userrows">
          {rowPlaces.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columnsPlaces.map((column) => {
                    const value = row[column.id];
                    if((column.id)!='image'){
                      return (
                        <TableCell key={column.id} align="center">
                          {value}
                        </TableCell>
                      );
                    }else{
                      return (
                        <TableCell key={column.id} align="center">
                          <img src={value}/>
                        </TableCell>
                      );
                    }
                  })}
                  <TableCell align="center">
                    <IconButton id={row[columnsPlaces[2].id]} onClick={event=>alert(row[columnsPlaces[2].id])}>
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
count={rowPlaces.length}
rowsPerPage={rowsPerPage}
page={page}
onPageChange={handleChangePage}
onRowsPerPageChange={handleChangeRowsPerPage}
/>
  </Paper>
  );
}
