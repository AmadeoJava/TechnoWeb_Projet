import * as React from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AdminPage from "./AdminPage";
import Formulaire from "./Formulaire";
import Login from "./Login";
import MentionsLegales from "./MentionsLegales";


export default function WebProject() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/form" element={<Formulaire />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ml" element={<MentionsLegales/>}/>
        </Routes>
        
      </Router>
      
    </div>
  );
}
