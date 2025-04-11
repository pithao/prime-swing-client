import "./SurveyResponses.css"
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

import useStore from "../../zustand/store";
function SurveyResponses() {
    const { user, role } = useStore();
    if (user && role === null) {
        return <h3>Loading permissions...</h3>;
      }
    
      // Block if not logged in
      if (!user) {
        return <h3>You must be logged in to view this page.</h3>;
      }
    
      // Block if not admin
      if (role !== "admin") {
        return <h3>Access denied. You do not have permission to view survey responses.</h3>;
      }
    
      // User is logged in and is an admin
   
    return(
        <>
            <h3>Please click on what type of surveys you would like to view.</h3>
            <div >
                
                <Button className="Button-Group">
                    <NavLink to="/class-survey-responses">Class Surveys</NavLink>
                </Button>
                <Button className="Button-Group">
                    <NavLink to="/dance-survey-responses">Dance Surveys</NavLink>
                </Button>
                <Button className="Button-Group">
                    <NavLink to="/event-survey-responses">Event Surveys</NavLink>
                </Button>
                <Button className="Button-Group">
                    <NavLink to="/location-survey-responses">Location Surveys</NavLink>
                </Button>
            </div>
        </>
    );
}

export default SurveyResponses;