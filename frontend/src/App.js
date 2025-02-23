import "./App.css";
import JournalEntry from "./components/JournalEntry";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/journal" element={<JournalEntry />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
