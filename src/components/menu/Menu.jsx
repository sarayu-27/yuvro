import { HEADER_MENU, FACULTY_HEADER_MENU } from "../../data/data";
import './Menu.scss';
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Menu() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const userType = useSelector((state) => state.user); 

  // Determine the menu dynamically based on userType
  const menu = useMemo(() => (userType.user === "student" ? HEADER_MENU : FACULTY_HEADER_MENU), [userType]);

  const toggleDropdown = (index) => {
    setActiveDropdown((prevIndex) => (prevIndex === index ? null : index));
  };

  const navigationMap = {
    student: {
      SYLLABUS: "/student/course",
      TEST: "/student/test",
      ASSESSMENT: "/student/assessment",
    },
    faculty: {
      SYLLABUS: "/faculty/syllabus",
      ASSESSMENT: "/faculty/assessment",
      ATTENDANCE: "/faculty/attendance",
      REPORTS: "/faculty/reports",
    },
  };

  const handleItemClick = (course) => {
    const path = navigationMap[userType.user]?.[course.toUpperCase()];
    if (path) {
      navigate(path);
    } else {
      console.error("Unknown menu item:", course);
    }
    setActiveDropdown(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <ul className="sts-menu" ref={menuRef}>
      {menu.map(({ label, dropdown }, index) => (
        <li key={label} className={`sts-menu__items ${dropdown ? "sts-menu__items-dropdown" : ""}`}>
          <div onClick={() => (dropdown ? toggleDropdown(index) : handleItemClick(label))} className="sts-menu__items-label">
            {label}
            {dropdown && <i className="material-icons-outlined">keyboard_arrow_down</i>}
          </div>
          {activeDropdown === index && dropdown && (
            <ul className="sts-menu__dropdown-container">
              {dropdown.map(({ label: itemLabel }) => (
                <li key={itemLabel} onClick={() => handleItemClick(itemLabel)} className="sts-menu__dropdown-item">
                  {itemLabel}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

export default React.memo(Menu);
