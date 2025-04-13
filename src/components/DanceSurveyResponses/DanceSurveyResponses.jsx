import { useEffect, useState } from "react";
import useStore from "../../zustand/store";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../../firebase-config";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";

function DanceSurveyResponses() {
  const fetchDanceResponses = useStore((state) => state.fetchDanceResponses);
  const danceResponses = useStore((state) => state.danceResponses);
  const exportSurveyToCSV = useStore((state) => state.exportSurveyToCSV);
  const user = useStore((state) => state.user);
  const role = useStore((state) => state.role);
  const [docId, setDocId] = useState("");
  const [docInfo, setDocInfo] = useState({});
  const [open, setOpen] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    height: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 30,
    p: 4,
    overflow: "auto",
  };

  useEffect(() => {
    if (role === "admin") {
      fetchDanceResponses();
    }
  }, [role, fetchDanceResponses]);

  const handleClose = () => {
    setOpen(false);
    setDocId("");
  };

  async function getId(id) {
    const docRef = doc(db, "danceSurvey", id);
    const docSnap = await getDoc(docRef);

    if (docId === "") {
      setOpen(true);
      setDocId(id);
      setDocInfo(docSnap.data());
    } else {
      setDocId("");
      setDocInfo({});
    }
  }
  if (!user) return <h3>You must be logged in to view this page.</h3>;
  if (role === null) return <h3>Loading permissions...</h3>;
  if (role !== "admin")
    return (
      <h3>Access denied. You do not have permission to view this page.</h3>
    );

  return (
    <Container
      maxWidth="xl"
      sx={{ p: 4, bgcolor: "#fff", boxShadow: 3, borderRadius: 2 }}
    >
      <Typography variant="h5" gutterBottom>
        Dance Survey Responses
      </Typography>
      <button onClick={() => exportSurveyToCSV("dance")}>Export to CSV</button>
      <TableContainer component={Paper} style={{ marginTop: "1rem" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Date</TableCell>
              {/* <TableCell>Name</TableCell>
              <TableCell>Email</TableCell> */}
              <TableCell>Age</TableCell>
              {/* <TableCell>Contact Permission</TableCell>
              <TableCell>Dancer's Role</TableCell>
              <TableCell>Gender</TableCell> */}
              <TableCell>Zip Code</TableCell>
              {/* <TableCell>Dance Feedback</TableCell>
              <TableCell>Dance Improvement</TableCell>
              <TableCell>Lesson Comments</TableCell>
              <TableCell>DJ Comments</TableCell>
              <TableCell>General Comments</TableCell> */}
              <TableCell>Satisfaction</TableCell>
              <TableCell>Instructor Rating</TableCell>
              <TableCell>Lesson Satisfaction</TableCell>
              <TableCell>Recommendation Likelihood</TableCell>
              <TableCell>DJ Satisfaction</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Schedule</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {danceResponses.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <button onClick={() => getId(row.id)}>More Info</button>
                </TableCell>
                <TableCell>
                  {row.timestamp?.toDate?.().toLocaleString?.() || "—"}
                </TableCell>
                {/* <TableCell>{row.name || "Anonymous"}</TableCell>
                <TableCell>{row.email}</TableCell> */}
                <TableCell>{row.age}</TableCell>
                {/* <TableCell>{row.contactPermission ? "Yes" : "No"}</TableCell>
                <TableCell>{row.dancerRole}</TableCell> */}
                <TableCell>{row.gender}</TableCell>
                <TableCell>{row.zipCode}</TableCell>
                {/* <TableCell>{row.danceFeedback}</TableCell>
                <TableCell>{row.danceImprovement}</TableCell>
                <TableCell>{row.lessonComments}</TableCell>
                <TableCell>{row.djComments}</TableCell>
                <TableCell>{row.generalComments}</TableCell> */}
                <TableCell>{row.danceRatings?.satisfaction}</TableCell>
                <TableCell>{row.danceRatings?.instructor}</TableCell>
                <TableCell>{row.danceRatings?.lessonSatisfaction}</TableCell>
                <TableCell>
                  {row.danceRatings?.recommendationLikelihood}
                </TableCell>
                <TableCell>{row.danceRatings?.djSatisfaction}</TableCell>
                <TableCell>{row.danceRatings?.locationSatisfaction}</TableCell>
                <TableCell>{row.danceRatings?.scheduleSatisfaction}</TableCell>
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
        style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
      >
        <Box sx={style}>
          <div>
            <h3>Survey Respondent Information</h3>
            <p>Name: {docInfo.name}</p>
            <p>Email: {docInfo.email}</p>
            <p>Age: {docInfo.age}</p>
            <p>
              Contact permission: {docInfo.contactPermission ? "Yes" : "No"}
            </p>
            <p>Dancer's Role: {docInfo.dancerRole}</p>
            <p>Gender: {docInfo.gender}</p>
            <p>Zip Code: {docInfo.zipCode}</p>
            <h3>Short Answer Responses</h3>
            <p>Dance Feedback: {docInfo.danceFeedback}</p>
            <p>Dance Improvements: {docInfo.danceImprovement}</p>
            <p>Lead Instructor Comments: {docInfo.lessonComments}</p>
            <p>Follow Instructor Comments: {docInfo.djComments}</p>
            <p>General Comments: {docInfo.generalComments}</p>
            <h3>Dance Ratings</h3>
            <p>Satisfaction: {docInfo.danceRatings?.satisfaction}</p>
            <p>Instructor Rating: {docInfo.danceRatings?.instructor}</p>
            <p>
              Lesson Satisfaction Rating:{" "}
              {docInfo.danceRatings?.lessonSatisfaction}
            </p>
            <p>
              Recommendation Likelihood:{" "}
              {docInfo.danceRatings?.recommendationLikelihood}
            </p>
            <p>DJ Satisfaction: {docInfo.danceRatings?.djSatisfaction}</p>
            <p>
              Location Satisfaction:{" "}
              {docInfo.danceRatings?.locationSatisfaction}
            </p>
            <p>
              Schedule Satisfaction:{" "}
              {docInfo.danceRatings?.scheduleSatisfaction}
            </p>
          </div>
        </Box>
      </Modal>
    </Container>
  );
}

export default DanceSurveyResponses;
