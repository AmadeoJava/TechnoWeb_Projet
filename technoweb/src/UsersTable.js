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
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
const axios = require('axios');

function createDataUsers(identifiant, image, firstname, name, surname, administrateur) {
  return { identifiant, image, firstname, name, surname, administrateur };
}// add data



var rowsUsers = [
  createDataUsers(1, require('./images/faces/face8.jpg'), 'Sherlock', 'Holmes', 'Détective', "Oui"),
  createDataUsers(2, require('./images/faces/face8.jpg'), 'Shinishi', 'Kudo', 'Lycéen', "Non"),
  createDataUsers(3, require('./images/faces/face8.jpg'), 'Jules', 'Maigret', 'Commisaire', "Non"),
  createDataUsers(4, require('./images/faces/face8.jpg'), 'David', 'Panzoli', 'Dieu ?', "Oui"),
  createDataUsers(5, require('./images/faces/face8.jpg'), 'Naruto', 'Uzumaki', 'Hokage', "Non"),
  createDataUsers(6, require('./images/faces/face8.jpg'), 'Monkey', 'Luffy', 'Pirate', "Non"),
  createDataUsers(7, require('./images/faces/face8.jpg'), 'Natsu', 'Dragnir', 'Salamander', "Non"),
  createDataUsers(8, require('./images/faces/face8.jpg'), 'Arnaud', 'Cros', 'Ark Tryharder', "Oui"),
  createDataUsers(9, require('./images/faces/face8.jpg'), 'Antonin', 'Pidet', 'Fourmi', "Oui"),
  createDataUsers(10, require('./images/faces/face8.jpg'), 'Amadéo', 'Soufflet', 'Pentester', "Oui"),
  createDataUsers(11, require('./images/faces/face8.jpg'), 'François', 'Pouit', 'PuitPuit', "Non"),
  createDataUsers(12, require('./images/faces/face8.jpg'), 'Nicolas', 'Garric', 'Bricoleur', "Non"),
  createDataUsers(13, require('./images/faces/face8.jpg'), 'Laura', 'Brillon', 'Matheuse', "Non"),
  createDataUsers(14, require('./images/faces/face8.jpg'), 'Thierry', 'Montaut', 'Relou', "Non"),

];

const rowsUsers1 = [
  createDataUsers(1, require('./images/faces/face8.jpg'), 'Sherlock', 'Holmes', 'Détective', "Oui"),
  createDataUsers(2, require('./images/faces/face8.jpg'), 'Shinishi', 'Kudo', 'Lycéen', "Non"),
  createDataUsers(3, require('./images/faces/face8.jpg'), 'Jules', 'Maigret', 'Commisaire', "Non"),
  createDataUsers(4, require('./images/faces/face8.jpg'), 'David', 'Panzoli', 'Dieu ?', "Oui"),
  createDataUsers(5, require('./images/faces/face8.jpg'), 'Naruto', 'Uzumaki', 'Hokage', "Non"),
  createDataUsers(6, require('./images/faces/face8.jpg'), 'Monkey', 'Luffy', 'Pirate', "Non"),
  createDataUsers(7, require('./images/faces/face8.jpg'), 'Natsu', 'Dragnir', 'Salamander', "Non"),
  createDataUsers(8, require('./images/faces/face8.jpg'), 'Arnaud', 'Cros', 'Ark Tryharder', "Oui"),
  createDataUsers(9, require('./images/faces/face8.jpg'), 'Antonin', 'Pidet', 'Fourmi', "Oui"),
  createDataUsers(10, require('./images/faces/face8.jpg'), 'Amadéo', 'Soufflet', 'Pentester', "Oui"),
  createDataUsers(11, require('./images/faces/face8.jpg'), 'François', 'Pouit', 'PuitPuit', "Non"),
  createDataUsers(12, require('./images/faces/face8.jpg'), 'Nicolas', 'Garric', 'Bricoleur', "Non"),
  createDataUsers(13, require('./images/faces/face8.jpg'), 'Laura', 'Brillon', 'Matheuse', "Non"),
  createDataUsers(14, require('./images/faces/face8.jpg'), 'Thierry', 'Montaut', 'Relou', "Non"),

];

