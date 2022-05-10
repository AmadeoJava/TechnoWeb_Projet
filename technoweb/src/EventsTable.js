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

function createDataEvents(image, name, debut, fin, actif, description, identifiant) {
    return {image, name, debut, fin, actif, description, identifiant};
  }// add data

  var rowsEvents =[];
  var rowsEvents1 =[];

 
  const columnEvents = [
    { id: 'image'},
    { id: 'name'},
    { id: 'debut'},
    { id: "fin"},
    { id: 'actif'},
    { id: 'description'},
    { id: 'identifiant' }
  ];

  var ind;
  var nom;
  var debut;
  var fin;
  var description;
  var index=0;
  var act = false;

  var toutOkE=true;

  export default function EventsTable(rep) {

  const ajouterToListeE = (e) => {
    

    for(let i=0; i<e.length; i++){
      var el=e[i];
      var a="Non";
      if(el.actif){
        a="Oui";
      }
      rowsEvents.push(createDataEvents(el.pathImgEvent,el.nomEvent,el.dateEventDeb,el.dateEventFin,a,el.descEvent,i));
      rowsEvents1.push(createDataEvents(el.pathImgEvent,el.nomEvent,el.dateEventDeb,el.dateEventFin,a,el.descEvent,i));
    }
  }
  if(toutOkE){
    ajouterToListeE(rep.d);
    toutOkE = false;
  }


  const [checkedE, setcheckedE] = React.useState(true);

  const handleChangeE = (event) => {
    if(checkedE){
      setcheckedE(false);
    }else{
      setcheckedE(true);
    }
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

    const myfonction = () =>{
      setPage(0);
      clearInterval(timeou);
    };

    const actualiser = () => {
      timeou = setTimeout(myfonction, 1);
    }

    const montrer = (el) =>{
      var val = $("#"+el).val();
      val = val.toUpperCase();
      //console.log(val);
      rowsEvents=rowsEvents1;
      if (val){
        var ro=[];
        for (let i = 0; i <rowsEvents.length; i++){
          var r =(rowsEvents[i].name).toUpperCase();
          //console.log(r);
          if(r.includes(val)){
            ro.push(rowsEvents[i]);
          }
        }
        rowsEvents=ro;
      }

      //console.log(rowsEvents);

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
      //console.log(verif);
    }


    const verifier = () => {
      handleClose();
      setVerif(true);
    }

    const supprimer = (i) => {
      verifclose();
      alert('évènement '+rowsEvents[i].name+" supprimé");
    }
 

    const changer = (i) => {
      //console.log(i);
      ind=i;
      nom = rowsEvents[ind].name;
      debut = rowsEvents[ind].debut;
      fin = rowsEvents[ind].fin;
      description = rowsEvents[ind].description;
      if (rowsEvents[ind].actif === "Oui") {
        setcheckedE(true);
        act=true;
      } else {
        setcheckedE(false);
        act=false;
      }
      setOpen(true);
    }

    var changerEventPost = (u1,u2,u3,u4,u5) => {
      try {
        axios.post(
          `/changerEvent/${u1}/${u2}/${u3}/${u4}/${u5}`
        );
      } catch (err) {
        console.log(err);
      }
    }

    const changerEvent = () => {
      var trucsAChanger=false;
      var adE=0;
      if($("#eventnomA").val() && $("#eventnomA").val()!==nom){
        nom=$("#eventnomA").val();
        trucsAChanger=true;
      }
      if($("#eventdebutA").val() && $("#eventdebutA").val()!==debut){
        debut=$("#eventdebutA").val();
        trucsAChanger=true;
      }
      if($("#eventfinA").val() && $("#eventfinA").val()!==fin){
        fin=$("#eventfinA").val();
        trucsAChanger=true;
      }
      
      if($("#eventdescriptionA").val() && $("#eventdescriptionA").val()!==description){
        description=$("#eventdescriptionA").val();
        trucsAChanger=true;
      }
      if(checkedE!==act){
        act=checkedE;
        if(act){
          adE=1;
        }
        trucsAChanger=true;
      }
      handleClose();
      if(trucsAChanger){
        alert("Evenement modifié");
        changerEventPost(nom,debut,fin,adE,description);
      }
    }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }}>
      <TextField
          id="eventsearch"
          label="Recherche"
          defaultValue=""
          variant="standard"
          onChange={()=>montrer("eventsearch")}
        />

    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table" id="usertable">
      <colgroup>
          <col style={{width:'15%'}}/>
          <col style={{width:'10%'}}/>
          <col style={{width:'10%'}}/>
          <col style={{width:'10%'}}/>
          <col style={{width:'5%'}}/>
          <col style={{width:'45%'}}/>
          <col style={{width:'5%'}}/>
        </colgroup>
        <TableHead>
          <TableRow>
          <TableCell align="center" style={{fontWeight: "bold"}}>Image</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Nom</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Début</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Fin</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Actif</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Description</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Modifier</TableCell>
          </TableRow>
        </TableHead>
        <TableBody id="userrows">
          {rowsEvents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
            index=index+1;
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columnEvents.map((column) => {
                    index=index+1;
                    const value = row[column.id];
                    if ((column.id) !== 'identifiant') {

                    if ((column.id) !== 'image' ) {
                      return (
                        <TableCell   key={index} align="center">
                          {value}
                        </TableCell>
                      );
                    }else{
                      return (
                        <TableCell key={index} align="center">
                          <img src={"http://localhost:5000/getEventsImg/"+row["image"]} style={{width: '50%'}} alt=""/>
                        </TableCell>
                      );
                  }
                }else{
                  return true;
                }
                  })}
                  <TableCell align="center">
                    <IconButton id={row[columnEvents[2].id]} onClick={event=>changer(row[columnEvents[6].id])}>
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
      count={rowsEvents.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />

<Dialog onClose={handleClose} open={open} style={{textAlign: 'center', contentAlign: 'center'}} fullWidth maxwidth="sm">
      <DialogTitle id="simple-dialog-title">Modifier évènement</DialogTitle>
        <Grid container direction={"column"} spacing={2}>
          <Grid item>
            <h2>{nom}</h2>
          </Grid>
          <Grid item>
            Date de début
          </Grid>
          <Grid item>
            <TextField id="eventdebutA" type="date" name="eventdebut" autoComplete={debut} required margin="normal" style={{width: "90%"}}/>
          </Grid>
          <Grid item>
            Date de fin
          </Grid>
          <Grid item>
            <TextField id="eventfinA" type="date" name="eventfin" autoComplete={fin} required margin="normal" style={{width: "90%"}}/>
          </Grid>
          <Grid item>
            Actif
            <Switch id="switchEvent" checked={checkedE} onChange={handleChangeE} inputProps={{ 'aria-label': 'controlled' }}/>
          </Grid>
          <Grid item>
            Description
          </Grid>
          <Grid item>
            <textarea id="eventdescriptionA" name="eventdescription" label={description} required margin="normal" style={{width: "90%"}}/>
          </Grid>
          <Grid item>
            <Grid container spacing={2} style={{  justifyContent:"center"}}>
              <Grid item>
                <Button variant="contained" onClick={()=>verifier(ind)} style={{backgroundColor:"red"}}>
                  <DeleteIcon style={{verticalAlign: "middle"}}/>
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={()=>changerEvent()}>Valider</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
          </Grid>
        </Grid>
    </Dialog>

    <Dialog open={verif} style={{textAlign: 'center', contentAlign: 'center'}} fullWidth maxwidth="sm">
      <DialogTitle id="simple-dialog-title">Supprimer évènement</DialogTitle>
        <Grid container direction={"column"} spacing={2}>
          <Grid item>
            <Grid container spacing={2} style={{  justifyContent:"center"}}>
              <Grid item>
                <Button variant="contained" onClick={()=>verifclose()} style={{backgroundColor:"red"}}>
                  Annuler
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={()=>supprimer(ind)}>Valider</Button>
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
