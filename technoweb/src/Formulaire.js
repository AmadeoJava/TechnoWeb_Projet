import * as React from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import { requirePropFactory } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import $ from "jquery"
import './formulaire.css';
import QuestionChek from './QuestionChek'
import QuestionRad from './QuestionRad'

// que="Choisissez ce que vous appréciez" rep={['male','female']} ima={["http://findicons.com/files/icons/1688/web_blog/48/user_male_white_red_brown.png","http://findicons.com/files/icons/1688/web_blog/48/user_female_white_pink_black.png"]} type="gender"

function Formulaire() {
    var resultat = [];

    const test = () =>{
        resultat = [];
        var t = $(".chek");
        console.log(t);
        for(var a of t){
            console.log(a.id);
            resultat.push(a.id);
        }
        console.log(resultat);
        alert(resultat);
        $("img").removeClass("chek").addClass("unchek");
    }

    return <div>
        <form>
            <QuestionChek que="Que préférez vous ?" resp={['cathedrale','lautrec','mode']} type="lieux" ima={[require("./images/places/cath.jpg"), require("./images/places/laut.jpg"), require("./images/places/mod.jpg")]}/>
            <br></br>
            <QuestionRad que="Quel Avatar choisissez vous ?" resp={["god","woman"]} type="face" ima={[require("./images/faces/face8.jpg"), require("./images/faces/face10.jpg")]}/>
        </form>
        <br></br>
        <Button onClick={() => test()} variant="contained" id="valider">Valider</Button>
    </div>
    ;
    
  }

  export default Formulaire;