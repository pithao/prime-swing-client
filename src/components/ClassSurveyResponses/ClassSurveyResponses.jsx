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
  query,
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
import { db } from "../../firebase-config";
function ClassSurveyResponses() {
  const { classResponses, fetchClassResponses, role } = useStore();
  const [responseDetail, setResponseDetail] = useState();
  const [docId, setDocId] = useState("");
  const [isTrue, setIsTrue] = useState(false);
  const [docInfo, setDocInfo] = useState({});
  
  useEffect(() => {
    if (role === "admin") {
      fetchClassResponses();
    }
  }, [fetchClassResponses, role]);

  async function getId(id) {
    const docRef = doc(db, "classSurvey", id);
    const docSnap = await getDoc(docRef);

    if (docId === "") {
      setDocId(id);
      setIsTrue(true);
      setDocInfo(docSnap.data());
    } else {
      setDocId("");
      setIsTrue(false);
      setDocInfo({});
    }

    //Dakodah almost died writing this function...
  }
  if (role !== "admin") {
    return <p style={{ padding: "16px", color: "red" }}>You do not have permission to view this page.</p>;
  }
  return (
    <Container
      maxWidth="xl"
      sx={{ p: 4, bgcolor: "#fff", boxShadow: 3, borderRadius: 2 }}
    >
      <Typography variant="h5" gutterBottom>
        Class Survey Responses
      </Typography>
      <TableContainer component={Paper} style={{ marginTop: "1rem" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
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
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  {row.timestamp?.toDate?.().toLocaleString?.() || "—"}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    cursor: "pointer",
                    color: "blue",
                    textDecoration: "underline",
                  }}
                  onClick={() => {
                    getId(row.id);
                  }}
                >
                  {row.name || "Anonymous"}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.contactPermission}</TableCell>
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
      {/* <Typography gutterBottom> */}
      {/* <pre>{JSON.stringify(responseDetail, null, 2)}</pre> */}
      {/* </Typography> */}
      {isTrue ? (
        <div>
          <h3>General Applicant information:</h3>
          <p>Name: {docInfo.name}</p>
          <p>Email:{docInfo.email}</p>
          <p> Age: {docInfo.age}</p>
          <p>Contact permission: {docInfo.contactPermission}</p>
          <p>Dancer's Roll: {docInfo.dancerRole}</p>
          <p>Gender: {docInfo.gender}</p>
          <p>Zip Code: {docInfo.zipCode}</p>
          <h3>
            The following are all from the short answer section of the survey
          </h3>
          <p>Class Feedback: {docInfo.classFeedback}</p>
          <p>Class Improvments: {docInfo.classImprovement}</p>
          <p>Lead Instructor Comments: {docInfo.leadInstructorComments}</p>
          <p>Follow Instructor Comments: {docInfo.followInstructorComments}</p>
          <p>Additional Topics: {docInfo.additionalTopics}</p>
          <p>General Comments: {docInfo.generalComments}</p>
          <h3>The following are Class Ratings on a scale 1-5</h3>
          <p>Satisfaction: {docInfo.classRatings.satisfaction}</p>
          <p>Lead Instructor Rating: {docInfo.classRatings.leadInstructor}</p>
          <p>
            Follow Instructor Rating: {docInfo.classRatings.followInstructor}
          </p>
          <p>Retake Likelihood: {docInfo.classRatings.retakeLikelihood}</p>
          <p>
            Material Satisfaction: {docInfo.classRatings.materialSatisfaction}
          </p>
          <p>Location: {docInfo.classRatings.locationSatisfaction}</p>
          <p>Schedule: {docInfo.classRatings.scheduleSatisfaction}</p>
        </div>
      ) : (
        <></>
      )}
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
