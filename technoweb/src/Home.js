import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
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
import QuestionRad from './QuestionRad'
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
var piste = false;
var questionsPossibles=new Array();

const requeteQuestions = () => {
  try {
    const result = axios.get(
      `/listQuestionsReponses`
    );

    return result;
  } catch (err) {
    console.log(err);
  }
}
const requetemap = () => {
  try {
    const result = axios.get(
      `/map`
    );
    return result;
  } catch (err) {
    console.log(err);
  }
}

const CréeQuestPos = async (questions) =>{
  for (let i=0;i<(Math.floor(questions.length/4));i++){
    questionsPossibles.push(questions[i*4].idQuestionL);
  } 
}

function Home() {

  const [question,setQuestion] = useState("Souhaitez vous faire le jeu de piste spécialement conçu pour vous ? ");

  const [reponses,setReponses] = useState({});
  const [map,setmap] = useState({});

  const [questions, setQuestions] = useState({});

  const [boolRep, setBoolRep] = useState({});

  useEffect(() => {
    requeteQuestions().then((resp) => {setQuestions(resp.data)});   
    CréeQuestPos(questions);
  }, []);

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  const delCookie = (cname) => {
    var d = new Date();
    d.setTime(d.getTime() + (0*60*1000));
    var expires = "expires="+d.toUTCString();  
    document.cookie = cname + "=" + '' + ";" + expires + ";path=/";
  }

  const [openD, setOpenD] = useState(false);

  const handleCloseD = () => {
    setOpenD(false);
  };

  const handleOpenD = () => {
    setOpenD(true);
  };

  const fonction = () =>{
    $('#event').remove();
  };

  const TireQuests = () =>{
    console.log("je tire une question");
    var hasard=Math.floor(Math.random() * (Math.floor(questions.length/4))-1)*4;
    setQuestion(questions[hasard].texteQuestionL);
    setReponses({resp:[questions[hasard].idReponseL,questions[hasard+1].idReponseL,questions[hasard+2].idReponseL,questions[hasard+3].idReponseL],reponse:[questions[hasard].texteReponseL,questions[hasard+1].texteReponseL,questions[hasard+2].texteReponseL,questions[hasard+3].texteReponseL],ima:[questions[hasard].pathImgReponseL,questions[hasard+1].pathImgReponseL,questions[hasard+2].pathImgReponseL,questions[hasard+3].pathImgReponseL]});
    console.log("ici");
    console.log(questionsPossibles);
    console.log(questions.length);
  }

  const OuiJeu = () =>{
    handleCloseD();
    piste=true;
    TireQuests();
    document.cookie = "jeu=oui";
  }

  const NonJeu = () =>{
    handleCloseD();
    document.cookie = "jeu=non";
  }

  window.onload = () => {

    requetemap().then((resp) => {setmap(resp.data)});
    
    if(! getCookie("jeu")){
      setOpenD(true);
    }
  }

  const test = () =>{
      handleCloseD();
      var resultat;
      var t = $(".chek");
      console.log(t);
      for(var a of t){
        resultat=a.id;
      }
      console.log(resultat);
      alert(questions[resultat-1].bonneRep===1);
      TireQuests();
  }
  


  
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
          <Button onClick={()=>{delCookie("jeu");handleOpenD()}}>
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

  <MapComponent el={map}/>

  <Dialog onClose={handleCloseD} open={openD} style={{ textAlign: 'center', contentAlign: 'center' }} fullWidth maxwidth="sm">
      <DialogTitle id="simple-dialog-title">
        Jeu de piste
      </DialogTitle>
      <Grid container direction={"column"} spacing={2}>
        <Grid item>
          {question}
        </Grid>
        <Grid item>
          <div></div>
        </Grid>
        { piste ?
            <Grid item>
              <Grid container direction={"column"} spacing={2}>
                <Grid item>
                  <QuestionRad resp={reponses.resp} reponse={reponses.reponse} type="lieux" ima={reponses.ima}/>
                </Grid>
                <Grid item>
                </Grid>
                <Grid item>
                  <Button  variant="contained" id="valider" onClick={()=>{test()}}>Valider</Button>
                </Grid>
              </Grid>
            </Grid>


          :
          <Grid item>
            <Box component="span" m={1} display="flex" justifyContent="space-between" alignItems="center">
              <Button variant="contained" sx={{ height: 40 }} onClick={()=>NonJeu()} style={{backgroundColor:"#e63622"}}>
                Pas interessé
              </Button>
              <Button variant="contained" sx={{ height: 40 }} onClick={()=>OuiJeu()}>
                Oui, bien sûr
              </Button>
            </Box>
          </Grid>

        }

        <Grid item>
        </Grid>
      </Grid>
    </Dialog>

  <FooterComponent/>
  </Box>
  );
  
}

export default Home;