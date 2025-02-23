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

const validateConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};

const validateName = (name) => {
  const trimmedName = name.trim(); // Remove leading & trailing spaces
  const re = /^[A-Za-z'-]+(?: [A-Za-z'-]+)*$/;
  return re.test(trimmedName) && trimmedName.length >= 2;
};

const validateGender = (gender) => {
  return gender !== "unchosen";
};

const getAge = (birthday) => {
  const today = new Date();
  const birthDate = new Date(birthday);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // Adjust if birthday hasn't occurred yet this year
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

const validateBirthday = (date) => {
  const age = getAge(date);
  return date < new Date() && age >= 18 && age <= 100;
};
export {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateName,
  validateGender,
  validateBirthday,
};
