import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Card from '@mui/material/Card';
import CreateIcon from '@mui/icons-material/Create';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import BarChartIcon from '@mui/icons-material/BarChart';
import ArticleIcon from '@mui/icons-material/Article';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Grid from '@mui/material/Grid';
import UserTable from './UsersTable';
import PlaceTable from './PlacesTable';
import EventTable from './EventsTable';
import Documentation from './Documentation';
import UserProfile from './UserProfile';
import ChartGraphe from './ChartGraphe';
import ReactDOM from 'react-dom';
import './adminpage.css';

const axios = require('axios');
const drawerWidth = 240;






const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));


// Variables Graphes

var toutOkG=true;
var week=["SUN","MON","TUE","WED","THU","FRI","SAT"];
var jour=0;
var tout=[];
var semN=[];
var sem;


///////////////////////////////////

const icones = [<CreateIcon />, <BorderAllIcon />, <BarChartIcon />];

var tableButtons = ["usertablebutton", "placetablebutton", "eventtablebutton"];
var tableForms = ["usertable", "placetable", "eventtable"];


var inputButtons = ["userinputbutton", "placeinputbutton", "eventinputbutton"];
var inputForms = ["userform", "placeform", "eventform"];

var answer;
var answer_array;

var fileName;

var fichier;

var initialisation=true;
var data;

var starter = true;
var timeoutID;