try {
  const result = axios.get(
    `/utilisateur`
  );
  
  result.then((resp) =>
    console.log(resp)
    
  );

} catch (err) {
  console.log(err);
}
const columnsUsers = [
  { id: 'image' },
  { id: 'firstname' },
  { id: 'name' },
  { id: 'surname' },
  { id: 'administrateur' },
  { id: "identifiant" }
];



export default function UsersTable() {

  var ind = 0;
  var nom = "Soufflet";
  var prenom = "Amadéo";
  var pseudo = "Ace25";
  console.log(pseudo);

  var admini = true;
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
    rowsUsers = rowsUsers1;
    if (val) {
      var ro = [];
      for (let i = 0; i < rowsUsers.length; i++) {
        var r = (rowsUsers[i].firstname).toUpperCase() + " " + (rowsUsers[i].name).toUpperCase() + " " + (rowsUsers[i].surname).toUpperCase();
        //console.log(r);
        if (r.includes(val)) {
          ro.push(rowsUsers[i]);
        }
      }
      rowsUsers = ro;
    }

    console.log(rowsUsers);

    setPage(1);
    actualiser();
  }

  const [openu, setOpen] = React.useState(false);

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
    alert('utilisateur ' + rowsUsers[i].surname + " supprimé");
  }


  const changer = (i) => {
    console.log(i);
    ind = i - 1;
    nom = rowsUsers[ind].name;
    prenom = rowsUsers[ind].firstname;
    pseudo = rowsUsers[ind].surname;

    if (rowsUsers[ind].administrateur === "Oui") {
      admini = true;
    } else {
      admini = false;
    }
    console.log(rowsUsers[ind].administrateur);
    setOpen(true);
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }}>
      <div>
        <TextField
          id="usersearch"
          label="Recherche"
          defaultValue=""
          variant="standard"
          onChange={() => montrer("usersearch")}
        />
      </div>
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label="sticky table" id="usertable">
          <colgroup>
            <col style={{ width: '16%' }} />
            <col style={{ width: '17%' }} />
            <col style={{ width: '18%' }} />
            <col style={{ width: '17%' }} />
            <col style={{ width: '16%' }} />
            <col style={{ width: '16%' }} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Image</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Prénom</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Nom</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Pseudo</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Administrateur</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Modifier</TableCell>
            </TableRow>
          </TableHead>
          <TableBody id="userrows">
            {rowsUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columnsUsers.map((column, index) => {
                    const value = row[column.id];

                    if ((column.id) !== 'identifiant'){
                      if ((column.id) !== 'image') {
                        return (
                          <TableCell align="center">
                            {value}
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell align="center">
                            <img src={value} style={{ width: "30%", borderRadius: '50%' }} alt="" />
                          </TableCell>
                        );
                      }
                    }

                  })}
                  <TableCell align="center">
                    <IconButton id={row[columnsUsers[2].id]} onClick={() => changer(row[columnsUsers[5].id])}>
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
        count={rowsUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />


      <Dialog onClose={handleClose} open={openu} style={{ textAlign: 'center', contentAlign: 'center' }} fullWidth maxwidth="sm">
        <DialogTitle id="simple-dialog-title"><h2>Modifier utilisateur</h2></DialogTitle>
        <Grid container direction={"column"} spacing={2}>
          <Grid Item>
            Prénom
          </Grid>
          <Grid item>
            <TextField id="userprenom" name="userprenom" label={prenom} required margin="normal" style={{ width: "90%" }} />
          </Grid>
          <Grid Item>
            <br />
          </Grid>
          <Grid Item>
            Nom
          </Grid>
          <Grid item>
            <TextField id="usernom" name="usernom" label={nom} required margin="normal" style={{ width: "90%" }} />
          </Grid>
          <Grid item>
            Administrateur
            {admini
              ? <Switch id="switchUser" defaultChecked />
              : <Switch id="switchUser" />}
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
        <DialogTitle id="simple-dialog-title"><h2>Supprimer utilisateur</h2></DialogTitle>
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
