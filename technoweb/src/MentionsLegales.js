import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import './css/home.css';
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



  return (<Box id="fond">
    <Box position='relative'>
      <CssBaseline />
      <AppBar id="barreTop" position='relative'>
        <Toolbar>
          <div id='presentation'>
            <img alt='logo' id='logotout' src={require('./images/logo/logo_tout.png')} />
            <img alt='logo' id='logo' src={require('./images/logo/logo.png')} />

          </div>
          <div id="beaucoup">
            <img alt='logo' id='logotexte' src={require('./images/logo/logo_texte.png')} />
            <div id='boutons'>
              <Link to="/" className="lienAccueil">
                <Button >
                  Accueil
                </Button>
              </Link>
              <Link to="/" className="lienAccueil">
                <Button >
                  Jeu de piste
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
      <Card  style={{ backgroundColor: '#ffffff',paddingBottom:'2%',textAlign:'center' }}>
          <h1 style={{borderBottom:'solid 3px #dddddd',width:'30%', marginLeft:'auto',marginRight:'auto'}}>L'équipe</h1>
          <Typography style={{fontSize:'150%'}}>CROS Arnaud</Typography>
          <Typography style={{fontSize:'150%'}}>SOUFFLET Amadéo</Typography>
          <Typography style={{fontSize:'150%'}}>PIDET Antonin</Typography>
      </Card>
      <Card style={{ backgroundColor: '#fdfdfd',paddingBottom:'2%',textAlign:'center'  }}>
          <h1 style={{borderBottom:'solid 3px #dddddd',width:'30%', marginLeft:'auto',marginRight:'auto'}}>Contact</h1>
          <Typography style={{fontSize:'150%'}}>service-client@champo.cf</Typography>
      </Card>
      <Card style={{ backgroundColor: '#ffffff',paddingBottom:'2%',textAlign:'center'  }}>
          <h1 style={{borderBottom:'solid 3px #dddddd',width:'30%', marginLeft:'auto',marginRight:'auto'}}>Hebergeur</h1>
          <a style={{fontSize:'150%'}} href="https://www.alwaysdata.com/">alwaysdata</a>
          <br></br>
      </Card>
      <Card variant='outlined' style={{ backgroundColor: '#fdfdfd',paddingBottom:'2%'  }}>
        <h1 style={{paddingLeft:'1%'}}>Politique de confidentialité:</h1>
        <Typography style={{paddingLeft:'1%',fontSize:'150%'}}>Les cookies que nous utilisons ne sont pas récoltés, mais seulement utilisés afin de rendre le site plus agréable.</Typography>
        <br></br>
      </Card>
    </Box>
    <FooterComponent />
  </Box>
  );

}

export default MentionsLegales;