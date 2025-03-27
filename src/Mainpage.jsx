import React from 'react';
import { BrowserRouter as Router, Routes, NavLink, Route } from 'react-router-dom';
import './App.css';
import './styles.css';
import New from './componant/New';
import Review from './componant/review';
import Test from './componant/Test';
import SolarSystem from './componant/SolarSystem';

const Main = () => {
  return (
    <Router> 
      <div className='Main'>
        <div className='Left'>
          <span className='level'>Level : 10</span>
          <div className='activites'>
            <div className='reviw_pather'>
              <Routes>
              <Route index element={ <SolarSystem width="100%" height="100%" />} />
                <Route path="/new" element={<New />} />
                <Route path="/review" element={<Review />} />
                <Route path="/test" element={<Test />} />

                
              </Routes>
            </div>
          </div>
        </div>
        <div className='Right'>
          <div className='stats'>
            <header>
              <NavLink to="/new">New</NavLink>
              <NavLink to="/review">Review</NavLink>
              <NavLink to="/test">Test</NavLink>
              <NavLink to="/states">States</NavLink>
            </header>
            <div className='stat_here'>
              <ul>
                <li><span>Total Words</span><span>15575</span></li>
                <li><span>New Words "Weekly"</span><span>26</span></li>
                <li><span>Tests</span><span>5</span></li>
                <li><span>Reviewed</span><span>1200</span></li>
                <li><span>Mistakes</span><span>145</span></li>
              </ul>
            </div>
          </div>
          <div className='right_bottom'>
            <span>Diligence : 135%</span>
            <hr />
            <span>Memory : 68%</span>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Main;
