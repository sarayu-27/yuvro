import { useState } from "react";
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

const RegistrationForm = () => {
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
    console.log({formData});
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
          <div className="form-row" key={name}>
            <label>{label}</label>
            <input type={type} name={name} value={formData[name]} onChange={handleChange} required />
            {errors[name] && <small className="error">{errors[name]}</small>}
          </div>
        ))}

        <div className="form-row">
          <label>City</label>
          <select name="city" value={formData.city} onChange={handleChange} required>
            <option value="" disabled>Select your city</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label>College</label>
          <select name="college" value={formData.college} onChange={handleChange} required>
            <option value="" disabled>Select your college</option>
            {colleges.map(({ label, value }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          {formData.college === "other" && (
            <input type="text" name="collegeOther" value={formData.collegeOther} onChange={handleChange} placeholder="Enter college name" required />
          )}
        </div>

        <div className="form-row">
          <label>Specialization/Degree</label>
          <select name="specialization" value={formData.specialization} onChange={handleChange} required>
            <option value="" disabled>Select specialization</option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
          {formData.specialization === "other" && (
            <input type="text" name="specializationOther" value={formData.specializationOther} onChange={handleChange} placeholder="Enter specialization" required />
          )}
        </div>

        {formData.specialization && (
          <div className="form-row">
            <label>Branch</label>
            <select name="branch" value={formData.branch} onChange={handleChange} required>
              <option value="" disabled>Select branch</option>
              {branches[formData.specialization]?.map((branch) => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>
        )}

        <div className="form-row">
          <label>Pass Out Year</label>
          <select name="passOutYear" value={formData.passOutYear} onChange={handleChange} required>
            <option value="" disabled>Select pass-out year</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label>Course</label>
          <select name="course" value={formData.course} onChange={handleChange} required>
            <option value="" disabled>Select course</option>
            {courses.map((course) => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>
      {isRegistered && <div className="popup">Registration Successful!</div>}
    </div>
  );
};

export default RegistrationForm;
