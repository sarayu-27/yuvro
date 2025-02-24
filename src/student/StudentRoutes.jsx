import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";  // Using the combined Layout component
import Dashboard from './dashboard/Dashboard';
import Course from './course/Course';
import Test from './test/Test';
import Syllabus from "./syllabus/Syllabus";
import TestQuestions from "./testQuestions/TestQuestions";
import TestResults from "./testResults/TestResults";
import Assessment from "./assessment/Assessment";

function StudentRoutes() {
    return(
        <Routes>

        {/* Routes with Header and Footer */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>}/>
        <Route path="/course" element={<Layout><Course /></Layout>}/>
        <Route path="/syllabus" element={<Layout><Syllabus /></Layout>}/>
        <Route path="/test" element={<Layout><Test /></Layout>}/>

        <Route path="/testResults" element={<Layout><TestResults /></Layout>}/>
        <Route path="/assessment" element={<Layout><Assessment /></Layout>}/>

        {/* Routes without Header and Footer */}
        <Route path="/testQuestions" element={<Layout withHeaderAndFooter={false}><TestQuestions /></Layout>}/>

        {/* Initial Route */}
        <Route path="/" element={<Layout><Dashboard /></Layout>}/>

      </Routes>
    )
}

export default StudentRoutes;
