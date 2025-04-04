import { useEffect, useState } from "react";
import useStore from "../../zustand/store";

// import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
  where,
  query
} from "firebase/firestore";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { db } from '../../firebase-config'; 
import { Modal } from "@mui/material";
import Box from '@mui/material/Box';
function ClassSurveyResponses() {
  const { classResponses, fetchClassResponses } = useStore();
  const [ responseDetail, setResponseDetail ] = useState();
  const [ docId, setDocId ] = useState('')
  const [ isTrue, setIsTrue ] = useState(false);
  const [ docInfo, setDocInfo ] = useState({});
  const [ open, setOpen ] = useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    fetchClassResponses();
    function resDetail(){
  setResponseDetail(
    classResponses.filter((response) => response.id === "1CcaJGYEU0UoPxHhSgvF")
    
  );
  
}
  }, [fetchClassResponses]);

  const handleClose = () => {
    setOpen(false) 
    setDocId('');
  }
async function getId(id) {
  const docRef = doc(db, "classSurvey", id)
  const docSnap = await getDoc(docRef)
  
  if ( docId === '' ){
    setOpen(true);
    setDocId(id)
    setIsTrue(true)
    setDocInfo(docSnap.data())
  } else {
    setDocId('')
    setIsTrue(false)
    setDocInfo({})
  }
  
  
  
  //Dakodah almost died writing this function...
}

  

  return (
    <Container
      maxWidth="lg"
      sx={{ p: 4, bgcolor: "#fff", boxShadow: 3, borderRadius: 2 }}
    >
      <Typography variant="h5" gutterBottom>
        Class Survey Responses
      </Typography>
      <TableContainer component={Paper} style={{ marginTop: "1rem" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell  >Name</TableCell>
              <TableCell align="right">Feedback</TableCell>
              <TableCell align="right">Timestamp</TableCell>
              <TableCell align="right">ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classResponses.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
               <button onClick={()=>{getId(row.id)}}>More Info</button>
               <Modal
               open={open}
               onClose={handleClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
               >
                <Box sx={style}>
                <div>
                    <h3>General Applicant information:</h3>
                    <p>Name: {docInfo.name}</p>
                    <p>Email:{docInfo.email}</p>
                    <p> Age: {docInfo.age}</p>
                    <p>Contact permission: {docInfo.contactPermission}</p>
                    <p>Dancer's Roll: {docInfo.dancerRole}</p>
                    <p>Gender: {docInfo.gender}</p>
                    <p>Zip Code: {docInfo.zipCode}</p>
                    <h3>The following are all from the short answer section of the survey</h3>
                    <p>Class Feedback: {docInfo.classFeedback}</p>
                    <p>Class Improvments: {docInfo.classImprovement}</p>
                    <p>Lead Instructor Comments: {docInfo.leadInstructorComments}</p>
                    <p>Follow Instructor Comments: {docInfo.followInstructorComments}</p>
                    <p>Additional Topics: {docInfo.additionalTopics}</p>
                    <p>General Comments: {docInfo.generalComments}</p>
                    {/* <h3>The following are Class Ratings on a scale 1-5</h3>
                    <p>Satisfaction: {docInfo.classRatings.satisfaction}</p>
                    <p>Lead Instructor Rating: {docInfo.classRatings.leadInstructor}</p>
                    <p>Follow Instructor Rating: {docInfo.classRatings.followInstructor}</p>
                    <p>Retake Likelihood: {docInfo.classRatings.retakeLikelihood}</p>
                    <p>Material Satisfaction: {docInfo.classRatings.materialSatisfaction}</p>
                    <p>Location: {docInfo.classRatings.locationSatisfaction}</p>
                    <p>Schedule: {docInfo.classRatings.scheduleSatisfaction}</p> */}
                  </div>  
                </Box>
               </Modal>
                <TableCell component="th" scope="row" >
                  {row.name || "Anonymous"}
                </TableCell>
                <TableCell align="right">
                  {row.classFeedback || "N/A"}
                </TableCell>
                <TableCell align="right">
                  {row.timestamp?.toDate?.().toLocaleString?.() || "—"}
                </TableCell>
                <TableCell align="right">{row.id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Typography gutterBottom> */}
      {/* <pre>{JSON.stringify(responseDetail, null, 2)}</pre> */}
      {/* </Typography> */}
      
    
    </Container>
    

  );
}

export default ClassSurveyResponses;

// function ClassSurveyResponses() {
//   const [surveys, setSurvey] = useState([]);
//   const userCollectionRef = collection(db, "classSurvey");

//   function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
//   }

//   const rows = surveys;

//   useEffect(() => {
//     const getSurveys = async () => {
//       const data = await getDocs(userCollectionRef);

//       setSurvey(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//     };
//     getSurveys();
//   }, []);

//   return (
//     <Container
//       maxWidth="lg"
//       sx={{ p: 4, bgcolor: "#fff", boxShadow: 3, borderRadius: 2 }}
//     >
//       <Typography variant="h5" gutterBottom>
//         Class Survey Responses
//       </Typography>
//       <TableContainer component={Paper} style={{ marginTop: "1rem" }}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell align="right">Survey</TableCell>
//               <TableCell align="right">Date</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row) => (
//               <TableRow
//                 key={row.name}
//                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//               >
//                 <TableCell component="th" scope="row">
//                   {row.name}
//                 </TableCell>
//                 <TableCell align="right">{row.title}</TableCell>
//                 <TableCell align="right">{row.fat}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// }

// export default ClassSurveyResponses;
