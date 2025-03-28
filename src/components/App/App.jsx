import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import useStore from "../../zustand/store";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import HomePage from "../HomePage/HomePage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import ClassSurvey from "../ClassSurvey/ClassSurvey";
import EventSurvey from "../EventSurvey/EventSurvey";
import DanceSurvey from "../DanceSurvey/DanceSurvey";
import LocationSurvey from "../LocationSurvey/LocationSurvey";
import ClassSurveyResponses from "../ClassSurveyResponses/ClassSurveyResponses";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const user = useStore((state) => state.user);
  const fetchUser = useStore((state) => state.fetchUser);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#000000",
      },
      secondary: {
        main: "#c20020",
      },
    },
  });

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Header />
        <Box component="main" style={{ marginTop: "3rem", padding: "0 .5rem" }}>
          <Routes>
            <Route
              exact
              path="/"
              element={
                user.id ? (
                  <HomePage /> // Render HomePage for authenticated user.
                ) : (
                  <Navigate to="/login" replace /> // Redirect unauthenticated user.
                )
              }
            />
            <Route
              exact
              path="/login"
              element={
                user.id ? (
                  <Navigate to="/" replace /> // Redirect authenticated user.
                ) : (
                  <LoginPage /> // Render LoginPage for unauthenticated user.
                )
              }
            />
            <Route
              exact
              path="/registration"
              element={
                user.id ? (
                  <Navigate to="/" replace /> // Redirect authenticated user.
                ) : (
                  <RegisterPage /> // Render RegisterPage for unauthenticated user.
                )
              }
            />
            <Route
              exact
              path="/class-survey-responses"
              element={<ClassSurveyResponses />}
            />
            <Route
              exact
              path="/about"
              element={
                <>
                  <h2>About Page</h2>
                  <p>
                    Intelligence doesn’t seem like an aspect of personal
                    character, and it isn’t. Coincidentally, great intelligence
                    is only loosely connected to being a good programmer.
                  </p>
                  <p>What? You don’t have to be superintelligent?</p>
                  <p>
                    No, you don’t. Nobody is really smart enough to program
                    computers. Fully understanding an average program requires
                    an almost limitless capacity to absorb details and an equal
                    capacity to comprehend them all at the same time. The way
                    you focus your intelligence is more important than how much
                    intelligence you have…
                  </p>
                  <p>
                    …most of programming is an attempt to compensate for the
                    strictly limited size of our skulls. The people who are the
                    best programmers are the people who realize how small their
                    brains are. They are humble. The people who are the worst at
                    programming are the people who refuse to accept the fact
                    that their brains aren’t equal to the task. Their egos keep
                    them from being great programmers. The more you learn to
                    compensate for your small brain, the better a programmer
                    you’ll be.
                    <span className="squiggle">
                      {" "}
                      The more humble you are, the faster you’ll improve.
                    </span>
                  </p>
                  <p>
                    --From Steve McConnell's <em>Code Complete</em>.
                  </p>
                </>
              }
            />
            <Route exact path="/class-survey" element={<ClassSurvey />} />
            <Route exact path="/event-survey" element={<EventSurvey />} />
            <Route exact path="/dance-survey" element={<DanceSurvey />} />
            <Route exact path="/location-survey" element={<LocationSurvey />} />
            <Route path="*" element={<h2>404 Page</h2>} />
          </Routes>
        </Box>
        <Footer />
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
