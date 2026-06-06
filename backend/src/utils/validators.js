const validator = require("validator");

const validateRegisterInput = (data) => {
  const errors = [];

  // Name Validation
  if (!data.name || data.name.trim().length < 3) {
    errors.push("Name must be at least 3 characters.");
  }

  if (data.name.length > 60) {
    errors.push("Name cannot exceed 60 characters.");
  }

  // Email Validation
  if (!validator.isEmail(data.email || "")) {
    errors.push("Invalid email format.");
  }

  // Password Validation
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;

  if (!passwordRegex.test(data.password || "")) {
    errors.push(
      "Password must be 8-16 characters and contain at least one uppercase letter and one special character."
    );
  }

  // Address Validation
  if (data.address && data.address.length > 400) {
    errors.push("Address cannot exceed 400 characters.");
  }

  return errors;
};

module.exports = {
  validateRegisterInput,
};