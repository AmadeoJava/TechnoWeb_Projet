import React, {useState} from 'react';
import $ from "jquery";
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './adminpage.css';

  export default function UserProfile(r) {

    const sha512 = (str) => {
        return crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str)).then(buf => {
          return Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
        });
      }
      

    const transmettrePassword = (p) =>{
        sha512(p).then(i=>{
            console.log(i);
        })
    }

    const [openU, setOpenU] = useState(false);

    const handleCloseU = () => {
      setOpenU(false);
    };

    const handleOpenU = () => {
        setOpenU(true);
      };

    const verifierPasswords = () => {
        var p1 = ($("#pass1").val());
        var p2 = ($("#pass2").val());
        handleCloseU();
        //console.log(p1 + " et " + p2);
        if(p1 && p2) {
            if(p1===p2){
                //console.log("memes passwords");
                if(p1.length>=8){
                    transmettrePassword(p1);
                    alert("Le mot de passe a bien été changé");
                }else{
                    alert("Le mot de passe rentré est de taille inférieure à 8");
                }
            }else{
                alert("Les mots de passe rentrés ne correspondent pas");
            }
        }else{
            alert("Le mot de passe rentré est vide");
        }
    }

  return (
    <div className="base">
        {r.el.map((e,index) =>(
            <div key={index} style={{width: "100%"}}  id={e}>
                <div style={{width: "80%", display:"inline-block"}}>
                    <div style={{marginLeft:"25%", width: "30%", display:"inline-block"}}>
                        <h2 className="gris">{e} : </h2>
                    </div>
                    <div style={{width: "30%", display:"inline-block"}}>
                        <h2>{r.rep[index]}</h2>
                    </div>
                    
                </div>
                {e==="Mot_de_passe"
                ?                 
                <div style={{width: "20%", display:"inline-block"}} className="clickable" id="icone" onClick={()=>handleOpenU()}>
                    <EditIcon className="bleu"/>
                </div>

                : <div></div>
            
            }

            </div>
        ))}

    <Dialog onClose={handleCloseU} open={openU} style={{ textAlign: 'center', contentAlign: 'center' }} fullWidth maxwidth="sm">
      <DialogTitle id="simple-dialog-title">
        Modifier le mot de passe
      </DialogTitle>
      <Grid container direction={"column"} spacing={2}>
          <Grid item>
              Le mot de passe doit être de taille supérieure à 8
          </Grid>
        <Grid item>
            <TextField type="password" id="pass1" name="pass1" label="Tapez votre nouveau mot de passe" required margin="normal" style={{ width: "80%" }} />
        </Grid>
        <Grid item>
            <TextField type="password" id="pass2" name="pass2" label="Retapez le mot de passe" required margin="normal" style={{ width: "80%" }} />
        </Grid>
        <Grid item>
            <Button variant="contained" onClick={()=>verifierPasswords()}>
                Valider
            </Button>
        </Grid>
        <Grid item>
        </Grid>
      </Grid>
    </Dialog>

    </div>
  );
}
