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




function MentionsLegales() {


  const fonction = () =>{
    $('#event').remove();
  };

  return(<Box id="fond">
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
        <Link to="/form" className="lienAccueil">
          <Button >
          Questionnaire
          </Button>
        </Link>
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
    <Box >
        <h1>L'équipe:</h1>
        <h2>Développeurs</h2>
        <Typography>CROS Arnaud</Typography>
        <Typography>SOUFFLET Amadéo</Typography>
        <Typography>PIDET Antonin</Typography>
        <h1>Contact:</h1>
        <h2>Mail</h2>
        <Typography>service-client@champo.cf</Typography>
        <h1>Autres:</h1>
        <h2>Hebergeur</h2>
        <a href="https://www.alwaysdata.com/">alwaysdata</a>
        <br></br>
        <h1>Politique de confidentialité:</h1>
        <Typography>Vos données sont utilisées pour vous espionner, trouver votre adresse et venir vous faire un bisou sur le front</Typography>
        <br></br>
    </Box>
    <FooterComponent/>
    </Box>
    );
  
}

export default MentionsLegales;