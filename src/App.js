import React from 'react';
import Add from './Components/Add';
import Dashboard from './Components/Dashboard';
import Questions from './Components/Questions';
import Navbar from './Components/Navbar';
import Home from './Components/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

function App() {
  return (
   
    <div className="Cover">
      <Router>
        <div className="NavSection">
          <Navbar />
        </div>
        <div className="Pages">
        <Routes>
        <Route path="/Home" element={<Home />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Questions" element={<Questions />} />
          <Route path="/Add" element={<Add />} />
        </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
