const responseSlice = (set, get) => ({
    exportSurveyToCSV: (type) => {
      const responsesMap = { //Get responses in zustand
        class: get().classResponses,
        dance: get().danceResponses,
        event: get().eventResponses,
        location: get().locationResponses,
      };
  
      const configs = {
    //CLASS CONFIG
        class: {
            filename: 'class_survey_responses.csv', //what to name file
            headers: [
              'Date', 'Anonymous', 'Name', 'Email', 'Contact Permission', 'Dancer Role', 'Age', 'Gender', 'Zip Code',
              'Class Feedback', 'Class Improvement', 'Lead Instructor Comments', 'Follow Instructor Comments',
              'Additional Topics', 'General Comments',
              'Satisfaction', 'Lead Instructor Rating', 'Follow Instructor Rating', 'Retake Likelihood',
              'Material Satisfaction', 'Location Satisfaction', 'Schedule Satisfaction'
            ],
            rowBuilder: (row) => [
              row.timestamp?.toDate?.().toLocaleString?.() || '',
              row.anonymous ? 'Yes' : 'No',
              row.name || '',
              row.email || '',
              row.contactPermission ? 'Yes' : 'No',
              row.dancerRole || '',
              row.age || '',
              row.gender || '',
              row.zipCode || '',
              row.classFeedback || '',
              row.classImprovement || '',
              row.leadInstructorComments || '',
              row.followInstructorComments || '',
              row.additionalTopics || '',
              row.generalComments || '',
              row.classRatings?.satisfaction || '',
              row.classRatings?.leadInstructor || '',
              row.classRatings?.followInstructor || '',
              row.classRatings?.retakeLikelihood || '',
              row.classRatings?.materialSatisfaction || '',
              row.classRatings?.locationSatisfaction || '',
              row.classRatings?.scheduleSatisfaction || ''
            ]
          },
          
    //DANCE CONFIG
          dance: {
            filename: 'dance_survey_responses.csv',
            headers: [
              'Date', 'Anonymous', 'Name', 'Email', 'Contact Permission', 'Dancer Role', 'Age', 'Gender', 'Zip Code',
              'Dance Feedback', 'Dance Improvement', 'Lesson Comments', 'DJ Comments', 'General Comments',
              'Satisfaction', 'Instructor Rating', 'Lesson Satisfaction',
              'Recommendation Likelihood', 'DJ Satisfaction', 'Location Satisfaction', 'Schedule Satisfaction'
            ],
            rowBuilder: (row) => [
              row.timestamp?.toDate?.().toLocaleString?.() || '',
              row.anonymous ? 'Yes' : 'No',
              row.name || '',
              row.email || '',
              row.contactPermission ? 'Yes' : 'No',
              row.dancerRole || '',
              row.age || '',
              row.gender || '',
              row.zipCode || '',
              row.danceFeedback || '',
              row.danceImprovement || '',
              row.lessonComments || '',
              row.djComments || '',
              row.generalComments || '',
              row.danceRatings?.satisfaction || '',
              row.danceRatings?.instructor || '',
              row.danceRatings?.lessonSatisfaction || '',
              row.danceRatings?.recommendationLikelihood || '',
              row.danceRatings?.djSatisfaction || '',
              row.danceRatings?.locationSatisfaction || '',
              row.danceRatings?.scheduleSatisfaction || ''
            ]
          }
          

    //EVENT CONFIG 
          event: {
            filename: 'event_survey_responses.csv',
            headers: [
              'Date', 'Anonymous', 'Name', 'Email', 'Contact Permission', 'Dancer Role', 'Age', 'Gender', 'Zip Code',
              'Event Feedback', 'Event Improvement',
              'Pro Comments', 'Dance Comments', 'Workshop Comments', 'DJ Comments', 'Additional Workshops',
              'General Comments', 'Dances Attended', 'Workshops Attended',
              'Event Satisfaction', 'Pro Rating', 'DJ Rating', 'Workshop Rating',
              'Recommendation Likelihood', 'Workshop Satisfaction',
              'Location Satisfaction', 'Schedule Satisfaction'
            ],
            rowBuilder: (row) => [
              row.timestamp?.toDate?.().toLocaleString?.() || '',
              row.anonymous ? 'Yes' : 'No',
              row.name || '',
              row.email || '',
              row.contactPermission ? 'Yes' : 'No',
              row.dancerRole || '',
              row.age || '',
              row.gender || '',
              row.zipCode || '',
              row.eventFeedback || '',
              row.eventImprovement || '',
              row.proComments || '',
              row.danceComments || '',
              row.workshopComments || '',
              row.djComments || '',
              row.additionalWorkshops || '',
              row.generalComments || '',
              row.dancesAttended || '',
              row.workshopsAttended || '',
              row.eventRatings?.eventSatisfaction || '',
              row.eventRatings?.pro || '',
              row.eventRatings?.dj || '',
              row.eventRatings?.workshop || '',
              row.eventRatings?.recommendationLikelihood || '',
              row.eventRatings?.workshopSatisfaction || '',
              row.eventRatings?.locationSatisfaction || '',
              row.eventRatings?.scheduleSatisfaction || ''
            ]
          },       

    //LOCATION CONFIG
          location: {
            filename: 'location_survey_responses.csv',
            headers: [
              'Date', 'Anonymous', 'Name', 'Email', 'Contact Permission', 'Dancer Role', 'Age', 'Gender', 'Zip Code',
              'Location Feedback', 'Location Improvement', 'Location Recommendations', 'General Comments',
              'Building Satisfaction', 'Dance Floor Satisfaction', 'Parking Satisfaction',
              'Keep Same Class Schedule', 'Keep Same Dance Schedule', 'Keep Same Event Schedule',
              'Move Outside St Paul', 'Location Challenges', 'Challenges Explanation',
              'Location Safety', 'Safety Explanation'
            ],
            rowBuilder: (row) => [
              row.timestamp?.toDate?.().toLocaleString?.() || '',
              row.anonymous ? 'Yes' : 'No',
              row.name || '',
              row.email || '',
              row.contactPermission ? 'Yes' : 'No',
              row.dancerRole || '',
              row.age || '',
              row.gender || '',
              row.zipCode || '',
              row.locationFeedback || '',
              row.locationImprovement || '',
              row.locationRecommendations || '',
              row.generalComments || '',
              row.locationRatings?.buildingSatisfaction || '',
              row.locationRatings?.danceFloorSatisfaction || '',
              row.locationRatings?.parkingSatisfaction || '',
              row.locationRatings?.importanceOfKeepingSameSchedule || '',
              row.locationRatings?.importanceOfKeepingSameDanceSchedule || '',
              row.locationRatings?.importanceOfKeepingSameEventSchedule || '',
              row.moveOutsideStPaul || '',
              row.locationChallenges || '',
              row.locationChallengesExplanation || '',
              row.locationSafety || '',
              row.locationSafetyExplanation || ''
            ]
          }
      };
  
      const config = configs[type];
      const responses = responsesMap[type];
  
      if (!config || !responses || responses.length === 0) {
        alert("No data found for export.");
        return;
      }
  
      const csvContent = [config.headers, ...responses.map(config.rowBuilder)]
        .map(e => e.map(cell => `"${cell}"`).join(','))
        .join('\n');
  
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
  
      link.setAttribute('href', url);
      link.setAttribute('download', config.filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  });
  
  export default responseSlice;
  