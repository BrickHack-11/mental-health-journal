import { useState } from "react";
import "./pallette.css";
import styles from "./Login.module.css";
import { validateEmail, validatePassword } from "../validations";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });


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
      <div className={styles.containergrid}>
        <img className={styles.filtergreen} src="/logo.svg" alt="logo" />
        <div>
 
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
          </div>
            {errors.email && (
              <p className={styles.errorMessage}>{errors.email}</p>
            )}
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
          </div>
            {errors.password && (
              <p className={styles.errorMessage}>{errors.password}</p>
            )}

          <button className={styles.button} type="submit">
            Login
          </button>

        </form>
          <div className={styles.topmarginpadding}>
            New User? Sign up{" "}
            <span className={styles.signuplink} onClick={() => console.log("Sign Up Clicked")}>Here</span>
          </div>
          </div>
      </div>
    </div>
  );
}

export default Login;
