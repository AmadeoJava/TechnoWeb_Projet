import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import $ from "jquery"
import './questionrad.css';

const axios = require('axios');

function QuestionRad(rep) {  // On donne en paramètre la question, les réponses possibles et leurs images
    console.log(rep.resp);
    const [images, setAnswerImages] = useState([]);
    const imageClick = (i) => {
        var ident = i.r;
        for (let i = 0; i < rep.resp.length; i++) {
            $("#" + rep.resp[i]).removeClass("chek").addClass("unchek");
        }

        //var cl = $("#"+ident).attr('class');
        $("#" + ident).removeClass("unchek").addClass("chek");
    }
    useEffect(() => {
        try {
            axios.get(`/getImgAnswer/${(rep.ima)[0]}`);
            const imagesv2 = [
                `http://localhost:5000/getImgAnswer/${(rep.ima)[0]}`
            ];

            setAnswerImages(imagesv2);
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <div>
            {rep.resp 
            ?<Card className='centerDiv'>
                <h1>
                    {rep.que}
                </h1>
                <div className='image' style={{ display: "flex" }}>
                    {rep.resp.map((r, index) => (
                        <div style={{ width: "100%" }} key={index}>
                            <h3>{rep.reponse[index]}</h3>
                            <img src={images} alt={r} id={r} className='unchek' onClick={() => imageClick({ r })} style={{ width: "100%", height: "100%" }}></img>
                        </div>
                    ))}
                </div>

            </Card>
            :<Card></Card>
            }
        </div>
        
    );
}
export default QuestionRad;
