import "./App.css";
import { useState } from "react";

import Header from "./components/Header";
import JournalEntry from "./components/JournalEntry";
import JournalLog from "./components/JournalLog";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Route, Routes, BrowserRouter } from "react-router-dom";
function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <Header title="View Journal"></Header>
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
              />
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/journal" element={<JournalEntry email={email} />} />
          <Route path="/view-journal" element={<JournalLog email={email} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
