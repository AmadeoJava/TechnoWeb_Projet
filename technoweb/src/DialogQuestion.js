import * as React from 'react';
import $ from "jquery";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
const axios = require('axios');

export default function DialogQuestion() {

  const [openu, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };


  return (


      <Dialog onClose={handleClose} open={openu} style={{ textAlign: 'center', contentAlign: 'center' }} fullWidth maxwidth="sm">
        <DialogTitle id="simple-dialog-title"><h2>Modifier utilisateur</h2></DialogTitle>
        <Grid container direction={"column"} spacing={2}>
          <Grid Item>
            Prénom
          </Grid>
          <Grid Item>
            <br />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={()=>handleClose()}>Valider</Button>
          </Grid>
          <Grid item>
          </Grid>
        </Grid>
      </Dialog>

  );
}
