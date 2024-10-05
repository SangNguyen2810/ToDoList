import React, { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home"
import ToDoPage from "./pages/ToDoPage/ToDoPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<ToDoPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;