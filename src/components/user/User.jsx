import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './User.scss';
import { useSelector } from "react-redux";

const fullName = "sarayu";

function User() {
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const userDropdownRef = useRef(null);
    const navigate = useNavigate();
    const user = useSelector((state)=>state.user) || JSON.parse(localStorage.getItem('user'));

    const toggleUserDropdown = () => setUserDropdownOpen(!userDropdownOpen);

    const handleClickOutside = (event) => {
        if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
            setUserDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (userDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [userDropdownOpen]);

    const handleEditProfile = () => {
        setUserDropdownOpen(false); // Close dropdown
        navigate("/student/edit-profile", { state: { fullName } });
    };

    const handleLogout = () => {
        setUserDropdownOpen(false); // Close dropdown
        navigate("/login");
    };

    return (
        <div className="user-section" ref={userDropdownRef}>
            <span onClick={toggleUserDropdown}>Hi, {fullName}</span>
            <svg 
                onClick={toggleUserDropdown} 
                className="user-icon bi bi-person-circle" 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                fill="currentColor" 
                viewBox="0 0 16 16"
            >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>
            {userDropdownOpen && (
                <div className="dropdown-options user-dropdown show">
                   { user.userType === 'student' && <button onClick={handleEditProfile} className="dropdown-option">Edit Profile</button> }
                    <button onClick={handleLogout} className="dropdown-option"> Logout</button>
                </div>
            )}
        </div>
    );
}

export default User;
