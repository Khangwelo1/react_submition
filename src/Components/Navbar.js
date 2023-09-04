import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="Navbar">
      <div className="radio-inputs">
        <label className="radio">
          <input type="radio" name="radio" checked />
          <span className="name"><Link to="/Home">Home</Link></span>
        </label>
        <label className="radio">
          <input type="radio" name="radio" />
          <span className="name"><Link to="/Dashboard">Dashboard</Link></span>
        </label>
        <label className="radio">
          <input type="radio" name="radio" />
          <span className="name"><Link to="/Questions">Questions</Link></span>
        </label>
        <label className="radio">
          <input type="radio" name="radio" />
          <span className="name"><Link to="/Add">Add</Link></span>
        </label>
      </div>
    </div>
  );
}

export default Navbar;
