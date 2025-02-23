import { useState } from "react";
import colors from "./pallette.css";
import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const handleNewUser = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h1>MindScribe</h1>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputcontainer}>
          <label>Email:</label>
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputcontainer}>
          <label>Password:</label>
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className={styles.button} type="submit">
          Login
        </button>
        <div className={styles.topmarginpadding}>
          New User? Sign up <span onClick={handleNewUser}>Here</span>
        </div>
      </form>
    </div>
  );
}

export default Login;
