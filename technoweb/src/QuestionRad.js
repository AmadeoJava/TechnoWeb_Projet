import * as React from 'react';
import Card from '@mui/material/Card';
import $ from "jquery"
import './questionrad.css';


function QuestionRad(rep) {  // On donne en paramètre la question, les réponses possibles et leurs images
    const imageClick = (i) => {
        var ident=i.r;
        for(let i=0; i<rep.resp.length; i++) {
            $("#"+rep.resp[i]).removeClass("chek").addClass("unchek");
        }
        
        //var cl = $("#"+ident).attr('class');
        $("#"+ident).removeClass("unchek").addClass("chek");
      }
    return <div>
        <Card className='centerDiv'>
            <h1>
                {rep.que}
            </h1>
                <div className='image'  style={{display:"flex" }}>
                    {rep.resp.map((r,index) =>(
                        <div style={{width:"100%"}}  key={index}>
                            <h3>{rep.reponse[index]}</h3>
                            {/* <img src={rep.ima[index]} alt={r} id={r} className='unchek' onClick={() => imageClick({r})} style={{width:"100%", height:"100%"}}></img> */}
                        </div>
                    ))}
                </div>

                    


                
        </Card>
    </div>
    ;
    
  }
  export default QuestionRad;
