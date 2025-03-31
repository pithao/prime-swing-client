import React, { useState } from 'react';
import {
  Container,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  RadioGroup,
  Radio,
  Button,
  Typography,
} from '@mui/material';
import { 
  collection, 
  getDocs, 
  doc, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../../firebase-config'; 
import useStore from '../../zustand/store';

const LocationSurvey = () => {
  const {
    locationForm,
    setLocationForm,
    resetLocationForm
  } = useStore(); 

  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLocationForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRatingChange = (section, key, value) => {
    setLocationForm((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  const formatLabel = (key) => {
    return (
      key
        .replace(/([A-Z])/g, ' $1')
        // this adds a space after all capital letters so we can use the objects for easier form submission to the database
        .trim()
        // this removes any leading spaces for formatting
        .replace(/^./, (str) => str.toUpperCase())
    );
    // this converts the first letter of the first part of the camel case objects to a capital letter so it reads like real people words
  };
  // writing this function almost ruined my life

  const handleSubmit = async (e) => {
    e.preventDefault();

  try {
    await addDoc(collection(db, 'locationSurveys'), {
      ...locationForm,
      timestamp: serverTimestamp(),
    });
  
    // console.log('Form Submitted:', locationForm);
    alert('Survey Submitted! Thank you for your feedback.');
    resetLocationForm();
  } catch(error) {
    console.error('Error submitting form:', error);
    alert('There was an error submitting the form.');
  }
};

  return (
    <Container
      maxWidth="md"
      sx={{ p: 4, bgcolor: '#fff', boxShadow: 3, borderRadius: 2 }}
    >
      <Typography variant="h5" gutterBottom>
        Location Survey
      </Typography>

      {/* gutterBottom adds spacing ebtween this and the form for formatting. nifty. */}

      <form onSubmit={handleSubmit}>
        <FormControlLabel
          control={
            <Checkbox
              checked={locationForm.anonymous}
              onChange={handleChange}
              name="anonymous"
            />
          }
          label="Would you like to remain anonymous?"
        />
        {!locationForm.anonymous && (
          <>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={locationForm.name}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={locationForm.email}
              onChange={handleChange}
              margin="normal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={locationForm.contactPermission}
                  onChange={handleChange}
                  name="contactPermission"
                />
              }
              label="May we contact you?"
            />
          </>
        )}
        <FormControl fullWidth margin="normal">
          <InputLabel>Dancer Role</InputLabel>
          <Select
            name="dancerRole"
            value={locationForm.dancerRole}
            onChange={handleChange}
          >
            <MenuItem value="Lead only">Lead only</MenuItem>
            <MenuItem value="Mostly lead">Mostly lead</MenuItem>
            <MenuItem value="Both">Both lead & follow</MenuItem>
            <MenuItem value="Mostly follow">Mostly follow</MenuItem>
            <MenuItem value="Only follow">Only follow</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Age"
          name="age"
          type="number"
          value={locationForm.age}
          onChange={handleChange}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Gender</InputLabel>
          <Select name="gender" value={locationForm.gender} onChange={handleChange}>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Non-binary">Non-binary</MenuItem>
            <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Zip Code"
          name="zipCode"
          value={locationForm.zipCode}
          onChange={handleChange}
          margin="normal"
        />

        <Typography variant="h6" gutterBottom mt={3}>
          Ratings
        </Typography>

        {/* mt is margin top for Material UI, also for spacing */}

        {Object.keys(locationForm.locationRatings).map((key) => (
          <FormControl component="fieldset" fullWidth margin="normal" key={key}>
            <Typography>{formatLabel(key)}</Typography>
            <RadioGroup row>
              {[1, 2, 3, 4, 5].map((num) => (
                <FormControlLabel
                  key={num}
                  value={num.toString()}
                  control={
                    <Radio
                      checked={locationForm.locationRatings[key] == num}
                      onChange={() =>
                        handleRatingChange('locationRatings', key, num)
                      }
                    />
                  }
                  label={num}
                />
              ))}
            </RadioGroup>
          </FormControl>
        ))}

        <Typography variant="h6" gutterBottom mt={3}>
          Comments/Long Answers
        </Typography>
        <TextField
          fullWidth
          label="What did you like about the our current location?"
          name="locationFeedback"
          multiline
          rows={3}
          value={locationForm.locationFeedback}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="What could be improved?"
          name="locationImprovement"
          multiline
          rows={3}
          value={locationForm.locationImprovement}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Do you have recommendations for a new location for our club?"
          name="locationRecommendations"
          multiline
          rows={3}
          value={locationForm.locationRecommendations}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Anything else you would like to share with us?"
          name="generalComments"
          multiline
          rows={3}
          value={locationForm.generalComments}
          onChange={handleChange}
          margin="normal"
        />

        <Typography variant="h6" gutterBottom mt={3}>
          Additional Questions
        </Typography>

        <FormControl component="fieldset" margin="normal" fullWidth>
          <Typography>
            Would you continue to attend if we moved our location out of St.
            Paul?
          </Typography>
          <RadioGroup
            row
            name="moveOutsideStPaul"
            value={locationForm.moveOutsideStPaul}
            onChange={handleChange}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" margin="normal" fullWidth>
          <Typography>
            Is there anything about our current location that keeps or
            discourages you from attending?
          </Typography>
          <RadioGroup
            row
            name="locationChallenges"
            value={locationForm.locationChallenges}
            onChange={handleChange}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
          {locationForm.locationChallenges === 'Yes' && (
            <TextField
              fullWidth
              label="If so, what?"
              name="locationChallengesExplanation"
              multiline
              rows={2}
              value={locationForm.locationChallengesExplanation}
              onChange={handleChange}
              margin="normal"
            />
          )}
        </FormControl>

        <FormControl component="fieldset" margin="normal" fullWidth>
          <Typography>
            Do you feel safe & comfortable at the current location?
          </Typography>
          <RadioGroup
            row
            name="locationSafety"
            value={locationForm.locationSafety}
            onChange={handleChange}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
          {locationForm.locationSafety === 'No' && (
            <TextField
              fullWidth
              label="If not, why not?"
              name="locationSafetyExplanation"
              multiline
              rows={2}
              value={locationForm.locationSafetyExplanation}
              onChange={handleChange}
              margin="normal"
            />
          )}
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default LocationSurvey;
