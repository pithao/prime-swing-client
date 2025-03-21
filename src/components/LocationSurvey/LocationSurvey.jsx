import React, { useState } from "react";
import { Container, TextField, FormControl, FormControlLabel, Checkbox, Select, MenuItem, InputLabel, RadioGroup, Radio, Button, Typography } from "@mui/material";


const LocationSurvey = () => {
  const [formData, setFormData] = useState({
    anonymous: true,
    name: "",
    email: "",
    contactPermission: false,
    dancerRole: "",
    age: "",
    gender: "",
    zipCode: "",
    locationFeedback: "",
    locationImprovement: "",
    locationRecommendations: "",
    generalComments: "",
    locationRatings: {
      buildingSatisfaction: 3,
      danceFloorSatisfaction: 3,
      parkingSatisfaction: 3,
      importanceOfKeepingSameSchedule: 3,
      importanceOfKeepingSameDanceSchedule: 3,
      importanceOfKeepingSameEventSchedule: 3,
    },
    moveOutsideStPaul: "",
    locationChallenges: "",
    locationSafety: "",
    locationChallengesExplanation: "",
    locationSafetyExplanation: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRatingChange = (section, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
// this adds a space after all capital letters so we can use the objects for easier form submission to the database
      .trim()
// this removes any leading spaces for formatting
      .replace(/^./, (str) => str.toUpperCase());
// this converts the first letter of the first part of the camel case objects to a capital letter so it reads like real people words
  };
// writing this function almost ruined my life

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Survey Submitted! Thank you for your feedback.");
  };

  return (
    <Container maxWidth="md" sx={{ p: 4, bgcolor: "#fff", boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Location Survey</Typography>

{/* gutterBottom adds spacing ebtween this and the form for formatting. nifty. */}

      <form onSubmit={handleSubmit}>
        <FormControlLabel
          control={<Checkbox checked={formData.anonymous} onChange={handleChange} name="anonymous" />}
          label="Would you like to remain anonymous?"
        />
        {!formData.anonymous && (
          <>
            <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="normal" />
            <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} margin="normal" />
            <FormControlLabel
              control={<Checkbox checked={formData.contactPermission} onChange={handleChange} name="contactPermission" />}
              label="May we contact you?"
            />
          </>
        )}
        <FormControl fullWidth margin="normal">
          <InputLabel>Dancer Role</InputLabel>
          <Select name="dancerRole" value={formData.dancerRole} onChange={handleChange}>
            <MenuItem value="Lead only">Lead only</MenuItem>
            <MenuItem value="Mostly lead">Mostly lead</MenuItem>
            <MenuItem value="Both">Both lead & follow</MenuItem>
            <MenuItem value="Mostly follow">Mostly follow</MenuItem>
            <MenuItem value="Only follow">Only follow</MenuItem>
          </Select>
        </FormControl>
        <TextField fullWidth label="Age" name="age" type="number" value={formData.age} onChange={handleChange} margin="normal" />
        <FormControl fullWidth margin="normal">
          <InputLabel>Gender</InputLabel>
          <Select name="gender" value={formData.gender} onChange={handleChange}>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Non-binary">Non-binary</MenuItem>
            <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
          </Select>
        </FormControl>
        <TextField fullWidth label="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleChange} margin="normal" />
        
        <Typography variant="h6" gutterBottom mt={3}>Ratings</Typography>

 {/* mt is margin top for Material UI, also for spacing */}

        {Object.keys(formData.locationRatings).map((key) => (
          <FormControl component="fieldset" fullWidth margin="normal" key={key}>
            <Typography>{formatLabel(key)}</Typography>
            <RadioGroup row>
              {[1, 2, 3, 4, 5].map((num) => (
                <FormControlLabel
                  key={num}
                  value={num.toString()}
                  control={<Radio checked={formData.locationRatings[key] == num} onChange={() => handleRatingChange("locationRatings", key, num)} />}
                  label={num}
                />
              ))}
            </RadioGroup>
          </FormControl>
        ))}
        
        <Typography variant="h6" gutterBottom mt={3}>Comments/Long Answers</Typography>
        <TextField fullWidth label="What did you like about the our current location?" name="locationFeedback" multiline rows={3} value={formData.locationFeedback} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="What could be improved?" name="locationImprovement" multiline rows={3} value={formData.locationImprovement} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Do you have recommendations for a new location for our club?" name="locationRecommendations" multiline rows={3} value={formData.locationRecommendations} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Anything else you would like to share with us?" name="generalComments" multiline rows={3} value={formData.generalComments} onChange={handleChange} margin="normal" />
        
        <Typography variant="h6" gutterBottom mt={3}>Additional Questions</Typography>

<FormControl component="fieldset" margin="normal" fullWidth>
  <Typography>Would you continue to attend if we moved our location out of St. Paul?</Typography>
  <RadioGroup row name="moveOutsideStPaul" value={formData.moveOutsideStPaul} onChange={handleChange}>
    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
    <FormControlLabel value="No" control={<Radio />} label="No" />
  </RadioGroup>
</FormControl>

<FormControl component="fieldset" margin="normal" fullWidth>
  <Typography>Is there anything about our current location that keeps or discourages you from attending?</Typography>
  <RadioGroup row name="locationChallenges" value={formData.locationChallenges} onChange={handleChange}>
    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
    <FormControlLabel value="No" control={<Radio />} label="No" />
  </RadioGroup>
  {formData.locationChallenges === "Yes" && (
    <TextField
      fullWidth
      label="If so, what?"
      name="locationChallengesExplanation"
      multiline
      rows={2}
      value={formData.locationChallengesExplanation}
      onChange={handleChange}
      margin="normal"
    />
  )}
</FormControl>

<FormControl component="fieldset" margin="normal" fullWidth>
  <Typography>Do you feel safe & comfortable at the current location?</Typography>
  <RadioGroup row name="locationSafety" value={formData.locationSafety} onChange={handleChange}>
    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
    <FormControlLabel value="No" control={<Radio />} label="No" />
  </RadioGroup>
  {formData.locationSafety === "No" && (
    <TextField
      fullWidth
      label="If not, why not?"
      name="locationSafetyExplanation"
      multiline
      rows={2}
      value={formData.locationSafetyExplanation}
      onChange={handleChange}
      margin="normal"
    />
  )}
</FormControl>

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>Submit</Button>
      </form>
    </Container>
  );
};

export default LocationSurvey;



