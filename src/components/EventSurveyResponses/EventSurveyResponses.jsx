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
import Button from "@mui/material/Button";

function EventSurveyResponses() {
  const fetchEventResponses = useStore((state) => state.fetchEventResponses);
  const eventResponses = useStore((state) => state.eventResponses);
  const exportSurveyToCSV = useStore((state) => state.exportSurveyToCSV);
  const user = useStore((state) => state.user);
  const role = useStore((state) => state.role);
  const [docId, setDocId] = useState("");
  const [docInfo, setDocInfo] = useState({});
  const [open, setOpen] = useState(false);
  const paginatedEventResponses = useStore((state) =>
    state.paginatedEventResponses()
  );
  const eventPage = useStore((state) => state.eventPage);
  const eventPageCount = useStore((state) => state.eventPageCount());
  const nextEventPage = useStore((state) => state.nextEventPage);
  const prevEventPage = useStore((state) => state.prevEventPage);

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
      fetchEventResponses();
    }
  }, [role, fetchEventResponses]);

  const handleClose = () => {
    setOpen(false);
    setDocId("");
  };

  async function getId(id) {
    const docRef = doc(db, "eventSurvey", id);
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
        Event Survey Responses
      </Typography>
      <Button variant="outlined" onClick={() => exportSurveyToCSV("event")}>
        Export to CSV
      </Button>
      <TableContainer component={Paper} style={{ marginTop: "1rem" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Date</TableCell>
              {/* <TableCell>Name</TableCell> */}
              {/* <TableCell>Email</TableCell> */}
              <TableCell>Age</TableCell>
              {/* <TableCell>Contact Permission</TableCell> */}
              {/* <TableCell>Dancer's Role</TableCell> */}
              <TableCell>Gender</TableCell>
              <TableCell>Zip Code</TableCell>
              {/* <TableCell>Event Feedback</TableCell>
              <TableCell>Event Improvement</TableCell>
              <TableCell>Pro Comments</TableCell>
              <TableCell>Dance Comments</TableCell>
              <TableCell>Workshop Comments</TableCell>
              <TableCell>DJ Comments</TableCell>
              <TableCell>Additional Workshops</TableCell>
              <TableCell>General Comments</TableCell>
              <TableCell>Dances Attended</TableCell>
              <TableCell>Workshops Attended</TableCell> */}
              <TableCell>Event Satisfaction</TableCell>
              <TableCell>Pro Satisfaction</TableCell>
              <TableCell>DJ Satisfaction</TableCell>
              <TableCell>Workshop</TableCell>
              <TableCell>Recommendation Likelihood</TableCell>
              <TableCell>Workshop Satisfaction</TableCell>
              <TableCell>Location </TableCell>
              <TableCell>Schedule </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedEventResponses.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => getId(row.id)}
                  >
                    View
                  </Button>
                </TableCell>
                <TableCell>
                  {row.timestamp?.toDate?.().toLocaleString?.() || "—"}
                </TableCell>
                {/* <TableCell>{row.name || "Anonymous"}</TableCell> */}
                {/* <TableCell>{row.email}</TableCell> */}
                <TableCell>{row.age}</TableCell>
                {/* <TableCell>{row.contactPermission ? "Yes" : "No"}</TableCell> */}
                {/* <TableCell>{row.dancerRole}</TableCell> */}
                <TableCell>{row.gender}</TableCell>
                <TableCell>{row.zipCode}</TableCell>
                {/* <TableCell>{row.eventFeedback}</TableCell>
                <TableCell>{row.eventImprovement}</TableCell>
                <TableCell>{row.proComments}</TableCell>
                <TableCell>{row.danceComments}</TableCell>
                <TableCell>{row.workshopComments}</TableCell>
                <TableCell>{row.djComments}</TableCell>
                <TableCell>{row.additionalWorkshops}</TableCell>
                <TableCell>{row.generalComments}</TableCell>
                <TableCell>{row.dancesAttended}</TableCell>
                <TableCell>{row.workshopsAttended}</TableCell> */}
                <TableCell>{row.eventRatings?.eventSatisfaction}</TableCell>
                <TableCell>{row.eventRatings?.pro}</TableCell>
                <TableCell>{row.eventRatings?.dj}</TableCell>
                <TableCell>{row.eventRatings?.workshop}</TableCell>
                <TableCell>
                  {row.eventRatings?.recommendationLikelihood}
                </TableCell>
                <TableCell>{row.eventRatings?.workshopSatisfaction}</TableCell>
                <TableCell>{row.eventRatings?.locationSatisfaction}</TableCell>
                <TableCell>{row.eventRatings?.scheduleSatisfaction}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        mt={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Button size="small" onClick={prevEventPage} disabled={eventPage === 0}>
          Previous
        </Button>
        <Typography>
          Page {eventPage + 1} of {eventPageCount}
        </Typography>
        <Button
          size="small"
          onClick={nextEventPage}
          disabled={eventPage >= eventPageCount - 1}
        >
          Next
        </Button>
      </Box>

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
            <p>Dance Feedback: {docInfo.eventFeedback}</p>
            <p>Dance Improvements: {docInfo.eventImprovement}</p>
            <p>Lead Instructor Comments: {docInfo.proComments}</p>
            <p>Lead Instructor Comments: {docInfo.danceComments}</p>
            <p>Lead Instructor Comments: {docInfo.workshopComments}</p>
            <p>Follow Instructor Comments: {docInfo.djComments}</p>
            <p>Lead Instructor Comments: {docInfo.additionalWorkshops}</p>
            <p>General Comments: {docInfo.generalComments}</p>
            <p>Lead Instructor Comments: {docInfo.dancesAttended}</p>
            <p>Lead Instructor Comments: {docInfo.workshopsAttended}</p>
            <h3>Event Ratings</h3>
            <p>Satisfaction: {docInfo.eventRatings?.eventSatisfaction}</p>
            <p>Pro Satisfaction: {docInfo.eventRatings?.pro}</p>
            <p>DJ Satisfaction: {docInfo.eventRatings?.dj}</p>
            <p>Workshop: {docInfo.eventRatings?.workshopComments}</p>
            <p>
              Recommendation Likelihood:{" "}
              {docInfo.eventRatings?.recommendationLikelihood}
            </p>
            <p>
              Workshop Satisfaction:{" "}
              {docInfo.eventRatings?.workshopSatisfaction}
            </p>
            <p>
              Location Satisfaction:{" "}
              {docInfo.eventRatings?.locationSatisfaction}
            </p>
            <p>
              Schedule Satisfaction:{" "}
              {docInfo.eventRatings?.scheduleSatisfaction}
            </p>
          </div>
        </Box>
      </Modal>
    </Container>
  );
}

export default EventSurveyResponses;
