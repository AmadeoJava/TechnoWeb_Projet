import * as React from 'react';
import Box from '@mui/material/Box';
import $ from "jquery"
import './questionchek.css';


function QuestionChek(rep) {  // On donne en paramètre la question, les réponses possibles et leurs images
    const imageClick = (i) => {
        var ident=i.r;
        var cl = $("#"+ident).attr('class');
        if(cl.includes("unchek")){
            $("#"+ident).removeClass("unchek").addClass("chek");
        }else{
            $("#"+ident).removeClass("chek").addClass("unchek");
        }
      }
    return <div>
        <Box className='centerDiv'>

                <div className='image' style={{display:"flex" }}>
                    {rep.resp.map((r,index) =>(
                        <div style={{width:"100%"}}>
                            <h3>{rep.reponse[index]}</h3>
                            <img src={rep.ima[index]} alt={r} id={r} className='unchek' onClick={() => imageClick({r})} style={{width:"100%"}}></img>
                        </div>
                        ))}
                </div>

                
        </Box>
    </div>
    ;
    
  }
  export default QuestionChek;
