import React from 'react';
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const axios = require('axios');


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Albivouac
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();


  const sha512 = (str) => {
    return crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str)).then(buf => {
      return Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
    });
  }

  const creatUser = (u) =>{
    var uti=u.charAt(0);
    var le=u.length;
    for(let i=1;i<le-1;i++){
      uti+=(u.charAt((le-i)-1));
    }
    uti+=u.charAt(le-1);
    return uti;
  }

  const logIN = (e) => {
    try {
      sha512(e.password).then(x => {
        const result = axios.get(
          `/userLogin/${e.pseudo}/${x}`
        );
        result.then((resp) =>
        {if (resp.data===true){
          $.getJSON("https://api.ipify.org?format=json", function(data) {
            sha512((data.ip)).then(i=>{
              document.cookie = "Token="+i; // donne comme cookie l'addresse IP cryptée
            })
          })
          sha512((creatUser(e.pseudo))).then(ul=>{
            document.cookie = "Token2="+ul;
          })
          navigate("/admin?id="+e.pseudo);  // donne en cookie le pseudo mélangé et crypté
        }
      }
      );
        
      });
      /*
      console.log((e.pseudo));
      console.log((e.password));
      */
      


    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if($("#pseudo").val().length>0 && $("#password").val().length>0 ){
      const data = new FormData(event.currentTarget);
      console.log({
        pseudo: data.get('pseudo'),
        password: data.get('password'),
      });
      console.log({
        pseudo: data.get('pseudo'),
        password: sha512(data.get('password')),
      });
      logIN({pseudo:data.get('pseudo'),password:(data.get('password'))});
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes();
      var seco = today.getSeconds();
    
      console.log("date = "+date);
      console.log("temps = "+time);
      console.log("sec = "+seco);
      $('input').val('');
    }else{
      alert("Vous n'avez pas rempli toutes les conditions");
    }

  };

  const delCookie = (cname) => {
    var d = new Date();
    d.setTime(d.getTime() + (0*60*1000));
    var expires = "expires="+d.toUTCString();  
    document.cookie = cname + "=" + '' + ";" + expires + ";path=/";
  }

  const zeroCookie = () =>{
    delCookie('Token');
    delCookie('Token2')
  }




  zeroCookie();
  return (
    <ThemeProvider theme={theme} >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="pseudo"
              label="Pseudo"
              name="pseudo"
              autoComplete="pseudo"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>

    </ThemeProvider>
    
  );
}