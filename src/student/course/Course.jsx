import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { fetchCourseByStudentId, fetchModulesByCourseId } from '../../data/data';
import { course, modules } from '../../data/data';
import './Course.scss';


// Function to select image based on course name using switch-case
function getCourseImage(courseName) {
  switch (courseName) {
    case 'Java':
      return require('../../assests/image.jpeg'); // Ensure these image files exist
    case 'UI':
      return require('../../assests/image.jpeg');
    case 'SQL':
      return require('../../assests/image.jpeg');
    default:
      return require('../../assests/image.jpeg');
  }
}

function Course() {
  const [moduleData, setModuleData] = useState([]);
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCourseAndModules = async () => {
      try {
        
        // Fetch course based on student ID
        // const course = await fetchCourseByStudentId(studentId);

        setCourseData(course);

        // Fetch modules based on course ID
        // if (course?.id) {
        //   const modules = await fetchModulesByCourseId(course.id);
        //   setModuleData(modules);
        // }
        setModuleData(modules);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourseAndModules();
  }, []);

  const onCourseClick = (item) => {
    localStorage && localStorage.setItem('ModuleDetails', JSON.stringify(item));
    console.log({item});
    navigate('/student/syllabus');
  };

  if (loading) {
    return <div>Loading Data...</div>;
  }

  return (
    <>
      {courseData ? (
        <div className='sts-course' id={courseData.id}>
          <div className='sts-course__image'>
            <img src={getCourseImage(courseData.course)} alt="Course" />
          </div>
          <div className='sts-course__title'>{courseData.course}</div>
          <div className='sts-course__modules'>
            <div className='sts-course__modules-title'>Practice by Module</div>
            <div className='sts-course__modules-module'>
              {moduleData.length > 0 ? (
                moduleData.map((item) => (
                  <button key={item.id} id={item.id} onClick={() => onCourseClick(item)}>
                    {item.module_name}
                  </button>
                ))
              ) : (
                <div>No modules available.</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>No course found.</div>
      )}
    </>
  );
}

export default Course;
