import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { Collapse } from "@material-ui/core";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import $ from "jquery";
var cl = true;
const axios = require('axios');

function Commentaires_Notes(rep) {
    const [expand, setExpand] = useState();


    const clique = () => {
        setExpand(!expand);
        cl = !cl;
    }
    var note = 0;
    var nbdeNote = 0;
    const ajoutCommentaire = () => {
        if ($("#CommentaireADD").val()) {
            if($("#userlevelAdd").text()==="S'abstenir"){
                try {
                    axios.post(
                        `/AvisPost/${$("#CommentaireADD").val()}/${rep["el"]}/null`
                    );
                } catch (err) {
                    console.log(err);
                }
                rep.resp.push({Commentaire:$("#CommentaireADD").val(), Lieu:rep["el"],Note:null})
            }else{
                try {
                    axios.post(
                        `/AvisPost/${$("#CommentaireADD").val()}/${rep["el"]}/${$("#userlevelAdd").text()}`
                    );
                } catch (err) {
                    console.log(err);
                }
                rep.resp.push({Commentaire:$("#CommentaireADD").val(), Lieu:rep["el"],Note:int($("#userlevelAdd").text())})
            }
            note=0;
            nbdeNote=0;

            $("#CommentaireADD").val("");
            $("#userlevelAdd").text("S'abstenir");
            
        } else {
          alert("Tous les champs n'ont pas été remplis")
        }
    }

    if ((rep.resp).length !== 0) {
        return (
            <div >

                <Box>
                    <Paper>
                        <Card style={{ textAlign: "center" }}>
                            <div style={{ width: "100%" }} onClick={() => clique()} className="clickable">
                                <div style={{ width: "80%", display: "inline-block" }}>
                                    <h2 style={{ marginLeft: "25%" }}>Commentaires</h2>
                                </div>
                                <div style={{ width: "20%", display: "inline-block" }} id="icone">
                                    {cl ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                                </div>
                            </div>
                            <Collapse in={expand}>
                                <br />
                                {rep.resp.map((r, index) => {

                                    if (r.Note !== null) {
                                        note += r.Note
                                        nbdeNote += 1
                                    }
                                    return (<h3 key={index} style={{ marginLeft: "8px", marginRight: "2px" }}>{index + "-" + r.Commentaire}</h3>);


                                })}
                            </Collapse>
                        </Card>
                    </Paper>
                </Box>

                
                {note !== 0 && (
                    <h2>Notes:{" " + note / nbdeNote}</h2>
                )}
                <Box id="userform" component="form" style={{borderTop:"solid 2px #aaaaaa"}} noValidate sx={{ mt: 1 }} className="adminLevel">
                    <h1 style={{margin:"0px", marginTop:"10px"}}>Réagir</h1>
                    <FormControl style={{ width: "98%" }}>
                        <Grid container direction={"column"} spacing={2}>
                            <Grid item>
                                <TextField id="CommentaireADD" name="CommentaireADD" label="Commentaire" margin="normal" style={{ width: "98%" }} />

                                <TextField select label="Note" id="userlevelAdd" style={{ width: "98%" }} required defaultValue="null">

                                    <MenuItem value={"null"}>
                                        S'abstenir
                                    </MenuItem>
                                    <MenuItem value={"0"}>
                                        0
                                    </MenuItem>
                                    <MenuItem value={"1"}>
                                        1
                                    </MenuItem>
                                    <MenuItem value={"2"}>
                                        2
                                    </MenuItem>
                                    <MenuItem value={"3"}>
                                        3
                                    </MenuItem>
                                    <MenuItem value={"4"}>
                                        4
                                    </MenuItem>
                                    <MenuItem value={"5"}>
                                        5
                                    </MenuItem>
                                </TextField>

                            </Grid>

                            <Grid item>
                                <Button onClick={() => ajoutCommentaire()} style={{ width: "98%" }} variant="contained" sx={{ mt: 3, mb: 2 }}>
                                    Ajouter
                                </Button>
                            </Grid>
                        </Grid>
                    </FormControl>
                </Box>


            </div>

        );
    } else {
        return (
            <><Box id="userform" component="form" style={{borderTop:"solid 2px #aaaaaa"}} noValidate sx={{ mt: 1 }} className="adminLevel">
            <h1 style={{margin:"0px", marginTop:"10px"}}>Réagir</h1>
            <FormControl style={{ width: "98%" }}>
                <Grid container direction={"column"} spacing={2}>
                    <Grid item>
                        <TextField id="CommentaireADD" name="CommentaireADD" label="Commentaire" margin="normal" style={{ width: "98%" }} />

                        <TextField select label="Note" id="userlevelAdd" style={{ width: "98%" }} required defaultValue="null">

                            <MenuItem value={"null"}>
                                S'abstenir
                            </MenuItem>
                            <MenuItem value={"0"}>
                                0
                            </MenuItem>
                            <MenuItem value={"1"}>
                                1
                            </MenuItem>
                            <MenuItem value={"2"}>
                                2
                            </MenuItem>
                            <MenuItem value={"3"}>
                                3
                            </MenuItem>
                            <MenuItem value={"4"}>
                                4
                            </MenuItem>
                            <MenuItem value={"5"}>
                                5
                            </MenuItem>
                        </TextField>

                    </Grid>

                    <Grid item>
                        <Button onClick={() => ajoutCommentaire()} style={{ width: "98%" }} variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Ajouter
                        </Button>
                    </Grid>
                </Grid>
            </FormControl>
        </Box></>
        );
    }

}
export default Commentaires_Notes;
