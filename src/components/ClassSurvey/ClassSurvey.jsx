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
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../../firebase-config'; 
import useStore from '../../zustand/store';

const ClassSurvey = () => {
  const {
    classForm,
    setClassForm,
    resetClassForm
  } = useStore(); 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setClassForm({
      ...classForm,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleRatingChange = (section, key, value) => {
    setClassForm({
      ...classForm,
      [section]: {
        ...classForm[section],
        [key]: value,
      },
    });
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
      await addDoc(collection(db, 'classSurvey'), {
        ...classForm,
        timestamp: serverTimestamp(),
      });
    
      // console.log('Form Submitted:', classForm);
    alert ('Survey Submitted! Thank you for your feedback.');
    resetClassForm();
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
        Class Survey
      </Typography>

      {/* gutterBottom adds spacing ebtween this and the form for formatting. nifty. */}

      <form onSubmit={handleSubmit} >
        <FormControlLabel
          control={
            <Checkbox
              checked={classForm.anonymous}
              onChange={handleChange}
              name="anonymous"
            />
          }
          label="Would you like to remain anonymous?"
        />
        {!classForm.anonymous && (
          <>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={classForm.name}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={classForm.email}
              onChange={handleChange}
              margin="normal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={classForm.contactPermission}
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
            value={classForm.dancerRole}
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
          value={classForm.age}
          onChange={handleChange}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Gender</InputLabel>
          <Select name="gender" value={classForm.gender} onChange={handleChange}>
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
          value={classForm.zipCode}
          onChange={handleChange}
          margin="normal"
        />

        <Typography variant="h6" gutterBottom mt={3}>
          Ratings
        </Typography>

        {/* mt is margin top for Material UI, also for spacing */}

        {Object.keys(classForm.classRatings).map((key) => (
          <FormControl component="fieldset" fullWidth margin="normal" key={key}>
            <Typography>{formatLabel(key)}</Typography>
            <RadioGroup row>
              {[1, 2, 3, 4, 5].map((num) => (
                <FormControlLabel
                  key={num}
                  value={num.toString()}
                  control={
                    <Radio
                      checked={classForm.classRatings[key] == num}
                      onChange={() =>
                        handleRatingChange('classRatings', key, num)
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
          label="What did you like about the class?"
          name="classFeedback"
          multiline
          rows={3}
          value={classForm.classFeedback}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="What could be improved?"
          name="classImprovement"
          multiline
          rows={3}
          value={classForm.classImprovement}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Comments about the lead instructor"
          name="leadInstructorComments"
          multiline
          rows={3}
          value={classForm.leadInstructorComments}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Comments about the follow instructor"
          name="followInstructorComments"
          multiline
          rows={3}
          value={classForm.followInstructorComments}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Are there topics we're not offering that you would like us to offer?"
          name="additionalTopics"
          multiline
          rows={3}
          value={classForm.additionalTopics}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Anything else you would like to share with us?"
          name="generalComments"
          multiline
          rows={3}
          value={classForm.generalComments}
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

export default ClassSurvey;
