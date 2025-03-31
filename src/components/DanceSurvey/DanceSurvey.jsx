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
import { getFirestore } from 'firebase/firestore';
import { 
  collection, 
  getDocs, 
  doc, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../../firebase-config'; 
import useStore from '../../zustand/store';

const DanceSurvey = () => {
  const {
    danceForm,
    setDanceForm,
    resetDanceForm
  } = useStore();  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDanceForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRatingChange = (section, key, value) => {
    setDanceForm((prev) => ({
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
      await addDoc(collection(db, 'danceSurveys'), {
        ...danceForm,
        timestamp: serverTimestamp(),
      });

      alert('Survey Submitted! Thank you for your feedback.');
      resetDanceForm();
    } catch (error) {
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
        Dance Survey
      </Typography>

      {/* gutterBottom adds spacing between this and the form for formatting. nifty. */}

      <form onSubmit={handleSubmit}>
        <FormControlLabel
          control={
            <Checkbox
              checked={danceForm.anonymous}
              onChange={handleChange}
              name="anonymous"
            />
          }
          label="Would you like to remain anonymous?"
        />
        {!danceForm.anonymous && (
          <>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={danceForm.name}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={danceForm.email}
              onChange={handleChange}
              margin="normal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={danceForm.contactPermission}
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
            value={danceForm.dancerRole}
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
          value={danceForm.age}
          onChange={handleChange}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Gender</InputLabel>
          <Select name="gender" value={danceForm.gender} onChange={handleChange}>
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
          value={danceForm.zipCode}
          onChange={handleChange}
          margin="normal"
        />

        <Typography variant="h6" gutterBottom mt={3}>
          Ratings
        </Typography>

        {/* mt is margin top for Material UI, also for spacing */}

        {Object.keys(danceForm.danceRatings).map((key) => (
          <FormControl component="fieldset" fullWidth margin="normal" key={key}>
            <Typography>{formatLabel(key)}</Typography>
            <RadioGroup row>
              {[1, 2, 3, 4, 5].map((num) => (
                <FormControlLabel
                  key={num}
                  value={num.toString()}
                  control={
                    <Radio
                      checked={danceForm.danceRatings[key] == num}
                      onChange={() =>
                        handleRatingChange('danceRatings', key, num)
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
          label="What did you like about the dance?"
          name="danceFeedback"
          multiline
          rows={3}
          value={danceForm.danceFeedback}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="What could be improved?"
          name="danceImprovement"
          multiline
          rows={3}
          value={danceForm.danceImprovement}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Comments about the lesson"
          name="lessonComments"
          multiline
          rows={3}
          value={danceForm.lessonComments}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Comments about the DJ"
          name="djComments"
          multiline
          rows={3}
          value={danceForm.djComments}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Anything else you would like to share with us?"
          name="generalComments"
          multiline
          rows={3}
          value={danceForm.generalComments}
          onChange={handleChange}
          margin="normal"
        />

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

export default DanceSurvey;
