const responseSlice = (set, get) => ({
    exportSurveyToCSV: (type) => {
      const responsesMap = {
        class: get().classResponses,
        dance: get().danceResponses,
        event: get().eventResponses,
        location: get().locationResponses,
      };
  
      const configs = {
        class: {
          filename: 'class_survey_responses.csv',
          headers: [
            'Date', 'Name', 'Email', 'Age', 'Contact Permission', "Dancer's Role", 'Gender', 'Zip Code',
            'Class Feedback', 'Class Improvement', 'Lead Instructor Comments', 'Follow Instructor Comments',
            'Additional Topics', 'General Comments',
            'Satisfaction', 'Lead Instructor Rating', 'Follow Instructor Rating', 'Retake Likelihood',
            'Material Satisfaction', 'Location', 'Schedule'
          ],
          rowBuilder: (row) => [
            row.timestamp?.toDate?.().toLocaleString?.() || '',
            row.name || '',
            row.email || '',
            row.age || '',
            row.contactPermission ? 'Yes' : 'No',
            row.dancerRole || '',
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
            row.classRatings?.scheduleSatisfaction || '',
          ]
        },
  
        // You can add configs for dance, event, location here
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
  