export default function WebProject() {


  // Fonctions Graphes

  const remplirGraphe = (a,sem) =>{
    for(let j=0; j<sem.length;j++){
      var g=sem[j];
      var ve = true;
      for (let i=0; i<a.length; i++){
        var d = a[i];
        if(d.dateFrequentation===g){
          tout.push(d.nbVisites);
          ve=false;
        }
      }
      if(ve){
        tout.push(0);
      }
    }
    //console.log(tout);
  }
  
  const semaine = (l,lm,f,fm) =>{
    var semain=[];
    jour=f.getDay();
    //console.log(f);
    for (let i=1;i<8;i++){
      semN.push(week[(jour+i)%7]);
    }
    //console.log(semN);
    if (f.getMonth()===l.getMonth()){
      for(let i=f.getDate()+1; i<l.getDate()+2;i++){
        var mt=l.getMonth()+1;
        var jo=i;
        if(mt<10){
          mt="0"+mt;
        }
        if(jo<10){
          jo="0"+jo;
        }
        var datess = l.getFullYear()+"-"+mt+"-"+jo;
        semain.push(datess);
      }
    }else{
      for(let i=f.getDate()+1; i<33;i++){
        var mo=l.getMonth()+1;
        var ju=i;
        if(mo<10){
          mo="0"+mo;
        }
        if(ju<10){
          ju="0"+ju;
        }
        var dates = l.getFullYear()+"-"+mo+"-"+ju;
        semain.push(dates);
      }
      for(let i=1; i<l.getDate()+2;i++){
        var m=l.getMonth()+1;
        var j=i;
        if(m<10){
          m="0"+m;
        }
        if(j<10){
          j="0"+j;
        }
        var dat = l.getFullYear()+"-"+m+"-"+j;
        semain.push(dat);
      }
    }
    console.log(semain);
    return semain;
  }
  
  const dateFormat = (d) =>{
    var y = d.getFullYear();
    var m = d.getMonth()+1;
    if (parseInt(m)<10){
      m="0"+m;
    }
    var j = d.getDate();
    if (parseInt(j)<10){
      j="0"+j;
    }
    return(y+"-"+m+"-"+j);
  }
  
  if(toutOkG) {
  
    var curr = new Date();
    //console.log(curr);
    var first = curr.getDate() - curr.getDay()-2;
    var last = first + 6;

    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));

    var fd = dateFormat(firstday);
    var ld = dateFormat(lastday);
    /*
    console.log(firstday);
    console.log(lastday);
    console.log(fd);
    console.log(ld);*/
    sem = semaine(lastday,ld,firstday,fd);
  
    //console.log(sem);
  
    toutOkG=false;
  }

  /////////////////////////////////


  const sha512 = (str) => {
    return crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str)).then(buf => {
      return Array.prototype.map.call(new Uint8Array(buf), x => (('00' + x.toString(16)).slice(-2))).join('');
    });
  }


  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({});

  const afficherAdmin = (e) => {
    //console.log(e.administrateur);
    setUserLogin(e);
    if (e.administrateur === 0) {
      pasAdmin();
    }
  }

  const gererUser = (e) => {
    setUserLogin(e);
    afficherAdmin(e);
  }

  const userLoginfunc = (pseudo) => {
    try {
      const result = axios.get(
        `/user/${pseudo}`
      );

      result.then((resp) =>
      gererUser(resp.data[0])
    );
      //return result;
    } catch (err) {
      console.log(err);
    }
  }
  const uploadImage = (e) => {
    data= new FormData();
    const { files } = e.target;
    data.append('file', files[0]);
    //console.log(files[0]);
  };

  const uploadAPIImageProfile = (e) => {
    try {
      axios.post(
        `/ImageListApiProfile/${e}`,
        data
      );
    } catch (err) {
      console.log(err);
    }
  };
  const uploadAPIImageLieu = (e) => {
    try {
      axios.post(
        `/ImageListApiLieu/${e.img}/${e.ext}`,
        data
      );
    } catch (err) {
      console.log(err);
    }
  };
  const uploadAPIImageEvent= (e) => {
    try {
      axios.post(
        `/ImageListApiEvent/${e.img}/${e.ext}`,
        data
      );
    } catch (err) {
      console.log(err);
    }
  };
  var posterUser = (l) => {
    try {
      axios.post(
        `/userAdd/${l[0]}/${l[1]}/${l[2]}/${l[3]}/${l[4]}`
      );
    } catch (err) {
      console.log(err);
    }
  }

  const ajouterUser = () => {
    if ($("#prenomAdd").val() && $("#nomAdd").val() && $("#pseudoAdd").val() && $("#passwordAdd").val()) {
      if ($("#passwordAdd").val().length >= 8) {
        var userAdd = [];
        if ($("#userlevelAdd").text() === "Gérant") {
          userAdd.push(0);
        } else {
          userAdd.push(1);
        }
        userAdd.push(($("#nomAdd").val()));
        userAdd.push(($("#prenomAdd").val()));
        userAdd.push(($("#pseudoAdd").val()));
        var pass = $("#passwordAdd").val();
        sha512(pass).then(i => {
          userAdd.push(i);
        })
        //console.log(userAdd);
        posterUser(userAdd);
        fileName="";
        $(".files").text="";
        //console.log($("#pseudoAdd").val());
        data.append('filename', $("#pseudoAdd").val());

        uploadAPIImageProfile($("#pseudoAdd").val());
        alert("Utilisateur ajouté");


      }else{
        alert("Le mot de passe est de taille inférieure à 8");
      }
    } else {
      alert("Tous les champs n'ont pas été remplis")
    }
  }

  var posterPlace = (l) => {
    try {
      axios.post(
        `/placeAdd/${l[0]}/${l[1]}/${l[2]}/${l[3]}/${l[4]}/${l[5]}`
      );
    } catch (err) {
      console.log(err);
    }
  }

  const ajouterLieu = () => {
    if ($("#placenom").val() && $("#placelat").val() && $("#placelon").val() && $("#placedesc").val() && $('#placefiles').text() && $('#placefiles').text() === fileName) {
      var placeAdd = [];
      placeAdd.push(parseInt($("#placelat").val()));
      placeAdd.push(parseInt($("#placelon").val()));
      placeAdd.push($("#placenom").val());
      placeAdd.push($("#placecar").text());
      placeAdd.push($("#placedesc").val());
      var f = (fileName).split(".");
      placeAdd.push($("#placenom").val()+"."+f[1]);

      //console.log(placeAdd);
      posterPlace(placeAdd);
      fileName="";
      $(".files").text="";
      data.append('filename', $("#placenom").val());
      
      uploadAPIImageLieu({img:$("#placenom").val(), ext:"."+f[1]});
      alert("Lieu ajouté");
      
    }else{
      alert("Tous les champs ne sont pas remplis");
    }

  }

  var posterEvent = (l) => {
    try {
      axios.post(
        `/eventAdd/${l[0]}/${l[1]}/${l[2]}/${l[3]}/${l[4]}`
      );
    } catch (err) {
      console.log(err);
    }
  }

  const ajouterEvent = () => {
    if ($("#eventnom").val() && $("#eventdatedeb").val() && $("#eventdatefin").val() && $("#eventdesc").val() && $('#eventfiles').text() && $('#eventfiles').text() === fileName) {
      var eventAdd = [];
      eventAdd.push($("#eventnom").val());
      eventAdd.push($("#eventdatedeb").val());
      eventAdd.push($("#eventdatefin").val());
      eventAdd.push($("#eventactifAdd").val())
      eventAdd.push($("#eventdesc").val())
      var f = (fileName).split(".");
      eventAdd.push($("#eventnom").val()+"."+f[1]);
      posterEvent(eventAdd);
      //console.log(eventAdd);

      fileName="";
      $(".files").text="";
      data.append('filename', $("#eventnom").val());
      

      uploadAPIImageEvent({img:$("#eventnom").val(), ext:"."+f[1]});
      alert("Evenement ajouté")
    } else {
      alert("Tous les champs ne sont pas remplis");
    }
  }


  const verifierFile = () => {
    var f = fileName.split(".");
    if (f.length !== 2) {
      alert("Le fichier n'est pas conforme");
      fileName ="";
    }else{
      if(f[1]==="png" || f[1]==="jpg"){
        //console.log("Fichier accepté");
        return true
      } else {
        alert("Le fichier n'est pas conforme");
        fileName = "";
      }
    }
    return false;
  }

  const theme = useTheme();
  const [open, setOpen]=useState(false);
  const listeBox = ["principal", "editer", "table", "graphe", "doc", "profile"];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [anchorEl, setAnchorEl] =useState(null);
  const openit = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  var ouvert = "principal";
  const fermer = (o) => {
    //alert(ouvert);
    //console.log("ouvert = " + o);
    if (o) {
      ouvert = o;
    }
    for (let i = 0; i < (listeBox.length); i++) {
      var a = listeBox[i];
      $("#" + a).css("display", "none");
    }
    $("#" + ouvert).css("display", "initial");
  };

  var selectedi = 0;
  const inputCard = (el) => {
    for (let i = 0; i < inputButtons.length; i++) {
      $("#" + inputButtons[i]).css("color", "#0e8cd4");
      $("#" + inputButtons[i]).css("background-color", "#fff");
      if (inputButtons[i] === el) {
        selectedi = i;
      }
    }
    $("#" + el).css("background-color", "#0e8cd4");
    $("#" + el).css("color", "#fff");
    cardchosed(inputForms, inputForms[selectedi]);
  }


  var selectedt = 0;
  const tableCard = (el) => {
    for (let i = 0; i < tableButtons.length; i++) {
      $("#" + tableButtons[i]).css("color", "#0e8cd4");
      $("#" + tableButtons[i]).css("background-color", "#fff");
      if (tableButtons[i] === el) {
        selectedt = i;
      }
    }
    $("#" + el).css("background-color", "#0e8cd4");
    $("#" + el).css("color", "#fff");
    cardchosed(tableForms, tableForms[selectedt]);
  }

  const cardchosed = (tab, el) => {
    for (let i = 0; i < tab.length; i++) {
      $("#" + tab[i]).hide();
    }
    $("#" + el).show();
  }



  const debut = (function () {

    inputCard(inputButtons[selectedi]);
    tableCard(tableButtons[selectedt]);
    //console.log($("#Administrateur").id);

  })

  window.onbeforeunload = function () {
    if (answer_array[1] === null) {
      //console.log("je suis ici");
      navigate("/login");
    }
    let utilisat = creatUser(params.id);
    verifIP();
    verifUser(utilisat);

  }
  answer = window.location.href;
  //console.log(answer);
  answer_array = answer.split('=');

  function stopperRefresh() {
    window.clearTimeout(timeoutID);
    starter=false;
  }

  if(starter){
    userLoginfunc(answer_array[1]);
  }
  timeoutID = window.setTimeout(stopperRefresh, 400);
   


  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  const delCookie = (cname) => {
    var d = new Date();
    d.setTime(d.getTime() + (0 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=;" + expires + ";path=/";
  }

  const verifIP = (function () {
    if (getCookie("Token")) {
      $.getJSON("https://api.ipify.org?format=json", function (data) {
        sha512(data.ip).then(i => {
          if (i !== getCookie("Token")) {
            delCookie("Token");
            //console.log("Pas bon");
            window.location.href="/";
          }
        })
      })
    }else{
      //console.log("Pas de cookie");
      window.location.href="/";
    }

  })

  const verifUser = (function(u){
    if(getCookie("Token2")){
        sha512(u).then(i=>{
          if(i!==getCookie("Token2")){
            delCookie("Token2");
            //console.log("Pas bon");
            window.location.href="/";
          }
        })
    }else{
      //console.log("Pas de cookie");
      window.location.href="/";
    }
  })

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const creatUser = (u) => {
    var uti = u.charAt(0);
    var le = u.length;
    for (let i = 1; i < le - 1; i++) {
      uti += (u.charAt((le - i) - 1));
    }
    uti += u.charAt(le - 1);
    return uti;
  }

  // adminLevel = classe pour les éléments en + pour admin

  const pasAdmin = () => {
    tableButtons = ["placetablebutton", "eventtablebutton"];
    tableForms = ["placetable", "eventtable"];
    inputButtons = ["placeinputbutton", "eventinputbutton"];
    inputForms = ["placeform", "eventform"];
    debut();
    $(".adminLevel").remove();

  }

  const verifierTout = () => {
    creatUser(params.id);
  }

  const CreerGraphe = (a) => {
    remplirGraphe(a,sem);
    const grap = <ChartGraphe da={tout} j={semN} />;
    ReactDOM.render(grap, document.getElementById('placeGraphe'));
  }

  const ajoutUserTable = (d) => {
    const tableau = <UserTable d={d} />;
    ReactDOM.render(tableau, document.getElementById('usertable'));
    try {
      const result = axios.get(
        `/frequentation`
      );
    
      result.then((resp) =>
        CreerGraphe(resp.data)
      );
  
    } catch (err) {
      console.log(err);
    }
  }

  const ajoutEventTable = (d) => {
    const tableau = <EventTable d={d} />;
    ReactDOM.render(tableau, document.getElementById('eventtable'));
 
    try {
      const result = axios.get(
        `/utilisateur`
      );

      result.then((resp) =>
        ajoutUserTable(resp.data)
      );

    } catch (err) {
      console.log(err);
    }


  }

  const ajoutPlaceTable = (d) => {
    const tableau = <PlaceTable d={d} />;
    ReactDOM.render(tableau, document.getElementById('placetable'));
    try {
      const result = axios.get(
        `/event`
      );

      result.then((resp) =>
        ajoutEventTable(resp.data)
      );

    } catch (err) {
      console.log(err);
    }
  }







  debut();

  window.onload = (function (event) {

    verifierTout();
    debut();

    if (answer_array[1] === null) {
      //console.log("je suis ici");
      navigate("/login");
    }

    cardchosed(inputForms[0]);

    $('#placeupload').change(function (e) {
      var fs = e.target.files.length;  // filesize
      fileName = e.target.files[fs - 1].name;
      var a = verifierFile();
      if (a) {
        fichier = e.target.files[fs - 1];
      }

      $('#placefiles').text(fileName);
      //console.log(fileName);
      return fichier;
    });

    $('#userupload').change(function (e) {
      var fs = e.target.files.length;  // filesize
      fileName = e.target.files[fs - 1].name;
      var a = verifierFile();
      $('#userfiles').text(fileName);
      if (a) {
        fichier = e.target.files[fs - 1];
      }
      return fichier;
    });

    $('#eventupload').change(function (e) {
      var fs = e.target.files.length;  // filesize
      fileName = e.target.files[fs - 1].name;
      var a = verifierFile();
      if (a) {
        fichier = e.target.files[fs - 1];
      }
      $('#eventfiles').text(fileName);
      //console.log(fileName);
      return fichier;
    });

  });

  const AuclicDebut = () => {
    if (initialisation) {
      try {
        const result = axios.get(
          `/lieu`
        );

        result.then((resp) =>
          ajoutPlaceTable(resp.data)
        );

      } catch (err) {
        console.log(err);
      }
      initialisation = false;
    }
  }

  return (

    <Box sx={{ display: 'flex' }} onClick={() => AuclicDebut()}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ backgroundColor: 'rgb(30, 82, 166)' }} >
        <Toolbar id="appBarre">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography onClick={event => fermer("principal")} variant="h6" noWrap component="div" className="clickable">
            Dashboard
          </Typography>

          <div style={{ position: 'fixed', right: 100 }}>
            <img alt="imgAvatar" src={"http://localhost:5000/getImgProfile/" + answer_array[1]} onClick={handleClick} className="clickable" style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '45px',
              height: '45px',
              borderRadius: 100
            }} />
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
              }}
              anchorEl={anchorEl}
              open={openit}
              onClose={handleClose}
            >
              <img src={"http://localhost:5000/getImgProfile/" + answer_array[1]} alt="Profile"
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: '100px',
                  height: '100px',
                  borderRadius: 100
                }} />
                <Typography paragraph style={{ textAlign: 'center' }}>
                  {userLogin.nom} {userLogin.prenom}
              </Typography>


                <Typography paragraph style={{ textAlign: 'center' }}>
                  {userLogin.pseudo}
                </Typography>
              <MenuItem onClick={(event) => { handleClose(); fermer("profile") }} disableRipple className="clickable">
                <EditIcon style={{ color: '#0e8cd4' }} />
                MyProfile
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple className="clickable">
                <PowerSettingsNewIcon style={{ color: 'red' }} />

                <Link to="/">Sign Out</Link>
              </MenuItem>

            </StyledMenu>
          </div>


        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} onClick={handleDrawerClose}>

        <DrawerHeader className="clickable">
          <Typography variant="h4" className="centerDiv">
            Admin
          </Typography>
          <IconButton >
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>

        </DrawerHeader>

        <List>
          {['Ajouter des éléments', 'Tables', 'Graphiques'].map((text, index) => (
            <ListItemButton
              className="clickable"
              onClick={event => fermer(listeBox[index + 1])}
              key={text}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {icones[index]}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
        <List>
          <ListItemButton onClick={event => fermer("doc")}
            className="clickable"
            key="Documentation"
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="Documentation" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </List>
      </Drawer>

      <Box component="main" id="principal" sx={{ flexGrow: 1, p: 3 }} style={{ display: "initial" }}>
        <DrawerHeader />
        <Box className='centerDiv'>
          <h2>Accueil</h2>
          <img src={require('./logo.png')} alt="logo" />
        </Box>
      </Box>


      <Box component="main" id="editer" sx={{ flexGrow: 1, p: 3 }} style={{ display: "none" }}>
        <DrawerHeader />
        <h1 style={{ width: "100%", textAlign: "center" }}>Ajouter des éléments</h1>

        <Card className='centerDiv'>
          <nav className='liste'>
            <Button onClick={event => inputCard("userinputbutton")} id="userinputbutton" style={{ width: "50%" }} sx={{ mt: 3, mb: 2 }} className="adminLevel">
              Utilisateurs
            </Button>
            <Button onClick={event => inputCard("placeinputbutton")} id="placeinputbutton" style={{ width: "50%" }} sx={{ mt: 3, mb: 2 }}>
              Lieux
            </Button>
            <Button onClick={event => inputCard("eventinputbutton")} id="eventinputbutton" style={{ width: "50%" }} sx={{ mt: 3, mb: 2 }}>
              évènements
            </Button>
          </nav>

          <Box id="userform" component="form" onSubmit={event => fermer("principal")} noValidate sx={{ mt: 1 }} className="adminLevel">
            <FormControl style={{ width: "98%" }}>
              <Grid container direction={"column"} spacing={2}>
                <Grid item>
                  <TextField id="prenomAdd" name="userprenom" label="Prénom" required autoComplete="Prénom" margin="normal" style={{ width: "98%" }} />
                </Grid>
                <Grid item>
                  <TextField id="nomAdd" name="usernom" margin="normal" required style={{ width: "98%" }} label="Nom" autoComplete="Nom" />
                </Grid>
                <Grid item>
                  <TextField id="pseudoAdd" name="pseudo" margin="normal" required style={{ width: "98%" }} label="Identifiant" autoComplete="Identifiant" />
                </Grid>
                <Grid item>
                  <TextField id="passwordAdd" name="password" margin="normal" required style={{ width: "98%" }} label="Mot de passe" type="password" autoComplete="Mot de passe" />
                </Grid>
                <Grid item>
                  <TextField select label="Choisissez le niveau de l'utilisateur" id="userlevelAdd" style={{ width: "98%" }} required defaultValue="gerant">
                    <MenuItem value={"gerant"}>
                      Gérant
                    </MenuItem>
                    <MenuItem value={"administrateur"}>
                      Administrateur
                    </MenuItem>
                  </TextField>
                </Grid>
                <Grid item>
                  <Button id="buttonuser" variant="contained" component="label" style={{ width: "98%" }}>
                    Upload File
                    <input
                      id="userupload"
                      style={{ padding: 10 }}
                      type="file"
                      name="file"
                      onChange={uploadImage}
                      accept="image/*"
                      hidden
                    />
                  </Button>
                </Grid>
                <Grid item>
                  <div className="files" id="userfiles">
                  </div>
                </Grid>
                <Grid item>
                  <Button onClick={() => ajouterUser()} style={{ width: "98%" }} variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Ajouter
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
          </Box>

          <Box id="placeform" component="form" onSubmit={event => fermer("principal")} noValidate sx={{ mt: 1 }}>
            <FormControl style={{ width: "98%" }}>
              <Grid container direction={"column"} spacing={2}>
                <Grid item>
                  <TextField id="placenom" name="placenom" label="Nom du lieu" required autoComplete="Nom du lieu" margin="normal" style={{ width: "98%" }} />
                </Grid>
                <Grid item>
                  <TextField id="placelat" name="placelat" margin="normal" required style={{ width: "98%" }} label="Latitude" autoComplete="Latitude" type="number" />
                </Grid>
                <Grid item>
                  <TextField id="placelon" name="placelon" margin="normal" required style={{ width: "98%" }} label="Longitude" autoComplete="Longitude" type="number" />
                </Grid>
                <Grid item>
                  <TextareaAutosize id="placedesc" minRows={5} placeholder="Description du lieu" style={{ width: "98%" }} />
                </Grid>
                <Grid item>
                  <TextField select label="Choisissez la caractéristique du lieu" id="placecar" style={{ width: "98%" }} required defaultValue="culturel">
                    <MenuItem value={"culturel"}>
                      Culturel
                    </MenuItem>
                    <MenuItem value={"restaurant"}>
                      Restaurant
                    </MenuItem>
                    <MenuItem value={"hotel"}>
                      Hotel
                    </MenuItem>
                  </TextField>
                </Grid>
                <Grid item>
                  <Button id="buttonplace" variant="contained" component="label" style={{ width: "98%" }}>
                    Upload File
                    <input
                      id="placeupload"
                      style={{ padding: 10 }}
                      type="file"
                      name="file"
                      onChange={uploadImage}
                      accept="image/*"
                      hidden

                    />
                  </Button>
                </Grid>
                <Grid item>
                  <div className="files" id="placefiles">
                  </div>
                </Grid>
                <Grid item>
                  <Button onClick={() => ajouterLieu()} style={{ width: "98%" }} variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Ajouter
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
          </Box>

          <Box id="eventform" component="form" onSubmit={event => fermer("principal")} noValidate sx={{ mt: 1 }}>
            <FormControl style={{ width: "98%" }}>
              <Grid container direction={"column"} spacing={2}>
                <Grid item>
                  <TextField id="eventnom" name="eventnom" label="Nom de l'évènement" required autoComplete="Nom de l'évènement" margin="normal" style={{ width: "98%" }} />
                </Grid>
                <Grid item>
                  <div>
                    <TextField id="eventdatedeb" label="Date de début" type="date" sx={{ width: "40%", left: "-5%" }} InputLabelProps={{ shrink: true }} />
                    <TextField id="eventdatefin" label="Date de fin" type="date" sx={{ width: "40%", left: "5%" }} InputLabelProps={{ shrink: true }} />
                  </div>
                </Grid>
                <Grid item>
                  <TextField select label="Choisissez si l'évènement est actif ou non" id="eventactifAdd" style={{ width: "98%" }} required defaultValue="Non">
                    <MenuItem value={"Non"}>
                    Non
                    </MenuItem>
                    <MenuItem value={"Oui"}>
                    Oui
                    </MenuItem>
                  </TextField>
                </Grid>
                <Grid item>
                  <TextareaAutosize id="eventdesc" minRows={5} placeholder="Description de l'évènement" style={{ width: "98%" }} />
                </Grid>
                <Grid item>
                  <Button id="buttonevent" variant="contained" component="label" style={{ width: "98%" }}>
                    Upload File
                    <input
                      id="eventupload"
                      style={{ padding: 10 }}
                      type="file"
                      name="file"
                      onChange={uploadImage}
                      accept="image/*"
                      hidden
                    />
                  </Button>
                </Grid>
                <Grid item>
                  <div className="files" id="eventfiles">
                  </div>
                </Grid>
                <Grid item>
                  <Button onClick={() => ajouterEvent()} style={{ width: "98%" }} variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Ajouter
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
          </Box>

        </Card>
      </Box>

      <Box component="main" id="table" sx={{ flexGrow: 1, p: 3 }} style={{ display: "none" }}>
        <DrawerHeader />
        <h1 style={{ width: "100%", textAlign: "center" }}>Tables</h1>

        <Card className='centerDiv' style={{ height: "auto" }}>
          <nav className='liste'>
            <Button onClick={event => tableCard("usertablebutton")} id="usertablebutton" style={{ width: "50%" }} sx={{ mt: 3, mb: 2 }} className="adminLevel">
              Utilisateurs
            </Button>
            <Button onClick={event => tableCard("placetablebutton")} id="placetablebutton" style={{ width: "50%" }} sx={{ mt: 3, mb: 2 }}>
              Lieux
            </Button>
            <Button onClick={event => tableCard("eventtablebutton")} id="eventtablebutton" style={{ width: "50%" }} sx={{ mt: 3, mb: 2 }}>
              Evènements
            </Button>
          </nav>

          <Box style={{ width: "100%", display: "flex", flexFlow: "row nowrap", justifyContent: "center", alignItems: "center" }}>

            <Box id="usertable" noValidate sx={{ mt: 1 }} style={{ width: "98%" }} className="adminLevel">

            </Box>

            <Box id="placetable" noValidate sx={{ mt: 1 }} style={{ width: "98%" }}>
            </Box>

            <Box id="eventtable" noValidate sx={{ mt: 1 }} style={{ width: "98%" }}>
            </Box>

          </Box>


        </Card>
      </Box>

      <Box component="main" id="graphe" sx={{ flexGrow: 1, p: 3 }} style={{ display: "none" }}>
        <DrawerHeader />
        <h1 style={{ width: "100%", textAlign: "center" }}>Graphes</h1>

        <Card className='centerDiv' style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} id="placeGraphe">
        </Card>
      </Box>

      <Box component="main" id="doc" sx={{ flexGrow: 1, p: 3 }} style={{ display: "none" }}>
        <DrawerHeader />
        <h1 style={{ width: "100%", textAlign: "center" }}>Documentation</h1>

        <Documentation que="Quels sont les différents niveaux d'utilisateurs ?" rep={["Administrateur : Droit de modifier Les lieux, évènements et utilisateurs", "Basique : Droit de modifier Les lieux et évènements"]} />

        <Documentation que="Quelles sont les différentes pages ?" rep={["Principale : Accueil", "Stylo : Permet d'ajouter des éléments", "Table : Permet de voir les différents éléments et de les modifier", "Graphes : Permet d'avoir des statistiques sur le site", "Documentation : Permet de trouver les réponses à des questions", "Profil : Permet de voir ses informations et de modifier son mot de passe"]} />
     
        <Documentation que="Comment revenir à l'accueil ?" rep={["De la page Administrateur : Cliquer sur Dashboard en haut à gauche", "Du site : Cliquer sur l'image de l'avatar puis sur Sign Out"]} />

        <Documentation que="Qui sont les créateurs de ce magnifique site ?" rep={["3 étudiants de L3 Informatique à l'Institut National Universitaire Jean-François Champollion : Arnaud, Antonin et Amadéo"]} />

      </Box>

      <Box component="main" id="profile" sx={{ flexGrow: 1, p: 3 }} style={{ display: "none" }}>
        <DrawerHeader />
        <h1 style={{ width: "100%", textAlign: "center" }}>Profil</h1>

        <Card>
          <UserProfile el={["Prénom", "Nom", "Pseudo", "Admninistrateur", "Mot_de_passe"]}
            rep={[userLogin.nom, userLogin.prenom, userLogin.pseudo, String(userLogin.administrateur === 1), "********"]} />
        </Card>
      </Box>

    </Box>

  );
}