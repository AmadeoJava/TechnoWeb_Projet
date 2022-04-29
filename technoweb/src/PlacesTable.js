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
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';


function createDataPlaces(identifiant, image, name, latitude, longitude, caracteristiques, description) {
  return { identifiant, image, name, latitude, longitude, caracteristiques, description };
}// add data
var rowPlaces = [
  createDataPlaces(1, require('./images/places/cath.jpg'), 'Cathédrale', '8', '9', "Lieu", "Grande cathédrale"),
  createDataPlaces(2, require('./images/places/laut.jpg'), 'Musée Lautrec', '9', '9', "Culture", "Musée avec des tableaux"),
  createDataPlaces(3, require('./images/places/mod.jpg'), 'Musée de la mode', '10', '12', "Culture Restaurant", "Musée avec des vêtements"),
];

const rowPlaces1 = [
  createDataPlaces(1, require('./images/places/cath.jpg'), 'Cathédrale', '8', '9', "Lieu", "Grande cathédrale"),
  createDataPlaces(2, require('./images/places/laut.jpg'), 'Musée Lautrec', '9', '9', "Culture", "Musée avec des tableaux"),
  createDataPlaces(3, require('./images/places/mod.jpg'), 'Musée de la mode', '10', '12', "Culture Restaurant", "Musée avec des vêtements"),
];


const columnsPlaces = [
  { id: 'image' },
  { id: 'name' },
  { id: 'latitude' },
  { id: 'longitude' },
  { id: 'caracteristiques' },
  { id: 'description' },
  { id: 'identifiant' }
];

var ind = 0;
var nom = "cat";
var description = "rien";

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

  const myfonction = () => {
    setPage(0);
    clearInterval(timeou);
  };

  const actualiser = () => {
    timeou = setTimeout(myfonction, 1);
  }

  const montrer = (el) => {
    var val = $("#" + el).val();
    val = val.toUpperCase();
    //console.log(val);
    rowPlaces = rowPlaces1;
    if (val) {
      var ro = [];
      for (let i = 0; i < rowPlaces.length; i++) {
        var r = ((rowPlaces[i].name).toUpperCase()) + " " + ((rowPlaces[i].caracteristiques).toUpperCase()) + " " + ((rowPlaces[i].description).toUpperCase());
        //console.log(r);
        if (r.includes(val)) {
          ro.push(rowPlaces[i]);
        }
      }
      rowPlaces = ro;
    }

    console.log(rowPlaces);

    setPage(1);
    actualiser();
  }

  const [open, setOpen] = React.useState(false);

  const [verif, setVerif] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const verifclose = () => {
    setVerif(false);
    console.log(verif);
  }


  const verifier = () => {
    handleClose();
    setVerif(true);
  }

  const supprimer = (i) => {
    verifclose();
    alert('lieu ' + rowPlaces[i].name + " supprimé");
  }


  const changer = (i) => {
    console.log(i);
    ind = i - 1;
    nom = rowPlaces[ind].name;
    description = rowPlaces[ind].description;
    setOpen(true);
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }}>
      <div>
        <TextField
          id="placesearch"
          label="Recherche"
          defaultValue=""
          variant="standard"
          onChange={() => montrer("placesearch")}
        />
      </div>
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label="sticky table" id="usertable">
          <colgroup>
            <col style={{ width: '15%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '5%' }} />
            <col style={{ width: '5%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '40%' }} />
            <col style={{ width: '5%' }} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Image</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Nom</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Latitude</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Longitude</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Caractéristiques</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Description</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Modifier</TableCell>
            </TableRow>
          </TableHead>
          <TableBody id="userrows">
            {rowPlaces.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>

                  {columnsPlaces.map((column) => {
                    const value = row[column.id];
                    if (((column.id) !== 'image' && (column.id) !== 'identifiant')) {
                        return (
                          <TableCell key={column.id} align="center">
                            {value}
                          </TableCell>
                          );
                      } else {
                        return (
                          <TableCell key={column.id} align="center">
                            <img src={value} style={{ width: '50%' }} alt="" />
                          </TableCell>
                          );
                      }

                  })}
                  <TableCell align="center">
                    <IconButton id={row[columnsPlaces[2].id]} onClick={() => changer(row[columnsPlaces[6].id])}>
                      <EditIcon style={{ color: '#1976d2' }} />
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

      <Dialog onClose={handleClose} open={open} style={{ textAlign: 'center', contentAlign: 'center' }} fullWidth maxwidth="sm">
        <DialogTitle id="simple-dialog-title"><h2>Modifier utilisateur</h2></DialogTitle>
        <Grid container direction={"column"} spacing={2}>
          <Grid Item>
            Nom
          </Grid>
          <Grid item>
            <TextField id="placenom" name="placenom" label={nom} required margin="normal" style={{ width: "90%" }} />
          </Grid>
          <Grid Item>
            <br />
          </Grid>
          <Grid Item>
            Description
          </Grid>
          <Grid item>
            <TextField id="placedescription" name="placedescription" label={description} required margin="normal" style={{ width: "90%" }} />
          </Grid>
          <Grid item>
            <Grid container spacing={2} style={{ justifyContent: "center" }}>
              <Grid item>
                <Button variant="contained" onClick={() => verifier(ind)} style={{ backgroundColor: "red" }}>
                  <DeleteIcon style={{ verticalAlign: "middle" }} />
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={() => handleClose()}>Valider</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
          </Grid>
        </Grid>
      </Dialog>

      <Dialog open={verif} style={{ textAlign: 'center', contentAlign: 'center' }} fullWidth maxwidth="sm">
        <DialogTitle id="simple-dialog-title"><h2>Supprimer lieu</h2></DialogTitle>
        <Grid container direction={"column"} spacing={2}>
          <Grid item>
            <Grid container spacing={2} style={{ justifyContent: "center" }}>
              <Grid item>
                <Button variant="contained" onClick={() => verifclose()} style={{ backgroundColor: "red" }}>
                  Annuler
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={() => supprimer(ind)}>Valider</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
          </Grid>
        </Grid>
      </Dialog>

    </Paper>
  );
}
