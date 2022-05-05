import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import './adminpage.css';

  export default function UserProfile(r) {

  return (
    <div className="base">
        {r.el.map((e,index) =>(
            <div key={index} style={{width: "100%"}} id={e}>
                <div style={{width: "80%", display:"inline-block"}}>
                    <div style={{marginLeft:"25%", width: "30%", display:"inline-block"}}>
                        <h2 className="gris">{e} : </h2>
                    </div>
                    <div style={{width: "30%", display:"inline-block"}}>
                        <h2>{r.rep[index]}</h2>
                    </div>
                    
                </div>
                <div style={{width: "20%", display:"inline-block"}} className="clickable" id="icone">
                    <EditIcon className="bleu"/>
                </div>
            </div>
        ))}
    </div>
  );
}
