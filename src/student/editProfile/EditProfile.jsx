import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EditProfile.scss";

const EditProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (location.state) {
      setFormData({
        fullName: location.state.fullName || "",
        mobile: location.state.mobile || "",
        address: location.state.address || "",
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) newErrors.fullName = "Only letters and spaces allowed.";
    if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = "Must be a 10-digit number.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("Updated Profile:", formData);
    
    setIsSubmitted(true);

    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="edit-profile-container">
      {!isSubmitted ? (
        <>
          <h2>Edit Profile</h2>
          <form className="edit-profile-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>Full Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
              {errors.fullName && <small className="error">{errors.fullName}</small>}
            </div>

            <div className="form-row">
              <label>Mobile No</label>
              <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} />
              {errors.mobile && <small className="error">{errors.mobile}</small>}
            </div>

            <div className="form-row">
              <label>Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} />
              {errors.address && <small className="error">{errors.address}</small>}
            </div>

            <button type="submit">Save Changes</button>
          </form>
        </>
      ) : (
        <div className="success-message">Profile Edited Successfully!</div>
      )}
    </div>
  );
};

export default EditProfile;
