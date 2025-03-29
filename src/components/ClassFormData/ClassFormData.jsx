import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const ClassFormData = () => {

    const[ classFormData, setClassFormData]= useState ([]);

    function fetchClassFormData (){
      console.log('in fetchClassFormData');
      axios.get('/api/classformdata').then( function(response){
        setClassFormData( response.data );
      }).catch(function( err ){
        console.log( err);
          alert(' error getting class data info')
        
      })
    }
    
    useEffect(() => {
      fetchClassFormData();
    }, []);
  return (

    <div>
        
      <NavLink to="/">back</NavLink>
    <h3>Class Survey Responses</h3>
    {classFormData.length === 0 ? (
      <p>No survey responses available.</p>
    ) : (
      <ul>
        {classFormData.map((survey) => (
          <li key={survey.id} style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
            <h4>Survey ID: {survey.id}</h4>
            <p><strong>Name:</strong> {survey.anonymous ? 'Anonymous' : survey.name}</p>
            <p><strong>Email:</strong> {survey.anonymous ? 'Hidden' : survey.email}</p>
            <p><strong>Dancer Role:</strong> {survey.dancer_role}</p>
            <p><strong>Age:</strong> {survey.anonymous ? 'Hidden' : survey.age}</p>
            <p><strong>Gender</strong> {survey.anonymous ? 'Hidden' : survey.gender}</p>
            <p><strong>Zip Code:</strong> {survey.anonymous ? 'Hidden' : survey.zip_code}</p>
            <p><strong>Class Feedback:</strong> {survey.class_feedback}</p>
            <p><strong>Class Improvement:</strong> {survey.class_improvement}</p>
            <p><strong>Lead Instructor Comments:</strong> {survey.lead_instructor_comments}</p>
            <p><strong>Follow Instructor Comments:</strong> {survey.follow_instructor_comments }</p>
            <p><strong>Additional Topics:</strong> {survey.additional_topics}</p>
            <p><strong>General Comments:</strong> {survey.general_comments }</p>
            <p><strong>Satisfaction Rating:</strong> {survey.satisfaction_rating}/5</p>
            <p><strong>Lead Instructor Rating:</strong> {survey.lead_instructor_rating}/5</p>
            <p><strong>Retake Likelihood:</strong> {survey.retake_likelihood }/5</p>
            <p><strong>Material Satisfaction:</strong> {survey.material_satisfaction}/5</p>
            <p><strong>Location Satisfaction:</strong> {survey.location_satisfaction}/5</p>
            <p><strong>Schedule Satisfaction:</strong> {survey.schedule_satisfaction}/5</p>
           <button>Delete</button>  
        
          </li>
        ))}
      </ul>
    )}
  </div>
);
};

export default ClassFormData;