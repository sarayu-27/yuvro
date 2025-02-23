import { Route, Routes } from "react-router-dom";
import LayoutWithHeader from "../layout/LayoutWithHeader";
import LayoutWithoutHeader from "../layout/LayoutWithoutHeader";
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
        <Route path="/dashboard" element={<LayoutWithHeader><Dashboard /></LayoutWithHeader>}/>
        <Route path="/course" element={<LayoutWithHeader><Course /></LayoutWithHeader>}/>
        <Route path="/syllabus" element={<LayoutWithHeader><Syllabus /></LayoutWithHeader>}/>
        <Route path="/test" element={<LayoutWithHeader><Test /></LayoutWithHeader>}/>
        <Route path='/testResults' element={<LayoutWithHeader><TestResults /></LayoutWithHeader>}/>
        <Route path="/assessment" element={<LayoutWithHeader><Assessment /></LayoutWithHeader>}/>
        {/* Routes without Header and Footer */}
        <Route path="/testQuestions" element={<LayoutWithoutHeader><TestQuestions /></LayoutWithoutHeader>}/>

        {/* Initial Route */}
        <Route path="/" element={<LayoutWithHeader><Dashboard /></LayoutWithHeader>}/>
      </Routes>
    )
}

export default StudentRoutes;