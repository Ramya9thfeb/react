import React from 'react';
import GridComponent from './GridComponent';
import GridEditabledefault from './GridEditabledefault';
import GridEditonTabClick from './GridEditonTabClick';
import FormDemo from './FormDemo';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/">FormDemo</Link>
          </li>
          <li>
            <Link to="/grid">GridComponent</Link>
          </li>
        </ul>
        <Routes>
          <Route exact path='/' element={< FormDemo />}></Route>
          <Route exact path='/grid' element={<>< GridComponent /><GridEditabledefault/><GridEditonTabClick/></>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;