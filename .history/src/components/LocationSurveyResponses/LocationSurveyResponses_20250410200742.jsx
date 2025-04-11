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

function LocationSurveyResponses() {
  const fetchLocationResponses = useStore((state) => state.fetchLocationResponses);
  const locationResponses = useStore((state) => state.locationResponses);
  const exportSurveyToCSV = useStore((state) => state.exportSurveyToCSV);

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
    fetchLocationResponses();
  }, [fetchLocationResponses]);

  const handleClose = () => {
    setOpen(false);
    setDocId('');
  };

  async function getId(id) {
    const docRef = doc(db, 'locationSurvey', id);
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
       Location Survey Responses
      </Typography>
      <button onClick={() => exportSurveyToCSV('location')}>Export to CSV</button>
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
              <TableCell>Location Feedback</TableCell>
              <TableCell>Location Improvement</TableCell>
              <TableCell>Location Recommendations</TableCell>
              <TableCell>General Comments</TableCell>
              <TableCell>Building Satisfaction</TableCell>
              <TableCell>Dance Floor Satisfaction</TableCell>
              <TableCell>Parking Satisfaction</TableCell>
              <TableCell>Importance of Keeping Same Schedule</TableCell>
              <TableCell>Importance of Keeping Same Dance Schedule</TableCell>
              <TableCell>Importance of Keeping Same Event Schedule</TableCell>
              <TableCell>Move Outside St. Paul?</TableCell>
              <TableCell>Location Challenges</TableCell>
              <TableCell>Location Safety</TableCell>
              <TableCell>Location Challenges Explanation</TableCell>
              <TableCell>Location Safety Explanation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locationResponses.map((row) => (
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
                <TableCell>{row.locationFeedback}</TableCell>
                <TableCell>{row.locationImprovement}</TableCell>
                <TableCell>{row.locationRecommendations}</TableCell>
                <TableCell>{row.generalComments}</TableCell>
                <TableCell>{row.locationRatings?.buildingSatisfaction}</TableCell>
                <TableCell>{row.locationRatings?.danceFloorSatisfaction}</TableCell>
                <TableCell>{row.locationRatings?.parkingSatisfaction}</TableCell>
                <TableCell>{row.locationRatings?.importanceOfKeepingSameSchedule}</TableCell>
                <TableCell>{row.locationRatings?.importanceOfKeepingSameDanceSchedule}</TableCell>
                <TableCell>{row.locationRatings?.importanceOfKeepingSameEventSchedule}</TableCell>
                <TableCell>{row.moveOutsideStPaul}</TableCell>
                <TableCell>{row.locationChallenges}</TableCell>
                <TableCell>{row.locationSafety}</TableCell>
                <TableCell>{row.locationChallengesExplanation}</TableCell>
                <TableCell>{row.locationSafetyExplanation}</TableCell>
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
            <h3>General Information</h3>
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
            <p>Dance Feedback: {docInfo.locationFeedback}</p>
            <p>Dance Improvements: {docInfo.locationImprovement}</p>
            <p>Location Improvement Comments: {docInfo.locationImprovement}</p>
            <p>Location Recommendations: {docInfo.locationRecommendations}</p>
            <p>General Comments: {docInfo.generalComments}</p>
            <h3>Location Ratings</h3>
            <p>Building Satisfaction: {docInfo.locationRatings?.buildingSatisfaction}</p>
            <p>
            Dance Floor Satisfaction: {docInfo.locationRatings?.danceFloorSatisfaction}
            </p>
            <p>
            Parking Satisfaction: {docInfo.locationRatings?.parkingSatisfaction}
            </p>
            <p>
            Importance of Keeping Same Schedule: {docInfo.locationRatings?.importanceOfKeepingSameSchedule}
            </p>
            <p>Importance of Keeping Same Dance Schedule: {docInfo.locationRatings?.importanceOfKeepingSameDanceSchedule}</p>
            <p>
            Importance of Keeping Same Event Schedule:{' '}
              {docInfo.locationRatings?.importanceOfKeepingSameEventSchedule}
            </p>
            <p>
            Move Outside of St Paul?:{' '}
              {docInfo.moveOutsideStPaul}
            </p>
            <p>
            Location Challenges:{' '}
              {docInfo.locationChallenges}
            </p>
            <p>
            Location Safety:{' '}
              {docInfo.locationSafety}
            </p>
            <p>
            Location Challenges Explanation: {docInfo.locationChallengesExplanation}
            </p>
            <p>
            Location Safety Explanation: {docInfo.locationSafetyExplanation}
            </p>
          </div>
        </Box>
      </Modal>
    </Container>
  );
}

export default LocationSurveyResponses;