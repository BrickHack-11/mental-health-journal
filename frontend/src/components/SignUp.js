/* eslint-disable no-unused-vars */
import { useState } from "react";
import styles from "./SignUp.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateName,
  validateGender,
  validateBirthday,
} from "../validations";

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    birthday: new Date(),
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    birthday: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      birthday: "",
      password: "",
    };

    if (!validateName(formData.firstName)) {
      newErrors.firstName = "Invalid first name";
      valid = false;
    }
    if (!validateName(formData.lastName)) {
      newErrors.lastName = "Invalid last name";
      valid = false;
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }
    if (!validateGender(formData.gender)) {
      newErrors.gender = "Please select your gender from the options";
      valid = false;
    }
    if (!validateBirthday(formData.birthday)) {
      newErrors.birthday =
        "You must be at least 18 years old to sign up. Do not provide a date in the future";
      valid = false;
    }
    if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password must be at least 6 characters, contain a number and a special character";
      valid = false;
    }
    if (!validateConfirmPassword(formData.password, formData.confirmPassword)) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }
    setErrors(newErrors);

    console.log("Form Data:", formData);
  };

  const signUpUser = async () => {
    try {
      const formattedBirthday = formData.birthday.toISOString().split("T")[0];

      const userData = {
        fname: formData.firstName,
        lname: formData.lastName,
        birthdate: formattedBirthday,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
      };

      const response = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Signup successful! Redirecting to login...");
        navigate("/login");
      } else {
        alert(result.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("An error occured. Please try again later.");
    }
  };

  return (
    <div className={styles.container}>
      <img className={styles.filtergreen} src="/logo.svg" alt="logo" />{" "}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputcontainer}>
          <label>First Name:</label>
          <input
            className={styles.input}
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        {errors.firstName && (
          <p className={styles.errorMessage}>{errors.firstName}</p>
        )}

        <div className={styles.inputcontainer}>
          <label>Last Name:</label>
          <input
            className={styles.input}
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        {errors.lastName && (
          <p className={styles.errorMessage}>{errors.lastName}</p>
        )}

        <div className={styles.inputcontainer}>
          <label>Email:</label>
          <input
            className={styles.input}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}

        <div className={styles.inputcontainer}>
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={styles.input}
          >
            <option value="unchosen">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        {errors.gender && (
          <p className={styles.errorMessage}>{errors.gender}</p>
        )}

        <div className={styles.inputcontainer}>
          <label>Birthday:</label>
          <DatePicker
            className={styles.dateinput}
            selected={formData.birthday}
            onChange={(date) => setFormData({ ...formData, birthday: date })}
          />
        </div>
        {errors.birthday && (
          <p className={styles.errorMessage}>{errors.birthday}</p>
        )}

        <div className={styles.inputcontainer}>
          <label>Password:</label>
          <input
            className={styles.input}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {errors.password && (
          <p className={styles.errorMessage}>{errors.password}</p>
        )}

        <div className={styles.inputcontainer}>
          <label>Confirm Password:</label>
          <input
            className={styles.input}
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {errors.confirmPassword && (
          <p className={styles.errorMessage}>{errors.confirmPassword}</p>
        )}
        <button className={styles.button} type="submit" onClick={signUpUser}>
          Sign Up
        </button>
      </form>
      <div className={styles.topmarginpadding}>
        Existing User? Log in{" "}
        <span className={styles.signuplink} onClick={() => navigate("/login")}>
          Here
        </span>
      </div>
    </div>
  );
}

export default SignUp;
