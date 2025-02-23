import { useState } from "react";
import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return (
      password.length >= 6 &&
      password.length <= 16 &&
      /\d/.test(password) &&
      /[!@#$%^&*]/.test(password)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = { email: "", password: "" };

    if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }
    if (!validatePassword(password)) {
      newErrors.password =
        "Password must be at least 6 characters, contain a number and a special character";
      valid = false;
    }
    setErrors(newErrors);
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
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({ ...errors, email: "" });
            }}
          />
          {errors.email && (
            <p className={styles.errorMessage}>{errors.email}</p>
          )}
        </div>
        <div className={styles.inputcontainer}>
          <label>Password:</label>
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors({ ...errors, password: "" });
            }}
          />
          {errors.password && (
            <p className={styles.errorMessage}>{errors.password}</p>
          )}
        </div>

        <button className={styles.button} type="submit">
          Login
        </button>

        <div>
          New User? Sign up{" "}
          <span onClick={() => console.log("Sign Up Clicked")}>Here</span>
        </div>
      </form>
    </div>
  );
}

export default Login;
