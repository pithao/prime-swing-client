import useStore from '../../zustand/store'
import EventFormData from '../EventFormData/EventFormData';
import EventSurvey from '../EventSurvey/EventSurvey';
import { NavLink } from 'react-router-dom';



function HomePage() {
  const user = useStore((state) => state.user);
  const logOut = useStore((state) => state.logOut);

  return (
    <>
      <h2>Home Page</h2>

      <NavLink to='event-survey'><button>EventSurvey</button></NavLink>    {/* button can be removed later */}
    <EventFormData />
   
      <p>Your username is: {user.username}</p>
      <p>Your ID is: {user.id}</p>
      <button onClick={logOut}>
        Log Out
      </button>
    </>
  );
}


export default HomePage;
