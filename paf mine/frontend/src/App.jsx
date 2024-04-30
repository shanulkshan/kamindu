import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreatePlan from "./components/mainpages/workoutplans/CreatePlan";
import Home from "./components/mainpages/workoutplans/Home";
import MyWorkoutPlans from "./components/mainpages/workoutplans/MyWorkoutPlans";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<CreatePlan />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/my_workout_plans" element={<MyWorkoutPlans />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
