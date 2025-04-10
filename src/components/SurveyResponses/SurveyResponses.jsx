import "./SurveyResponses.css"
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import Nav from "../Nav/Nav";

function SurveyResponses() {

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
    )
}

export default SurveyResponses;