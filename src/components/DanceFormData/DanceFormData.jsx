import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const DanceFormData = () => {

    const[ danceFormData, setDanceFormData]= useState ([]);

    function fetchDanceFormData (){
      console.log('in fetchdanceFormData');
      axios.get('/api/danceformdata').then( function(response){
        setDanceFormData( response.data );
      }).catch(function( err ){
        console.log( err);
          alert(' error getting testsurvey info')
        
      })
    }
    
    useEffect(() => {
      fetchDanceFormData();
    }, []);

    function deleteDanceFormData(id){
      console.log('Deleting event data', id)
      axios.delete(`/api/danceformdata/${id}`)
      .then(response=>{
          console.log('DanceFormData DELETED:', response);
          fetchDanceFormData();
      })
      .catch(function( err){
          console.log(err)
          alert('error deleting event data')
      })
}

  return (

    <div>
      <NavLink to="/">back</NavLink>
    <h3>Dance Survey Responses</h3>
    {danceFormData.length === 0 ? (
      <p>No survey responses available.</p>
    ) : (
     <ul>
        {danceFormData.map((survey) => (
          <li key={survey.id} style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
            <h4>Survey ID: {survey.id}</h4>
            <p><strong>Name:</strong> {survey.anonymous ? 'Anonymous' : survey.name}</p>
            <p><strong>Email:</strong> {survey.anonymous ? 'Hidden' : survey.email}</p>
            <p><strong>Dancer Role:</strong> {survey.dancer_role}</p>
            <p><strong>Age:</strong> {survey.anonymous ? 'Hidden' : survey.age}</p>
            <p><strong>Gender</strong> {survey.anonymous ? 'Hidden' : survey.gender}</p>
            <p><strong>Zip Code:</strong> {survey.anonymous ? 'Hidden' : survey.zip_code}</p>
            <p><strong>Dance Feedback:</strong> {survey.dance_feedback}</p>
            <p><strong>Dance Improvement:</strong> {survey.dance_improvement}</p>
            <p><strong>Lesson Comments:</strong> {survey.lesson_comments}</p>
            <p><strong>Dj Comments:</strong> {survey.dj_comments}</p>
            <p><strong>General Comments:</strong> {survey.general_comments}</p>
            <p><strong>Satisfaction Rating:</strong> {survey.satisfaction_rating}/5</p>
            <p><strong>Instructor Rating:</strong> {survey.instructor_rating}/5</p>
            <p><strong>Lesson Satisfaction Rating:</strong> {survey.lesson_satisfaction_rating}/5</p>
            <p><strong>Recommendation Likelihood:</strong> {survey.recommendation_likelihood}/5</p>
            <p><strong>Dj Rating:</strong> {survey.dj_satisfaction_rating}/5</p>
            <p><strong>Location Satisfaction:</strong> {survey.location_satisfaction}/5</p>
            <p><strong>Schedule Satisfaction:</strong> {survey.schedule_satisfaction}/5</p>
            <button onClick={()=>deleteDanceFormData(survey.id)}>Delete</button>
          </li>
        ))}
      </ul>

    )}
  </div>
);
};

export default DanceFormData;
