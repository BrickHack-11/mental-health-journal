import { useState } from "react";
import "./pallette.css";
import styles from "./Login.module.css";
import jestyles from "./JournalEntry.module.css";

function JournalEntry() {
  const [feeling, setFeeling] = useState("");
  const [mood, setMood] = useState("");
  const [sleepQuality, setSleepQuality] = useState(5);
  return (
    <div className={styles.container}>
      <h1 className={styles.filtergreen}>Journal Entry for {new Date().toLocaleDateString()}</h1>
      <form className={jestyles.form}>
        <div>
          <label>How are you feeling today?</label>{" "}
        </div>
        <div>
          <select
            className={jestyles.dropdowninput}
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
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
            <label>What contributed to your mood?</label>{" "}
          </div>
          <div>
            <select
              className={jestyles.dropdowninput}
              value={mood}
              onChange={(e) => setMood(e.target.value)}
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
          <label>Your journal entry for today:</label>
          <div>
            <textarea
              className={jestyles.textarea}
              required
              placeholder="Start typing..."
              rows="14"
              cols="50"
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
          <button className={styles.button} type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default JournalEntry;
