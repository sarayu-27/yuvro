import { useState } from "react";
import './Login.scss';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from '../redux/actions';

// const user = useSelector(state => state.userType); 

function Input({ label, id, value, onChange, type = "text", placeholder }) {
  return (
    <div className="login-form-row">
      <label htmlFor={id} className="login-label">{label}</label>
      <input
        id={id}
        type={type}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="login-input"
      />
    </div>
  );
}

function Select({ label, id, value, onChange, options }) {
  return (
    <div className="login-form-row">
      <label htmlFor={id} className="login-label">{label}</label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required
        className="login-input"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'student',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  // const handleSubmit = async(e) => {
    // e.preventDefault();
  
    // try {
    //   const response = await fetch('http://localhost:8080/api/auth/login', { // Replace with your actual backend URL
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   const data = await response.json();

    //   if (response.ok) {
    //     console.log("Login successful:", data);
    //     // Navigate based on user type
    //     switch (formData.userType) {
    //       case 'student':
    //         navigate('/student');
    //         break;
    //       case 'faculty':
    //         navigate('/faculty');
    //         break;
    //       case 'admin':
    //         navigate('/admin');
    //         break;
    //       default:
    //         console.error("Unknown user type");
    //     }
    //   } else {
    //     console.error("Login failed:", data.message);
    //     alert(data.message || "Invalid credentials");
    //   }
    // } catch (error) {
    //   console.error("Error during login:", error);
    //   alert("Something went wrong. Please try again.");
    // }
    dispatch(setUser({userType:formData.userType}))
    localStorage.setItem('user',JSON.stringify(formData ));
    switch (formData.userType) {
      case 'student':
        navigate('/student');
        break;
      case 'faculty':
        navigate('/faculty');
        break;
      // case 'admin':
      //   navigate('/admin');
      //   break;
      default:
        console.error("Unknown user type");
    }
  };

  return (
    <div className="sts-login login-form-container">
      <h2 className="login-h2">Login</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder="Enter your email"
        />
        <Input
          label="Password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          placeholder="Enter your password"
        />
        <Select
          label="User Type"
          id="userType"
          value={formData.userType}
          onChange={handleChange}
          options={[
            { value: 'student', label: 'Student' },
            { value: 'faculty', label: 'Faculty' },
            { value: 'admin', label: 'Admin' },
          ]}
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default Login;
