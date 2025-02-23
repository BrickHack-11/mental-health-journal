import { useEffect, useState } from "react";
import "./pallette.css";
import styles from "./Login.module.css";
import jestyles from "./JournalEntry.module.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Loader from "./Loader";

function JournalEntry({ email }) {
  const [mood, setMood] = useState("Happy");
  const [contri, setContri] = useState("Work/Studies");
  const [sleepQuality, setSleepQuality] = useState(5);
  const [journalText, setJournalText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (email === "") {
      navigate("/login");
    }
  }, [email, navigate]);

  const submitJournalEntry = async (e) => {
    e.preventDefault();
    setLoading(true);
    const entryData = {
      email,
      mood,
      contribution: contri,
      sleep: sleepQuality,
      log_entry: journalText,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entryData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to save journal entry");
      }
      // clear data
      setMood("Happy");
      setContri("Work/Studies");
      setSleepQuality(5);
      setJournalText("");
      // navigate("/view-journal");
    } catch (error) {
      console.error("Error saving journal entry: ", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      // navigate("/view-journal");
    }
  };

  return (
    <>
      <Header email={email} />
      <div className={styles.container}>
        <h1 className={styles.filtergreen}>
          Journal Entry for {new Date().toLocaleDateString()}
        </h1>
        <form className={jestyles.form}>
          <div>
            <label>How are you feeling today?</label>{" "}
          </div>
          <div>
            <select
              className={jestyles.dropdowninput}
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              id="options"
            >
              <option value="Happy">Happy</option>
              <option value="Sad">Sad</option>
              <option value="Stressed">Stressed</option>
              <option value="Anxious">Anxious</option>
              <option value="Tired">Tired</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <div>
              <label>What contributed to your mood?</label>
            </div>
            <div>
              <select
                className={jestyles.dropdowninput}
                value={contri}
                onChange={(e) => setContri(e.target.value)}
                id="options"
              >
                <option value="Work/Studies"> Work/Studies</option>
                <option value="Relationships">Relationships</option>
                <option value="Health & Fitness">Health & Fitness</option>
                <option value="Social Life">Social Life</option>
                <option value="Finances">Finances</option>
                <option value="Weather">Weather</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label>Want to tell more?</label>
            <div>
              <textarea
                className={jestyles.textarea}
                required
                placeholder="Start typing..."
                value={journalText}
                rows="5"
                cols="50"
                onChange={(e) => setJournalText(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div>
            <div>
              <label>
                On a scale of 1-10, how well did you sleep last night?
              </label>
              <input
                className={jestyles.slider}
                type="range"
                min="1"
                max="10"
                value={sleepQuality}
                onChange={(e) => setSleepQuality(e.target.value)}
                id="sleepScale"
              />
              <span>{sleepQuality}</span>
            </div>
          </div>
          <br />
          <div>
            <button
              className={styles.button}
              type="submit"
              onClick={(e) => {
                submitJournalEntry(e);
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      {loading && <Loader />}
    </>
  );
}

export default JournalEntry;
