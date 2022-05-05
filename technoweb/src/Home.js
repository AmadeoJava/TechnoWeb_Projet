import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import './home.css';
import $ from "jquery";
import MapComponent from "./MapComponent";
import { Link } from "react-router-dom";
import FooterComponent from "./FooterComponent";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
const axios = require('axios');

//import './index.css';


const drawerWidth = 240;



const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


var guide = 0;

function Home() {

  const [openD, setOpenD] = React.useState(true);

  const handleCloseD = () => {
    setOpenD(false);
  };

  const handleOpenD = () => {
    setOpenD(true);
  };

  const fonction = () =>{
    $('#event').remove();
  };

  return(
  <Box id="fond">
  <Box position='relative'> 
    <CssBaseline />
    <AppBar id="barreTop" position='relative'>
    <Toolbar>
      <div id='presentation'>
      <img alt='logo' id='logotout' src={require('./images/logo/logo_tout.png')}/>
      <img alt='logo' id='logo' src={require('./images/logo/logo.png')}/>
      
      </div>
      <div id="beaucoup">
        <img alt='logo' id='logotexte' src={require('./images/logo/logo_texte.png')}/>
        <div id='boutons'>
        <Link to="/" className="lienAccueil">
          <Button >
          Accueil
          </Button>
        </Link>
        <div className="lienAccueil">
          <Button onClick={()=>handleOpenD()}>
          Jeu de piste
          </Button>
        </div>
        <Link to="/login" className="lienAccueil">
          <Button id="lastButton" >
          Connexion
          </Button>
        </Link>  
        </div>
      </div>
    </Toolbar>
  </AppBar>

  </Box>
  <Card sx={{ display: 'flex', width:'100%' }} id="event" style={{backgroundColor:"rgb(30, 82, 166)"}}>
    <div style={{width:"100%"}}>
        <div style={{width:"92%", display:"inline-block", textAlign:"center"}}>
          <h1 style={{color:"#fff"}}>Evénement</h1>
        </div>
        <div style={{width:"8%", display:"inline-block", cursor:"pointer"}}>
          <HighlightOffIcon onClick={fonction}  style={{color:"#fff"}}/>
        </div>
    </div>
  </Card>

  <MapComponent/>

  <Dialog onClose={handleCloseD} open={openD} style={{ textAlign: 'center', contentAlign: 'center' }} fullWidth maxwidth="sm">
      <DialogTitle id="simple-dialog-title">
        <h2>Jeu de piste</h2>
      </DialogTitle>
      <Grid container direction={"column"} spacing={2}>
        <Grid Item>
          Souhaitez vous faire le jeu de piste spécialement conçu pour vous ? 
        </Grid>
        <Grid Item>
          <br />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={()=>handleCloseD()}>Valider</Button>
        </Grid>
        <Grid item>
        </Grid>
      </Grid>
    </Dialog>

  <FooterComponent/>
  </Box>
  );
  
}

export default Home;