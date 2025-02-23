import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.scss";

const branches = {
  "B.Tech": ["CSE", "IT", "ECE", "EEE"],
  "M.Tech": ["Software Engineering", "Data Science"],
  Degree: ["B.Com", "B.Sc"],
};

const cities = ["Godavarikhani", "Ramagundam"];
const colleges = [
  { label: "JNTUH University College of Engineering Manthani", value: "JNTUH" },
  { label: "Vardhaman College of Engineering", value: "Vardhaman" },
  { label: "Anurag University", value: "Anurag" },
  { label: "Other", value: "other" },
];
const courses = ["Full Stack Development", "Digital Marketing"];
const specializations = Object.keys(branches);
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 2019 }, (_, i) => currentYear - i);

const InputField = ({ label, name, type, value, onChange, error, required, options = [] }) => {
  if (type === "select") {
    return (
      <div className="form-row">
        <label>{label}</label>
        <select name={name} value={value} onChange={onChange} required={required}>
          <option value="" disabled>Select {label}</option>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {error && <small className="error">{error}</small>}
      </div>
    );
  }
  return (
    <div className="form-row">
      <label>{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} required={required} />
      {error && <small className="error">{error}</small>}
    </div>
  );
};

const RegistrationForm = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    college: "",
    specialization: "",
    branch: "",
    passOutYear: "",
    course: "",
    collegeOther: "",
    specializationOther: "",
  });

  const [errors, setErrors] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) newErrors.fullName = "Only letters and spaces allowed.";
    if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = "Must be a 10-digit number.";
    if (!/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$/.test(formData.email)) newErrors.email = "Invalid email format.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    // try {
    //   const response = await fetch("http://localhost:8080/register", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(formData),
    //   });
    //   if (!response.ok) throw new Error("Registration failed");
    //   setIsRegistered(true);
    // } catch (error) {
    //   alert("Error: " + error.message);
    // }
    console.log({ formData });
    navigate("/create-password");
  };

  return (
    <div className="sts-registration form-container">
      <h2>Join Us</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        {[
          { label: "Full Name", name: "fullName", type: "text" },
          { label: "Mobile No", name: "mobile", type: "tel" },
          { label: "Email ID", name: "email", type: "email" },
          { label: "Permanent Address", name: "address", type: "text" },
        ].map(({ label, name, type }) => (
          <InputField
            key={name}
            label={label}
            name={name}
            type={type}
            value={formData[name]}
            onChange={handleChange}
            error={errors[name]}
            required={true}
          />
        ))}

        <InputField
          label="City"
          name="city"
          type="select"
          value={formData.city}
          onChange={handleChange}
          options={cities}
          error={errors.city}
          required={true}
        />

        <InputField
          label="College"
          name="college"
          type="select"
          value={formData.college}
          onChange={handleChange}
          options={colleges.map(({ label }) => label)}
          error={errors.college}
          required={true}
        />
        {formData.college === "other" && (
          <InputField
            label="Enter College Name"
            name="collegeOther"
            type="text"
            value={formData.collegeOther}
            onChange={handleChange}
            error={errors.collegeOther}
            required={true}
          />
        )}

        <InputField
          label="Specialization/Degree"
          name="specialization"
          type="select"
          value={formData.specialization}
          onChange={handleChange}
          options={specializations}
          error={errors.specialization}
          required={true}
        />
        {formData.specialization === "other" && (
          <InputField
            label="Enter Specialization"
            name="specializationOther"
            type="text"
            value={formData.specializationOther}
            onChange={handleChange}
            error={errors.specializationOther}
            required={true}
          />
        )}

        {formData.specialization && (
          <InputField
            label="Branch"
            name="branch"
            type="select"
            value={formData.branch}
            onChange={handleChange}
            options={branches[formData.specialization]}
            error={errors.branch}
            required={true}
          />
        )}

        <InputField
          label="Pass Out Year"
          name="passOutYear"
          type="select"
          value={formData.passOutYear}
          onChange={handleChange}
          options={years}
          error={errors.passOutYear}
          required={true}
        />

        <InputField
          label="Course"
          name="course"
          type="select"
          value={formData.course}
          onChange={handleChange}
          options={courses}
          error={errors.course}
          required={true}
        />

        <button type="submit">Submit</button>
      </form>
      {isRegistered && <div className="popup">Registration Successful!</div>}
    </div>
  );
};

export default RegistrationForm;
