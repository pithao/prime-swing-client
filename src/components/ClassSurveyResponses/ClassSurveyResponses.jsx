import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
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

function ClassSurveyResponses() {
  const [surveys, setSurvey] = useState([]);
  const userCollectionRef = collection(db, "classSurvey");

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = surveys;

  useEffect(() => {
    const getSurveys = async () => {
      const data = await getDocs(userCollectionRef);

      setSurvey(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getSurveys();
  }, []);

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
              <TableCell>Name</TableCell>
              <TableCell align="right">Survey</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default ClassSurveyResponses;
