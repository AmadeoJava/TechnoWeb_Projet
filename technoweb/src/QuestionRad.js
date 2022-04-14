import * as React from 'react';
import Card from '@mui/material/Card';
import $ from "jquery"
import './questionrad.css';


function QuestionRad(rep) {  // On donne en paramètre la question, les réponses possibles et leurs images
    const imageClick = (i) => {
        var ident=i.r;
        console.log(ident);
        $({rep}).removeClass("chek").addClass("unchek");
        //var cl = $("#"+ident).attr('class');
        $("#"+ident).removeClass("unchek").addClass("chek");
      }
    return <div>
        <Card className='centerDiv'>
            <h1>
                {rep.que}
            </h1>
                <div className='image'>
                    {rep.resp.map((r,index) =>(
                            <img src={rep.ima[index]} alt={r} id={r} className='unchek' onClick={() => imageClick({r})}></img>
                        ))}
                </div>

                    


                
        </Card>
    </div>
    ;
    
  }
  export default QuestionRad;
