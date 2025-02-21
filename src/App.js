import './App.css'; 
import { Route, Routes } from 'react-router-dom';
import RegistrationForm from './registration/Registration';
import CreatePassword from './registration/CreatePassword';
import Login from './registration/Login';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/create-password" element={<CreatePassword />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
