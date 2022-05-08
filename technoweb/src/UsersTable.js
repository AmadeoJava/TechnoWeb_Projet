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

function createDataUsers(identifiant, firstname, name, surname, administrateur) {
  return { identifiant, firstname, name, surname, administrateur };
}// add data


/*
var rowsUsers = [
  createDataUsers(1, 'Sherlock', 'Holmes', 'Détective', "Oui"),
  createDataUsers(2, 'Shinishi', 'Kudo', 'Lycéen', "Non"),
  createDataUsers(3, 'Jules', 'Maigret', 'Commisaire', "Non"),
  createDataUsers(4, 'David', 'Panzoli', 'Dieu ?', "Oui"),
  createDataUsers(5, 'Naruto', 'Uzumaki', 'Hokage', "Non"),
  createDataUsers(6, 'Monkey', 'Luffy', 'Pirate', "Non")
];

const rowsUsers1 = [
  createDataUsers(1, 'Sherlock', 'Holmes', 'Détective', "Oui"),
  createDataUsers(2, 'Shinishi', 'Kudo', 'Lycéen', "Non"),
  createDataUsers(3, 'Jules', 'Maigret', 'Commisaire', "Non"),
  createDataUsers(4, 'David', 'Panzoli', 'Dieu ?', "Oui"),
  createDataUsers(5, 'Naruto', 'Uzumaki', 'Hokage', "Non"),
  createDataUsers(6, 'Monkey', 'Luffy', 'Pirate', "Non")
];
*/

var rowsUsers = [];
var rowsUsers1 = [];


const columnsUsers = [
  { id: 'firstname' },
  { id: 'name' },
  { id: 'surname' },
  { id: 'administrateur' },
  { id: "identifiant" }
];
var indexKey=0;

var ind = 0;
var nom = "Soufflet";
var prenom = "Amadéo";
var pseudo = "Ace25";
var admini=true;

var toutOkU=true;

export default function UsersTable(rep) {


  const ajouterToListeU = (e) => {
    
    console.log(e.length);

    for(let i=0; i<e.length; i++){
      var el=e[i];
      console.log(el);
      var ad;
      if(el.administrateur==1){
        ad="Oui";
      }else{
        ad="Non";
      }
      rowsUsers.push(createDataUsers(i,el.prenom, el.nom, el.pseudo, ad ));
      rowsUsers1.push(createDataUsers(i,el.prenom, el.nom, el.pseudo, ad ));

    }
  }
  if(toutOkU){
    ajouterToListeU(rep.d);
    toutOkU = false;
  }

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };



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
    ind = i;
    nom = rowsUsers[ind].name;
    prenom = rowsUsers[ind].firstname;
    pseudo = rowsUsers[ind].surname;

    if (rowsUsers[ind].administrateur === "Oui") {
      setChecked(true);
      admini=true;
    } else {
      setChecked(false);
      admini=false;
    }
    console.log(rowsUsers[ind].administrateur);
    setOpen(true);
  }

  var changerUserPost = (u1,u2,u3) => {
    try {
      const result = axios.post(
        `/changerUser/${u1}/${u2}/${u3}`
      );
    } catch (err) {
      console.log(err);
    }
  }

  const changeUser = () =>{
    console.log(prenom+" et "+nom+" et "+admini);
    var ad=0;
    var chosesAChanger=false;
    if($("#userprenom").val()!=prenom && $("#userprenom").val()){
      prenom=$("#userprenom").val();
      chosesAChanger=true;
    }
    if($("#usernom").val()!=nom && $("#usernom").val()){
      nom=$("#usernom").val();
      chosesAChanger=true;
    }
    if(checked!=admini){
      admini=checked;
      if(admini){
        ad=1;
      }
      chosesAChanger=true;
    }
    handleClose();
    if (chosesAChanger){
      changerUserPost(prenom, nom, ad);
      alert("Utilisateur modifié")
    }
    
  }
  

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }}>

      <TextField
        id="usersearch"
        label="Recherche"
        defaultValue=""
        variant="standard"
        onChange={() => montrer("usersearch")}
      />

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
              {indexKey=indexKey+1;}
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={indexKey} >
                  <TableCell>Image de {row["surname"]}</TableCell>
                  {columnsUsers.map((column) => {
                    const value = row[column.id];
                    indexKey=indexKey+1;
                    if ((column.id) !== 'identifiant'){
                      if ((column.id) !== 'image') {
                        return (
                          <TableCell key={indexKey} align="center">
                            {value}
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell key={indexKey} align="center">
                            <img src={value} style={{ width: "30%", borderRadius: '50%' }} alt="" />
                          </TableCell>
                        );
                      }
                    }

                  })}
                  <TableCell align="center">
                    <IconButton id={row[columnsUsers[2].id]} onClick={() => changer(row[columnsUsers[4].id])}>
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
        <DialogTitle id="simple-dialog-title">
          Modifier utilisateur
        </DialogTitle>
        <Grid container direction={"column"} spacing={2}>
          <Grid item>
            Prénom
          </Grid>
          <Grid item>
            <TextField id="userprenom" name="userprenom" label={prenom} required margin="normal" style={{ width: "90%" }} />
          </Grid>
          <Grid item>
            Nom
          </Grid>
          <Grid item>
            <TextField id="usernom" name="usernom" label={nom} required margin="normal" style={{ width: "90%" }} />
          </Grid>
          <Grid item>
            Administrateur
            <Switch id="switchUser" checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }}/>
          </Grid>
          <Grid item>
            <Grid container spacing={2} style={{ justifyContent: "center" }}>
              <Grid item>
                <Button variant="contained" onClick={() => verifier(ind)} style={{ backgroundColor: "red" }}>
                  <DeleteIcon style={{ verticalAlign: "middle" }} />
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={() => changeUser()}>Valider</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
          </Grid>
        </Grid>
      </Dialog>

      <Dialog open={verif} style={{ textAlign: 'center', contentAlign: 'center' }} fullWidth maxwidth="sm">
        <DialogTitle id="simple-dialog-title">
          Supprimer utilisateur
        </DialogTitle>
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
