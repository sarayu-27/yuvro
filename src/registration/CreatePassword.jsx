import { useState } from "react";
import './CreatePassword.scss';

function CreatePassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    passwordError: "",
    confirmPasswordError: "",
  });

  const validatePassword = (password) => {
    return /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password)
      ? ""
      : "Password must be at least 8 characters long and include at least 1 special symbol.";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedForm = { ...prev, [name]: value };

      setError((prevError) => ({
        ...prevError,
        passwordError: name === "password" ? validatePassword(value) : prevError.passwordError,
        confirmPasswordError: 
          name === "confirmPassword" || (name === "password" && updatedForm.confirmPassword)
            ? updatedForm.password === updatedForm.confirmPassword
              ? ""
              : "Passwords do not match!"
            : prevError.confirmPasswordError,
      }));

      return updatedForm;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const passwordErrorMsg = validatePassword(formData.password);
    const confirmPasswordErrorMsg = formData.password === formData.confirmPassword ? "" : "Passwords do not match!";

    setError({
      passwordError: passwordErrorMsg,
      confirmPasswordError: confirmPasswordErrorMsg,
    });

    if (passwordErrorMsg || confirmPasswordErrorMsg) {
      return;
    }

    alert("Password set successfully!");
  };

  return (
    <div className="sts-create-password create-form-container">
      <h2 className="create-h2">Create Password</h2>
      <form onSubmit={handleSubmit}>
        {/* Password */}
        <div className="create-form-row">
          <label htmlFor="password" className="create-label">Create Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="create-input"
          />
          {error.passwordError && <small className="create-error">{error.passwordError}</small>}
        </div>

        {/* Confirm Password */}
        <div className="create-form-row">
          <label htmlFor="confirmPassword" className="create-label">Re-enter Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your password"
            required
            className="create-input"
          />
          {error.confirmPasswordError && <small className="create-error">{error.confirmPasswordError}</small>}
        </div>

        <button type="submit" className="create-button">Submit</button>
      </form>
    </div>
  );
}

export default CreatePassword;
