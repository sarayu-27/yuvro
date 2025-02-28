import './App.css'; 
import { Route, Routes } from 'react-router-dom';
import RegistrationForm from './registration/Registration';
import CreatePassword from './registration/CreatePassword';
import Login from './registration/Login';
import StudentRoutes from './student/StudentRoutes';
import FacultyRoutes from './Faculty/FacultyRoutes';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/create-password" element={<CreatePassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student/*" element={<StudentRoutes/>}/>
        <Route path="/faculty/*" element={<FacultyRoutes/>}/>
      </Routes>
    </div>
  );
}

export default App;
