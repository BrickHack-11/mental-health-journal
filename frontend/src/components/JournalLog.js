import styles from "./Login.module.css";
import jstyles from "./JournalLog.module.css";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

function JournalLog({ email }) {
  const [data, setData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedData, setSelectedData] = useState({ responses: [] });
  const [loading, setLoading] = useState(false);
  const initialData = [
    {
      entry_id: "Sun, 23 Feb 2025 01:07:32 GMT",
      "log entry":
        "I am not feeling very good today, It seems I won't get a job, and with the loan over my head it seems everything is coming to an depressing end",
      mood: "Sad",
      responses: [
        "",
        "budgeting for essentials, taking regular breaks to relax",
      ],
      sentiment: "mostly negative",
      sleep_quality: 7,
    },
    {
      entry_id: "Mon, 24 Feb 2025 08:15:45 GMT",
      "log entry":
        "Today was a bit better. I managed to complete a few tasks and felt a bit more productive.",
      mood: "Neutral",
      responses: ["", "setting small, achievable goals"],
      sentiment: "neutral",
      sleep_quality: 6,
    },
    {
      entry_id: "Tue, 25 Feb 2025 10:22:10 GMT",
      "log entry":
        "Feeling quite happy today! Had a great conversation with a friend and enjoyed a nice walk in the park.",
      mood: "Happy",
      responses: ["", "socializing, spending time in nature"],
      sentiment: "positive",
      sleep_quality: 8,
    },
    {
      entry_id: "Wed, 26 Feb 2025 09:30:00 GMT",
      "log entry":
        "Had a rough night, couldn't sleep well. Feeling tired and a bit irritable.",
      mood: "Tired",
      responses: ["", "practicing good sleep hygiene, taking naps"],
      sentiment: "mostly negative",
      sleep_quality: 4,
    },
  ];
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(email);
    // fetch data from backend for given user. load the array into data
    // data should be an array of objects, use setData to set the data
    if (email === "") {
      navigate("/login");
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://127.0.0.1:5000/journal?email=${email}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const result = await response.json();
          setData(result.entries);
          if (result.length > 0) {
            setSelectedData(result[0]);
            setSelectedIndex(0);
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
          setLoading(false);
        }
      };
      //fetchData();
      setData(initialData);
      setSelectedData(initialData[0]);
      //console.log(initialData[0]);
      console.log(selectedData.responses);
      setSelectedIndex(0);
      setLoading(false);
    }
  }, [email, navigate]);

  return (
    <>
      <div className={jstyles.container}>
        <div className={jstyles.leftPanel}>
          <div>
            <ul>
              {data.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedIndex(index);
                    setSelectedData(data[index]);
                  }}
                >
                  {data[index].entry_id.slice(0, 16).trim()}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={jstyles.rightPanel}>
          <h2>{selectedData.entry_id}</h2>
          <p>{selectedData["log entry"]}</p>
          <p>
            <strong>Mood:</strong> {selectedData.mood}
          </p>
          <p>
            <strong>Responses:</strong>
          </p>
          <ul>
            {selectedData.responses.map((response, index) => (
              <li key={index}>{response}</li>
            ))}
          </ul>
          <p>
            <strong>Sentiment:</strong> {selectedData.sentiment}
          </p>
          <p>
            <strong>Sleep Quality:</strong> {selectedData.sleep_quality}
          </p>
        </div>
      </div>
      {loading && <Loader />}
    </>
  );
}

export default JournalLog;
