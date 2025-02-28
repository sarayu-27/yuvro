import React from 'react';
import { Route, Routes } from "react-router-dom";
import Dashboard from './dashboard/Dashboard';
import Syllabus from './syllabus/Syllabus';
import Attendance from './attendance/Attendance';
import Assessment from './assessment/Assessment';
import TestCreation from './assessment/TestCreation';
import ViewQuestions from './assessment/ViewQuestions';
import Results from './assessment/Results';
import Report from './assessment/Report';
import Reports from './reports/Reports';
import Layout from '../layout/Layout';

const FacultyRoutes = () => {
  return (
    <div>
        <Routes>
            {/* Routes with Header and Footer */}
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>}/>
            <Route path="/syllabus" element={<Layout><Syllabus /></Layout>}/>
            <Route path="/attendance" element={<Layout><Attendance /></Layout>}/>
            <Route path="/assessment" element={<Layout><Assessment /></Layout>}/>
            <Route path="/test-creation" element={<Layout><TestCreation /></Layout>}/>
            <Route path="/view-questions" element={<Layout><ViewQuestions /></Layout>}/>
            <Route path="/results" element={<Layout><Results /></Layout>}/>
            <Route path="/student-report" element={<Layout><Report /></Layout>}/>
            <Route path="/reports" element={<Layout><Reports /></Layout>}/>
            {/* Initial Route */}
            <Route path="/" element={<Layout><Dashboard /></Layout>}/>
        </Routes>
    </div>
  )
}

export default FacultyRoutes
