import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, NavLink, Route } from 'react-router-dom';
import './App.css';
import './styles.css';
import New from './componant/New';
import Review from './componant/review';
import Test from './componant/Test';
import SolarSystem from './componant/SolarSystem';
import Statisitics from './componant/Statistics';
import axios from 'axios';
import Algorithms from './componant/Algermes';

const Main = () => {



  const [data, setData] = useState({});

  useEffect(() => {

      const GetData = async () => {

          const response = await axios.get("http://localhost:5000/Statistics/1");
          setData(response.data);
      };

      GetData();
  }, [data]);





  return (
    <Router>
       <Algorithms/>
      <div className='Main'>
        <div className='Left'>
          <span className='level'>Level : {data?.Level ?? "Loading..."}</span>
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
                <Statisitics/>
            </div>
          </div>
          <div className='right_bottom'>
            <span>Diligence : {data?.Diligence ??"Loading..."}%</span>
            <hr />
            <span>Memory : {data?.Memory ??"Loading..."}%</span>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Main;
