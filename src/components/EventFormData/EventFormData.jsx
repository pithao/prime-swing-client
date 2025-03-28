import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';

const EventFormData = () => {

    const[ eventFormData, setFormData]= useState ([]);

    function fetchEventFormData (){
      console.log('in fetchEventFormData');
      axios.get('/api/eventsurvey').then( function(response){
        setFormData( response.data );
      }).catch(function( err ){
        console.log( err);
          alert(' error getting testsurvey info')
        
      })
    }
    
    useEffect(() => {
      fetchEventFormData();
    }, []);
  return (

    <div>
    <h3>Event Survey Responses</h3>
    {eventFormData.length === 0 ? (
      <p>No survey responses available.</p>
    ) : (
      <ul>
        {eventFormData.map((survey) => (
          <li key={survey.id} style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
            <h4>Survey ID: {survey.id}</h4>
            <p><strong>Name:</strong> {survey.anonymous ? 'Anonymous' : survey.name}</p>
            <p><strong>Email:</strong> {survey.anonymous ? 'Hidden' : survey.email}</p>
            <p><strong>Dancer Role:</strong> {survey.dancer_role}</p>
            <p><strong>Age:</strong> {survey.anonymous ? 'Hidden' : survey.age}</p>
            <p><strong>Gender</strong> {survey.anonymous ? 'Hidden' : survey.gender}</p>
            <p><strong>Zip Code:</strong> {survey.anonymous ? 'Hidden' : survey.zip_code}</p>
            <p><strong>Event Satisfaction:</strong> {survey.event_satisfaction}/5</p>
            <p><strong>Pro Rating:</strong> {survey.pro_rating}/5</p>
            <p><strong>DJ Rating:</strong> {survey.dj_rating}/5</p>
            <p><strong>Workshop Rating:</strong> {survey.workshop_rating}/5</p>
            <p><strong>Recommendation Likelihood:</strong> {survey.recommendation_likelihood}/5</p>
            <p><strong>Workshop Satisfaction:</strong> {survey.workshop_satisfaction}/5</p>
            <p><strong>Location Satisfaction:</strong> {survey.location_satisfaction}/5</p>
            <p><strong>Schedule Satisfaction:</strong> {survey.schedule_satisfaction}/5</p>
            <p><strong>Event Feedback:</strong> {survey.event_feedback}</p>
            <p><strong>Event Improvement:</strong> {survey.event_improvement}</p>
            <p><strong>Pro Comments:</strong> {survey.pro_comments}</p>
            <p><strong>Dance Comments:</strong> {survey.dance_comments}</p>
            <p><strong>Workshop Comments:</strong> {survey.workshop_comments}</p>
            <p><strong>DJ Comments:</strong> {survey.dj_comments}</p>
            <p><strong>Additional Workshops:</strong> {survey.additional_workshops}</p>
            <p><strong>General Comments:</strong> {survey.general_comments}</p>
            <p><strong>Dances Attended:</strong> {survey.dances_attended}</p>
            <p><strong>Workshops Attended:</strong> {survey.workshops_attended}</p>
           
        
          </li>
        ))}
      </ul>
    )}
  </div>
);
};

export default EventFormData;
