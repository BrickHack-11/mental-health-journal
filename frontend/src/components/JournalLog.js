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
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(email);
    // fetch data from backend for given user. load the array into data
    // data should be an array of objects, use setData to set the data
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
    fetchData();
    //   setData(initialData);
    //   setSelectedData(initialData[0]);
    //   //console.log(initialData[0]);
    //   console.log(selectedData.responses);
    // setSelectedIndex(0);
    // setSelectedData(data[selectedIndex]);
    //   setLoading(false);
  }, [email]);

  return (
    <>
      <div className={jstyles.container}>
        <div className={jstyles.leftPanel}>
          <div>
            <ul className={jstyles.ulmargin}>
              {data.map((item, index) => (
                <li
                  className={jstyles.entryItem}
                  key={index}
                  onClick={() => {
                    setSelectedIndex(index);
                    setSelectedData(data[index]);
                  }}
                >
                  {item.entry_id.slice(0, 16).trim()}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {selectedData && (
          <div className={jstyles.rightPanel}>
            <h2 className={jstyles.filtergreen}>{selectedData.entry_id}</h2>
            <p className={jstyles.textpad}>{selectedData["log_entry"]}</p>
            <p>
              <strong>Mood:</strong> {selectedData.mood}
            </p>
            <p>
              <strong>Responses:</strong>
              <ul className={jstyles.ulmargin}>
                {selectedData.responses.map(
                  (response, index) =>
                    response && (
                      <li className={jstyles.entryItem} key={index}>
                        {response}
                      </li>
                    )
                )}
              </ul>
            </p>
            <p>
              <strong>Sentiment:</strong> {selectedData.sentiment}
            </p>
            <p>
              <strong>Sleep Quality:</strong> {selectedData.sleep_quality}
            </p>
          </div>
        )}
      </div>
      {loading && <Loader />}
    </>
  );
}

export default JournalLog;
