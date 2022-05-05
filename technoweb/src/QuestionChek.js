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
            <h1>
                {rep.que}
            </h1>
                <div className='image'>
                    {rep.resp.map((r,index) =>(
                            <img src={rep.ima[index]} alt={r} id={r} className='unchek' onClick={() => imageClick({r})}></img>
                        ))}
                </div>

                    


                
        </Box>
    </div>
    ;
    
  }
  export default QuestionChek;
