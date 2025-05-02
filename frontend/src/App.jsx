import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SleepIntroScreen from "./pages/first";
import WelcomeScreen from "./pages/wellcome";
import NicknameScreen from "./pages/signup";
import SleepChangeScreen from "./pages/second";
import SleepDurationScreen from "./pages/third";
import BedtimeScreen from "./pages/fourth";
import WakeUpTimeScreen from "./pages/fifth";
import SleepHoursScreen from "./pages/sixth";
import SleepEfficiencyResult from "./pages/final";
import { Navigate } from 'react-router-dom'; // Import Navigate component

function App() {
  const [isNewUser, setIsNewUser] = useState(false);

  // Check if user is new or returning
  useEffect(() => {
    const nickname = localStorage.getItem("nickname");

    if (nickname) {
      setIsNewUser(false);  // Returning user
    } else {
      setIsNewUser(true);   // First-time user
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* For New User: Go through the full flow */}
        {isNewUser ? (
          <>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/nickname" element={<NicknameScreen />} />
            <Route path="/intro" element={<SleepIntroScreen />} />
            <Route path="/change" element={<SleepChangeScreen />} />
            <Route path="/duration" element={<SleepDurationScreen />} />
            <Route path="/bedtime" element={<BedtimeScreen />} />
            <Route path="/wake-up" element={<WakeUpTimeScreen />} />
            <Route path="/sleep-hours" element={<SleepHoursScreen />} />
            <Route path="/result" element={<SleepEfficiencyResult />} />
          </>
        ) : (
          // For Returning User: Directly show the final result screen
          <Route path="/" element={<Navigate to="/result" />} />
        )}

        {/* Catch-all route to redirect invalid paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
