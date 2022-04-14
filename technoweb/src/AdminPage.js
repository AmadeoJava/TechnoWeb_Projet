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
import ArticleIcon from '@mui/icons-material/Article';
import $ from "jquery";
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
    //console.log(o);
    if (o){
      ouvert = o;
    }
    for (let i=0;  i<(listeBox.length); i++){
      var a = listeBox[i];
      $("#"+a).css("display", "none");
    }
    $("#"+ouvert).css("display", "initial");
  };

  const inputCards = ["userinputbutton", "placeinputbutton", "eventinputbutton"];
  const inputCard = (el) =>{
    alert(el);
    for (let i=0;  i<(inputCards.length); i++){
      var a = inputCards[i];
      $("#"+a).attr("variant", "text")
    }
    $("#"+el).attr("variant", "contained")
  }

  window.onload = (function() {
    fermer("principal");
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
          <Card className='centerDiv'>
            <h2>Ajouter des éléments</h2>
            <Toolbar>
              <Button variant="contained" id="userinputbutton" onClick={()=>inputCard("userinputbutton")}>Utilisateurs</Button>
              <Button variant="text" id="placeinputbutton" onClick={()=>inputCard("placeinputbutton")}>Lieux</Button>
              <Button variant="text" id="eventinputbutton" onClick={()=>inputCard("eventinputbutton")}>Évènements</Button>
            </Toolbar>

            <Box id="userform" component="form" onSubmit={fermer("principal")} noValidate sx={{ mt: 1 }}>
              <TextField 
                margin="normal"
                required
                style={{width: "98%"}}
                id="userprenom"
                label="Prénom"
                name="userprenom"
                autoComplete="Prénom"
                autoFocus/>
                <TextField
                margin="normal"
                required
                style={{width: "98%"}}
                id="usernom"
                label="Nom"
                name="usernom"
                autoComplete="Nom"
                autoFocus/>
              <TextField
                margin="normal"
                required
                style={{width: "98%"}}
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="Mot de passe"/>
              <Button
                type="submit"
                style={{width: "98%"}}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
            </Box>

            <Box id="placeform" component="form" onSubmit={fermer("principal")} noValidate sx={{ mt: 1 }}>
              <TextField 
                margin="normal"
                required
                style={{width: "98%"}}
                id="nom"
                label="Nom"
                name="nom"
                autoComplete="Nom"
                autoFocus/>
                <TextField
                margin="normal"
                type="number"
                required
                style={{width: "98%"}}
                id="latitude"
                label="Latitude"
                name="latitude"
                autoComplete="Latitude"
                autoFocus/>
                <TextField
                margin="normal"
                type="number"
                required
                style={{width: "98%"}}
                id="longitude"
                label="Longitude"
                name="longitude"
                autoComplete="Longitude"
                autoFocus/>
              <Button
                type="submit"
                style={{width: "98%"}}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
            </Box>

            <Box id="eventform" component="form" onSubmit={fermer("principal")} noValidate sx={{ mt: 1 }}>
              <TextField 
                margin="normal"
                required
                style={{width: "98%"}}
                id="eventnom"
                label="Nom de l'évènement"
                name="eventnom"
                autoComplete="Nom de l'évènement"
                autoFocus/>
                <TextField
                margin="normal"
                required
                style={{width: "98%"}}
                id="dateevent"
                name="dateevent"
                type="date"
                autoComplete="Date de l'évènement"
                autoFocus/>
              <Button
                type="submit"
                style={{width: "98%"}}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
            </Box>

          </Card>
      </Box>

      <Box component="main" id="table" sx={{ flexGrow: 1, p: 3 }} >
        <DrawerHeader />
          <Card className='centerDiv'>
            <h2>Tables</h2>
          </Card>
      </Box>

      <Box component="main" id="graphe" sx={{ flexGrow: 1, p: 3 }} >
        <DrawerHeader />
          <Card className='centerDiv'>
            <h2>Graphes</h2>
          </Card>
      </Box>

      <Box component="main" id="doc" sx={{ flexGrow: 1, p: 3 }} >
        <DrawerHeader />
          <Card className='centerDiv'>
            <h2>Documentation</h2>
          </Card>
      </Box>
      
    </Box>
  );
}
