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
const axios = require('axios');
function createDataEvents(identifiant, image, name, debut, fin, description) {
    return { identifiant, image, name, debut, fin, description};
  }// add data
  /*
  var rowsEvents = [
    createDataEvents(1,require('./images/places/cath.jpg'), 'Carnaval', '24/04/2022', '28/04/2022', "Grand carnaval"),
  ];

  const rowsEvents1 = [
    createDataEvents(1,require('./images/places/cath.jpg'), 'Carnaval', '24/04/2022', '28/04/2022', "Grand carnaval"),
  ];*/

  var rowsEvents =[];
  var rowsEvents1 =[];

 
  const columnEvents = [
    { id: 'image'},
    { id: 'name'},
    { id: 'debut'},
    { id: "fin"},
    { id: 'description'},
    { id: 'identifiant'}
  ];

  var ind;
  var nom;
  var debut;
  var fin;
  var description;
  var index=0;

  var toutOkE=true;

  export default function EventsTable(rep) {
    for(var i=0;i<rep["d"].length;i++){
      try {
        axios.get(`/getEventsImg/${rep["d"][i].pathImgEvent}`);
      } catch (err) {
        console.log(err);
      }
    }

      //console.log(rep.d);

  const ajouterToListeE = (e) => {
    
    //console.log(e.length);

    for(let i=0; i<e.length; i++){
      var el=e[i];
      //console.log(el);

      rowsEvents.push(createDataEvents(el.idEvent,el.pathImgEvent,el.nomEvent,el.dateEventDeb,el.dateEventFin,el.descEvent));
      rowsEvents1.push(createDataEvents(el.idEvent,el.pathImgEvent,el.nomEvent,el.dateEventDeb,el.dateEventFin,el.descEvent));
    }
  }
  if(toutOkE){
    ajouterToListeE(rep.d);
    toutOkE = false;
  }

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

      console.log(rowsEvents);

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
      alert('évènement '+rowsEvents[i].name+" supprimé");
    }
 

    const changer = (i) => {
      console.log(i);
      ind=i-1;
      nom = rowsEvents[ind].name;
      debut = rowsEvents[ind].debut;
      fin = rowsEvents[ind].fin;
      description = rowsEvents[ind].description;
      setOpen(true);
    }

    const changerEvent = () => {
      var trucsAChanger=false;
      if($("#eventnomA").val() && $("#eventnomA").val()!=nom){
        nom=$("#eventnomA").val();
        trucsAChanger=true;
      }
      if($("#eventdebutA").val() && $("#eventdebutA").val()!=debut){
        debut=$("#eventdebutA").val();
        trucsAChanger=true;
      }
      if($("#eventfinA").val() && $("#eventfinA").val()!=fin){
        fin=$("#eventfinA").val();
        trucsAChanger=true;
      }
      if($("#eventdescriptionA").val() && $("#eventdescriptionA").val()!=description){
        description=$("#eventdescriptionA").val();
        trucsAChanger=true;
      }
      handleClose();
      if(trucsAChanger){
        alert("Evenement modifié");
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
          <col style={{width:'50%'}}/>
          <col style={{width:'5%'}}/>
        </colgroup>
        <TableHead>
          <TableRow>
          <TableCell align="center" style={{fontWeight: "bold"}}>Image</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Nom</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Début</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Fin</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Description</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Modifier</TableCell>
          </TableRow>
        </TableHead>
        <TableBody id="userrows">
          {rowsEvents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
            {index=index+1;}
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columnEvents.map((column) => {
                    {index=index+1;}
                    const value = row[column.id];
                    if((column.id) !== 'identifiant'){
                      if ((column.id) !== 'image' ) {
                      return (
                        <TableCell   key={index} align="center">
                          {value}
                        </TableCell>
                      );
                    }else{
                      return (
                        <TableCell key={index} align="center">
                          <img src={"http://localhost:5000/getEventsImg/"+row["pathImgEvent"]} style={{width: '50%'}} alt=""/>
                        </TableCell>
                      );
                    }
                  }else{

                  }
                  })}
                  <TableCell align="center">
                    <IconButton id={row[columnEvents[2].id]} onClick={event=>changer(row[columnEvents[5].id])}>
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
            Nom
          </Grid>
          <Grid item>
              <TextField id="eventnomA" name="eventnom" label={nom} required margin="normal" style={{width: "90%"}}/>
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
