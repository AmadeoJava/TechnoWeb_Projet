import * as React from 'react';
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
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import profile from './images/faces/face8.jpg';
import Card from '@mui/material/Card';
import CreateIcon from '@mui/icons-material/Create';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import BarChartIcon from '@mui/icons-material/BarChart';
import Checkbox from '@mui/material/Checkbox';
import ArticleIcon from '@mui/icons-material/Article';
import $ from "jquery";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import UserTable from './UsersTable';
import Documentation from './Documentation';
import './adminpage.css';

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


const icones=[<CreateIcon/>, <BorderAllIcon/>, <BarChartIcon/>];

export default function WebProject() {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const listeBox = ["principal", "editer", "table", "graphe", "doc"];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
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
    console.log(o);
    if (o){
      ouvert = o;
    }
    for (let i=0;  i<(listeBox.length); i++){
      var a = listeBox[i];
      $("#"+a).css("display", "none");
    }
    $("#"+ouvert).css("display", "initial");
  };

  const inputButtons = ["userinputbutton", "placeinputbutton", "eventinputbutton"];
  const inputForms = ["userform", "placeform", "eventform"];
  var selectedi=0;
  const inputCard = (el) =>{
    for (let i=0 ;i<inputButtons.length; i++){
      $("#"+inputButtons[i]).css("color","#0e8cd4");
      $("#"+inputButtons[i]).css("background-color","#fff");
      if(inputButtons[i]==el){
        selectedi=i;
      }
    }
    $("#"+el).css("background-color","#0e8cd4");
    $("#"+el).css("color","#fff");
    cardchosed(inputForms,inputForms[selectedi]);
  }

  const tableButtons = ["usertablebutton", "placetablebutton", "eventtablebutton"];
  const tableForms = ["usertable", "placetable", "eventtable"];
  var selectedt=0;
  const tableCard = (el) =>{
    for (let i=0 ;i<tableButtons.length; i++){
      $("#"+tableButtons[i]).css("color","#0e8cd4");
      $("#"+tableButtons[i]).css("background-color","#fff");
      if(tableButtons[i]==el){
        selectedt=i;
      }
    }
    $("#"+el).css("background-color","#0e8cd4");
    $("#"+el).css("color","#fff");
    cardchosed(tableForms,tableForms[selectedt]);
  }

  const cardchosed = (tab,el) =>{
    for(let i=0; i<tab.length; i++){
      $("#"+tab[i]).hide();
    }
    $("#"+el).show();
  }

  const setValue = (valu) => {
    $("#userselect").val(valu);
  }

  window.onload = (function() {
    fermer("principal");
    inputCard(inputButtons[selectedi]);
    tableCard(tableButtons[selectedt]);
    cardchosed(inputForms[0]);
    $('#placeupload').change(function(e){
      var fs=e.target.files.length;  // filesize
      var fileName = e.target.files[fs-1].name;
      $('#placefiles').text(fileName);
      console.log(fileName);
    });
    $('#userupload').change(function(e){
      var fs=e.target.files.length;  // filesize
      var fileName = e.target.files[fs-1].name;
      $('#userfiles').text(fileName);
      console.log(fileName);
    });
    $('#eventupload').change(function(e){
      var fs=e.target.files.length;  // filesize
      var fileName = e.target.files[fs-1].name;
      $('#eventfiles').text(fileName);
      console.log(fileName);
    });
  });



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ backgroundColor: '#4f4f4f' }}>
        <Toolbar>
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
          <div onClick={event =>  fermer("principal")}>
          <Typography variant="h6" noWrap component="div" className="clickable">
            Dashboard
          </Typography>
          </div>

          <div style={{ position: 'fixed', right: 100 }} >
          <Avatar alt="D" src={profile} onClick={handleClick}  className="clickable" />
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
              }}
              anchorEl={anchorEl}
              open={openit}
              onClose={handleClose}
            >
              <img src={profile} alt="Profile" 
              style={{display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                width:'100px',
                height:'100px' ,
                borderRadius:100}}>
                </img>
                <Typography paragraph style={{textAlign:'center'}}>
                Allen Moreno
                </Typography>
                <Typography paragraph style={{textAlign:'center'}}>
                esoreno@gmail.com
                </Typography>
              <MenuItem onClick={handleClose} disableRipple className="clickable">
                <EditIcon />
                MyProfile
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple className="clickable">
                <PowerSettingsNewIcon />
                Sign Out
              </MenuItem>

            </StyledMenu>
          </div>
          
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        
        <DrawerHeader onClick={handleDrawerClose} className="clickable">
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
              onClick={event =>  fermer(listeBox[index+1])}
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
            <ListItemButton onClick={event =>  fermer("doc")}
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
                <ArticleIcon/>
              </ListItemIcon>
              <ListItemText primary="Documentation" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
        </List>
      </Drawer>

      <Box component="main" id="principal" sx={{ flexGrow: 1, p: 3 }} >
        <DrawerHeader />
          <Card className='centerDiv'>
            <h2>Endroit le plus visité</h2>
            <img src={require('./logo.png')} alt="logo" />
          </Card>
      </Box>

      <Box component="main" id="editer" sx={{ flexGrow: 1, p: 3 }} >
        <DrawerHeader />
          <div style={{width:"100%",textAlign:"center"}}>
            <h1>Ajouter des éléments</h1>
          </div>
          <Card className='centerDiv'>
            <nav className='liste'>
              <Button onClick={event=>inputCard("userinputbutton")} id="userinputbutton" style={{width: "50%"}} sx={{ mt: 3, mb: 2 }}>
                Utilisateurs
              </Button>
              <Button onClick={event=>inputCard("placeinputbutton")} id="placeinputbutton" style={{width: "50%"}} sx={{ mt: 3, mb: 2 }}>
                Lieux
              </Button>
              <Button onClick={event=>inputCard("eventinputbutton")} id="eventinputbutton" style={{width: "50%"}} sx={{ mt: 3, mb: 2 }}>
                Evènements
              </Button>
            </nav>

            <Box id="userform" component="form" onSubmit={event => fermer("principal")} noValidate sx={{ mt: 1 }}>
              <FormControl style={{ width: "98%"}}>
                <Grid container direction={"column"} spacing={2}>
                  <Grid item>
                    <TextField id="userprenom" name="userprenom" label="Prénom" required autoComplete="Prénom"  margin="normal" style={{width: "98%"}}/>
                  </Grid>
                  <Grid item>
                    <TextField id="usernom" name="usernom" margin="normal" required style={{width: "98%"}} label="Nom" autoComplete="Nom" />
                  </Grid>
                  <Grid item>
                    <TextField id="pseudo" name="pseudo" margin="normal" required style={{width: "98%"}} label="Identifiant" autoComplete="Identifiant" />
                  </Grid>
                  <Grid item>    
                    <TextField id="password" name="password" margin="normal" required style={{width: "98%"}} label="Mot de passe" type="password" autoComplete="Mot de passe"/>
                  </Grid>
                  <Grid item>
                    <TextField select label="Choisissez le niveau de l'utilisateur" id="userlevel" style={{width: "98%"}} required>
                      <MenuItem value={"gerant"}>
                            Gérant
                      </MenuItem>
                      <MenuItem value={"administrateur"}>
                        Administrateur
                      </MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item>
                    <Button id="buttonuser" variant="contained" component="label" style={{ width: "98%"}}>
                      Upload File
                      <input type="file" id="userupload" hidden/>
                    </Button>
                  </Grid>
                  <Grid item>
                    <div id="userfiles">
                    </div>
                  </Grid>
                  <Grid item>
                    <Button type="submit" style={{width: "98%"}} variant="contained" sx={{ mt: 3, mb: 2 }}>
                      Ajouter
                    </Button>
                  </Grid>
                </Grid>
              </FormControl>
            </Box>

            <Box id="placeform" component="form" onSubmit={event =>  fermer("principal")} noValidate sx={{ mt: 1 }}>
              <FormControl style={{ width: "98%"}}>
                <Grid container direction={"column"} spacing={2}>
                  <Grid item>
                    <TextField id="placenom" name="placenom" label="Nom du lieu" required autoComplete="Nom du lieu"  margin="normal" style={{width: "98%"}}/>
                  </Grid>
                  <Grid item>
                    <TextField id="placelat" name="placelat" margin="normal" required style={{width: "98%"}} label="Latitude" autoComplete="Latitude" type="number" />
                  </Grid>
                  <Grid item>
                    <TextField id="placelon" name="placelon" margin="normal" required style={{width: "98%"}} label="Longitude" autoComplete="Longitude" type="number" />
                  </Grid>
                  <Grid item>
                    <TextareaAutosize minRows={3} placeholder="Description du lieu" style={{ width: "98%" }}/>
                  </Grid>
                    <div>
                      <label for="c1">Culturel</label>
                      <Checkbox id="c1" {...'label'} size="medium" />
                      <label for="c2">Restaurant</label>
                      <Checkbox id="c2" {...'label'} size="medium" />
                    </div>
                  <Grid item>
                    <Button id="buttonplace" variant="contained" component="label" style={{ width: "98%"}}>
                      Upload File
                      <input type="file" id="placeupload" hidden/>
                    </Button>
                  </Grid>
                  <Grid item>
                    <div id="placefiles">
                    </div>
                  </Grid>
                  <Grid item>
                    <Button type="submit" style={{width: "98%"}} variant="contained" sx={{ mt: 3, mb: 2 }}>
                      Ajouter
                    </Button>
                  </Grid>
                </Grid>
              </FormControl>
            </Box>

            <Box id="eventform" component="form" onSubmit={event =>fermer("principal")} noValidate sx={{ mt: 1 }}>
              <FormControl style={{ width: "98%"}}>
              <Grid container direction={"column"} spacing={2}>
                <Grid item>
                  <TextField id="eventnom" name="eventnom" label="Nom de l'évènement" required autoComplete="Nom de l'évènement"  margin="normal" style={{width: "98%"}}/>
                </Grid>
                <Grid item>
                  <TextField id="eventdate" name="eventdate" margin="normal" required style={{width: "98%"}} type="date" autoComplete="Date de l'évènement"/>
                </Grid>
                <Grid item>
                  <Button id="buttonevent" variant="contained" component="label" style={{ width: "98%"}}>
                    Upload File
                    <input type="file" id="eventupload" hidden/>
                  </Button>
                </Grid>
                <Grid item>
                  <div id="eventfiles">
                  </div>
                </Grid>
                <Grid item>
                  <Button type="submit" style={{width: "98%"}} variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Ajouter
                  </Button>
                </Grid>
              </Grid>
              </FormControl>
            </Box>

          </Card>
      </Box>

      <Box component="main" id="table" sx={{ flexGrow: 1, p: 3 }} >
        <DrawerHeader />
          <div style={{width:"100%",textAlign:"center"}}>
            <h1>Tables</h1>
          </div>
          <Card className='centerDiv'>
            <nav className='liste'>
              <Button onClick={event=>tableCard("usertablebutton")} id="usertablebutton" style={{width: "50%"}} sx={{ mt: 3, mb: 2 }}>
                Utilisateurs
              </Button>
              <Button onClick={event=>tableCard("placetablebutton")} id="placetablebutton" style={{width: "50%"}} sx={{ mt: 3, mb: 2 }}>
                Lieux
              </Button>
              <Button onClick={event=>tableCard("eventtablebutton")} id="eventtablebutton" style={{width: "50%"}} sx={{ mt: 3, mb: 2 }}>
                Evènements
              </Button>
            </nav>

            <Box id="usertable" component="table" noValidate sx={{ mt: 1 }} style={{width: "98%"}}>
              <UserTable/>
            </Box>

            <Box id="placetable" component="table" noValidate sx={{ mt: 1 }} style={{width: "98%"}}>
              <h1>Place</h1>
            </Box>

            <Box id="eventtable" component="table" noValidate sx={{ mt: 1 }} style={{width: "98%"}}>
              <h1>event</h1>
            </Box>

          </Card>
      </Box>

      <Box component="main" id="graphe" sx={{ flexGrow: 1, p: 3 }} >
        <DrawerHeader />
          <div style={{width:"100%",textAlign:"center"}}>
            <h1>Graphes</h1>
          </div>
          <Card className='centerDiv'>
            <h2>Mets les graphes ici</h2>
          </Card>
      </Box>

      <Box component="main" id="doc" sx={{ flexGrow: 1, p: 3 }} >
        <DrawerHeader />
          <div style={{width:"100%",textAlign:"center"}}>
            <h1>Documentation</h1>
          </div>
          
          <br/>
          <Documentation que="Quels sont les différents niveaux d'utilisateurs ?" rep={["Administrateur : Droit de modifier Les lieux, évènements et utilisateurs", "Basique : Droit de modifier Les lieux et évènements"]}/>

      </Box>
      
    </Box>
  );
}
