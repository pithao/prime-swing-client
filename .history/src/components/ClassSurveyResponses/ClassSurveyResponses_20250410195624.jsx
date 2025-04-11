import { useEffect, useState } from 'react';
import useStore from '../../zustand/store';
import {
  doc,
  getDoc,
} from 'firebase/firestore';

import { db } from '../../firebase-config';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';

function ClassSurveyResponses() {
  const fetchClassResponses = useStore((state) => state.fetchClassResponses);
  const classResponses = useStore((state) => state.classResponses);

  
  const [docId, setDocId] = useState('');
  const [docInfo, setDocInfo] = useState({});
  const [open, setOpen] = useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 30,
    p: 4,
    overflow: 'auto',
  };

  useEffect(() => {
    fetchClassResponses();
  }, [fetchClassResponses]);

  const handleClose = () => {
    setOpen(false);
    setDocId('');
  };

  async function getId(id) {
    const docRef = doc(db, 'classSurvey', id);
    const docSnap = await getDoc(docRef);

    if (docId === '') {
      setOpen(true);
      setDocId(id);
      setDocInfo(docSnap.data());
    } else {
      setDocId('');
      setDocInfo({});
    }
  }

  return (
    <Container
      maxWidth="xl"
      sx={{ p: 4, bgcolor: '#fff', boxShadow: 3, borderRadius: 2 }}
    >
      <Typography variant="h5" gutterBottom>
        Class Survey Responses
      </Typography>
      <TableContainer component={Paper} style={{ marginTop: '1rem' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Contact Permission</TableCell>
              <TableCell>Dancer's Role</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Zip Code</TableCell>
              <TableCell>Class Feedback</TableCell>
              <TableCell>Class Improvement</TableCell>
              <TableCell>Lead Instructor Comments</TableCell>
              <TableCell>Follow Instructor Comments</TableCell>
              <TableCell>Additional Topics</TableCell>
              <TableCell>General Comments</TableCell>
              <TableCell>Satisfaction</TableCell>
              <TableCell>Lead Instructor Rating</TableCell>
              <TableCell>Follow Instructor Rating</TableCell>
              <TableCell>Retake Liklihood</TableCell>
              <TableCell>Material Satisfaction</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Schedule</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classResponses.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <button onClick={() => getId(row.id)}>More Info</button>
                </TableCell>
                <TableCell>
                  {row.timestamp?.toDate?.().toLocaleString?.() || '—'}
                </TableCell>
                <TableCell>{row.name || 'Anonymous'}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.contactPermission ? 'Yes' : 'No'}</TableCell>
                <TableCell>{row.dancerRole}</TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell>{row.zipCode}</TableCell>
                <TableCell>{row.classFeedback}</TableCell>
                <TableCell>{row.classImprovement}</TableCell>
                <TableCell>{row.leadInstructorComments}</TableCell>
                <TableCell>{row.followInstructorComments}</TableCell>
                <TableCell>{row.additionalTopics}</TableCell>
                <TableCell>{row.generalComments}</TableCell>
                <TableCell>{row.classRatings?.satisfaction}</TableCell>
                <TableCell>{row.classRatings?.leadInstructor}</TableCell>
                <TableCell>{row.classRatings?.followInstructor}</TableCell>
                <TableCell>{row.classRatings?.retakeLikelihood}</TableCell>
                <TableCell>{row.classRatings?.materialSatisfaction}</TableCell>
                <TableCell>{row.classRatings?.locationSatisfaction}</TableCell>
                <TableCell>{row.classRatings?.scheduleSatisfaction}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
      >
        <Box sx={style}>
          <div>
            <h3>General Applicant Information</h3>
            <p>Name: {docInfo.name}</p>
            <p>Email: {docInfo.email}</p>
            <p>Age: {docInfo.age}</p>
            <p>
              Contact permission: {docInfo.contactPermission ? 'Yes' : 'No'}
            </p>
            <p>Dancer's Role: {docInfo.dancerRole}</p>
            <p>Gender: {docInfo.gender}</p>
            <p>Zip Code: {docInfo.zipCode}</p>
            <h3>Short Answer Responses</h3>
            <p>Class Feedback: {docInfo.classFeedback}</p>
            <p>Class Improvements: {docInfo.classImprovement}</p>
            <p>Lead Instructor Comments: {docInfo.leadInstructorComments}</p>
            <p>
              Follow Instructor Comments: {docInfo.followInstructorComments}
            </p>
            <p>Additional Topics: {docInfo.additionalTopics}</p>
            <p>General Comments: {docInfo.generalComments}</p>
            <h3>Class Ratings</h3>
            <p>Satisfaction: {docInfo.classRatings?.satisfaction}</p>
            <p>
              Lead Instructor Rating: {docInfo.classRatings?.leadInstructor}
            </p>
            <p>
              Follow Instructor Rating: {docInfo.classRatings?.followInstructor}
            </p>
            <p>Retake Likelihood: {docInfo.classRatings?.retakeLikelihood}</p>
            <p>
              Material Satisfaction:{' '}
              {docInfo.classRatings?.materialSatisfaction}
            </p>
            <p>
              Location Satisfaction:{' '}
              {docInfo.classRatings?.locationSatisfaction}
            </p>
            <p>
              Schedule Satisfaction:{' '}
              {docInfo.classRatings?.scheduleSatisfaction}
            </p>
          </div>
        </Box>
      </Modal>
    </Container>
  );
}

export default ClassSurveyResponses;

