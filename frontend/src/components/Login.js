import { useState } from "react";
import "./pallette.css";
import styles from "./Login.module.css";
import { validateEmail, validatePassword } from "../validations";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const navigate = useNavigate();
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

  const loginUser = async () => {
    if (!email || !password) {
      setErrors({
        email: "Email is required",
        password: "Password is required",
      });
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        setErrors({ email: "", password: data.message || "Login Failed" });
        return;
      }
      navigate("/journal");
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        email: "",
        password: "Something went wrong. Try again later.",
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.containergrid}>
        <img className={styles.filtergreen} src="/logo.svg" alt="logo" />
        <div className={styles.flexbox}>
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

            <button className={styles.button} type="submit" onClick={loginUser}>
              Login
            </button>
          </form>
          <div className={styles.topmarginpadding}>
            New User? Sign up{" "}
            <span
              className={styles.signuplink}
              onClick={() => navigate("/signup")}
            >
              Here
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
