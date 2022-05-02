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

function createDataEvents(identifiant, image, name, date, description) {
    return { identifiant, image, name, date, description};
  }// add data
  var rowsEvents = [
    createDataEvents(1,require('./images/places/cath.jpg'), 'Carnaval', '24/04/2022', "Grand carnaval"),
  ];

  const rowsEvents1 = [
    createDataEvents(1,require('./images/places/cath.jpg'), 'Carnaval', '24/04/2022', "Grand carnaval"),
  ];
  
  // const axios = require('axios');
  // try {
  //   const result = axios.get(
  //     `/event`
  //   );
    
  //   result.then((resp) =>
  //     console.log(resp)
      
  //   );

  // } catch (err) {
  //   console.log(err);
  // }
  const columnEvents = [
    { id: 'image'},
    { id: 'name'},
    { id: 'date'},
    { id: 'description'},
    { id: 'identifiant'}
  ];

  var ind;
  var nom;
  var date;
  var description;

  export default function EventsTable() {
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
      date = rowsEvents[ind].date;
      description = rowsEvents[ind].description;
      setOpen(true);
    }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }}>
      <div>
      <TextField
          id="eventsearch"
          label="Recherche"
          defaultValue=""
          variant="standard"
          onChange={()=>montrer("eventsearch")}
        />
      </div>
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table" id="usertable">
      <colgroup>
          <col style={{width:'15%'}}/>
          <col style={{width:'15%'}}/>
          <col style={{width:'15%'}}/>
          <col style={{width:'50%'}}/>
          <col style={{width:'5%'}}/>
        </colgroup>
        <TableHead>
          <TableRow>
          <TableCell align="center" style={{fontWeight: "bold"}}>Image</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Nom</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Date</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Description</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Modifier</TableCell>
          </TableRow>
        </TableHead>
        <TableBody id="userrows">
          {rowsEvents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columnEvents.map((column) => {
                    const value = row[column.id];
                    if((column.id) !== 'identifiant'){
                      if ((column.id) !== 'image' ) {
                      return (
                        <TableCell key={column.id} align="center">
                          {value}
                        </TableCell>
                      );
                    }else{
                      return (
                        <TableCell key={column.id} align="center">
                          <img src={value} style={{width: '50%'}} alt=""/>
                        </TableCell>
                      );
                    }
                  }
                  })}
                  <TableCell align="center">
                    <IconButton id={row[columnEvents[2].id]} onClick={event=>changer(row[columnEvents[4].id])}>
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
      <DialogTitle id="simple-dialog-title"><h2>Modifier utilisateur</h2></DialogTitle>
        <Grid container direction={"column"} spacing={2}>
          <Grid Item>
            Nom
          </Grid>
          <Grid item>
              <TextField id="eventnom" name="eventnom" label={nom} required margin="normal" style={{width: "90%"}}/>
          </Grid>
          <Grid Item>
            <br/>
          </Grid>
          <Grid Item>
            Date
          </Grid>
          <Grid item>
            <TextField id="eventdate" type="date" name="eventdate" autoComplete={date} required margin="normal" style={{width: "90%"}}/>
          </Grid>
          <Grid Item>
            Description
          </Grid>
          <Grid item>
            <TextField id="eventdescription" name="eventdescription" label={description} required margin="normal" style={{width: "90%"}}/>
          </Grid>
          <Grid item>
            <Grid container spacing={2} style={{  justifyContent:"center"}}>
              <Grid item>
                <Button variant="contained" onClick={()=>verifier(ind)} style={{backgroundColor:"red"}}>
                  <DeleteIcon style={{verticalAlign: "middle"}}/>
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={()=>handleClose()}>Valider</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
          </Grid>
        </Grid>
    </Dialog>

    <Dialog open={verif} style={{textAlign: 'center', contentAlign: 'center'}} fullWidth maxwidth="sm">
      <DialogTitle id="simple-dialog-title"><h2>Supprimer évènement</h2></DialogTitle>
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
