import "./App.css";
import JournalEntry from "./components/JournalEntry";
import JournalLog from "./components/JournalLog";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route default path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/journal" element={<JournalEntry />} />
          <Route path="/view-journal" element={<JournalLog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
