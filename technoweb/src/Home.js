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




function Home() {


  const fonction = () =>{
    $('#event').remove();
  };

  return(<Box>
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
        <Link to="/form" class="lienAccueil">
          <Button >
          Questionnaire
          </Button>
        </Link>
        <Link to="/login" class="lienAccueil">
          <Button >
            Connexion
          </Button>
        </Link>   
        <Link to="/admin" class="lienAccueil">
          <Button >
            Dashboard
          </Button>
        </Link>  
        </div>
      </div>
    </Toolbar>
  </AppBar>

  </Box>
  <Card sx={{ display: 'flex', width:'100%' }} id="event" >
    <Typography sx={{ flexGrow: 1 }}>
    Ya un event
    </Typography>
    <HighlightOffIcon onClick={fonction}/>
  </Card>
  <div id="mapAccueil" >
  <MapComponent/>
  </div>

  <Card style={{position:'realative', bottom:'0', width:'100%', left:'0'}}>
  <FooterComponent/>
  </Card>
  </Box>
  );
  
}

export default Home;