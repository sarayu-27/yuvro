import { facultySubjects, students } from "../../data/data";
import { useState, useMemo } from "react";
import "./Attendance.scss";

const Attendance = () => {
  const getCurrentDate = () => new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [selectedSubject, setSelectedSubject] = useState("");
  const [attendance, setAttendance] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      date: selectedDate,
      subject: selectedSubject,
      attendance,
    };
    console.log({ payload });

    // Uncomment when API is ready
    // const res = await fetch("/api/attendance", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // });
    // if (!res.ok) throw new Error("Failed to save attendance");

    setIsSubmitted(true);
    setShowSuccessMessage(true); // Show success message
    setAttendance({}); // Clear attendance selections
    setSelectedSubject(""); // Reset subject dropdown
    setSelectedDate(getCurrentDate()); // Reset date picker to today
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    setIsSubmitted(false); // Reset submission state when subject changes
    setShowSuccessMessage(false); // Hide success message on new selection
    setAttendance({}); // Clear attendance when changing subject
  };

  const filteredStudents = useMemo(() => students, []);

  return (
    <div className="sts-attendance">
      <h2>Attendance</h2>

      {/* Date Picker */}
      <input
        className="sts-attendance__date"
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      {/* Subject Dropdown */}
      <select
        className="sts-attendance__subject"
        value={selectedSubject}
        onChange={handleSubjectChange}
      >
        <option value="">Select Subject</option>
        {facultySubjects?.map((subject, index) => (
          <option key={index} value={subject.subject}>
            {subject.subject}
          </option>
        ))}
      </select>

      {/* Show Success Message */}
      {showSuccessMessage && (
        <p className="sts-attendance__success">Attendance submitted successfully!</p>
      )}

      {/* Show Attendance Table Only If a Subject Is Selected */}
      {selectedSubject && !isSubmitted && (
        <div>
          <table className="sts-attendance__table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Full Name</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.rollNo}</td>
                  <td>{student.name}</td>
                  <td>
                    <AttendanceButton
                      status="present"
                      isSelected={attendance[student.id] === "present"}
                      onClick={() => handleAttendanceChange(student.id, "present")}
                    />
                    <AttendanceButton
                      status="absent"
                      isSelected={attendance[student.id] === "absent"}
                      onClick={() => handleAttendanceChange(student.id, "absent")}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Submit Button */}
          <button className="sts-attendance__submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

const AttendanceButton = ({ status, isSelected, onClick }) => {
  return (
    <button
      className={`sts-attendance__button-${status} ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      {status === "present" ? "Yes" : "No"}
    </button>
  );
};

export default Attendance;
