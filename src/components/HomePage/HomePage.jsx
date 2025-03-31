import useStore from '../../zustand/store'
import React from 'react';
import { NavLink } from 'react-router-dom';


function HomePage() {
  const user = useStore((state) => state.user);
  const logOut = useStore((state) => state.logOut);

  return (
    <>
    <h2>Survey's</h2>
    
    <p><NavLink to="/class-survey">Class Survey</NavLink></p>
    <p><NavLink to="/dance-survey">Dance Survey</NavLink></p>
    <p><NavLink to="/event-survey">Event Survey</NavLink></p>
    <p><NavLink to="/location-survey">Location Survey</NavLink></p>
    
      <h2>Survey Data</h2>
      <p>
    <NavLink to="/eventformdata"><button>Event Data</button></NavLink> 
      </p>
    <p>
    <NavLink to="/danceformdata"><button>Dance Data</button></NavLink>
    </p>
    <p>
    <NavLink to="/classformdata"><button>Dance Class Survey Data</button></NavLink>
    </p>
    
      <p>Your username is: {user.username}</p>
      <p>Your ID is: {user.id}</p>
      <button onClick={logOut}>
        Log Out
      </button>
    </>
  );
}


export default HomePage;
