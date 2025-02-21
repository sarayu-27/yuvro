import { useState } from "react";
import './CreatePassword.scss';
import { useNavigate } from "react-router-dom";

function CreatePassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});

  const validatePassword = (password) => {
    const isValid = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);
    return isValid ? "" : "Password must be at least 8 characters long and include at least 1 special symbol.";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedForm = { ...prev, [name]: value };

      // Handle errors for both password and confirmPassword
      setError((prevError) => {
        const newErrors = { ...prevError };

        if (name === "password") {
          newErrors.passwordError = validatePassword(value);
        }

        if (name === "confirmPassword" || (name === "password" && updatedForm.confirmPassword)) {
          newErrors.confirmPasswordError = updatedForm.password !== updatedForm.confirmPassword
            ? "Passwords do not match!"
            : "";
        }

        return newErrors;
      });

      return updatedForm;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = formData.password !== formData.confirmPassword ? "Passwords do not match!" : "";

    setError({
      passwordError,
      confirmPasswordError,
    });

    if (passwordError || confirmPasswordError) {
      return;
    }

    alert("Password set successfully!");
    navigate("/login");
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
