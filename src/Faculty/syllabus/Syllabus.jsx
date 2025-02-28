import { useEffect, useState, useCallback } from 'react';
import { facultySubjects, chapters, topics } from '../../data/data';
import './Syllabus.scss';

function FacultySyllabus() {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedChapters, setSelectedChapters] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [finishedTopics, setFinishedTopics] = useState(new Set());
    const [selectedChapterId, setSelectedChapterId] = useState(null); // New state

    useEffect(() => {
        setSubjects(facultySubjects);
    }, []);

    const handleSubjectSelection = (subject) => {
        setSelectedSubject(subject);
        setSelectedChapters(chapters);
        setDropdownOpen(false);
        setSelectedChapterId(null); // Reset selected chapter when subject changes
        setSelectedTopics([]); // Reset topics
    };

    const handleChapterClick = useCallback((id) => {
        setSelectedChapterId(id); // Store selected chapter ID
        setSelectedTopics(topics);
    }, []);

    const handleFinishClick = (id) => {
        setFinishedTopics((prev) => new Set(prev).add(id));
    };

    return (
        <div className="sts-faculty--syllabus">
            <h2>Syllabus</h2>
            <div className="sts-faculty--syllabus__button-row">
                <button onClick={() => setDropdownOpen((prev) => !prev)} className="dropdown-button">
                    {selectedSubject || 'Select Subject'} 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="sts-icon bi bi-chevron-down" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
                {dropdownOpen && (
                    <ul className="dropdown-menu">
                        {subjects.map((subject) => (
                            <li key={subject.id} onClick={() => handleSubjectSelection(subject.subject)} className="dropdown-item">
                                {subject.subject}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {selectedChapters.length > 0 && (
                <div className="sts-faculty--syllabus__content">
                    <h3>Syllabus for {selectedSubject}:</h3>
                    <div className="sts-syllabus__buttons">
                        {selectedChapters.map((chapter) => (
                            <button
                                key={chapter.id}
                                onClick={() => handleChapterClick(chapter.id)}
                                className={selectedChapterId === chapter.id ? 'active' : ''} // Apply active class
                            >
                                {chapter.syllabus_name}
                            </button>
                        ))}
                    </div>
                    {selectedTopics.length > 0 && (
                        <div className="sts-faculty--syllabus-right__content">
                            <ul>
                                {selectedTopics.map((topic) => (
                                    <li key={topic.id}>
                                        <span>{topic.topic_name}</span>
                                        <button
                                            className={`finish-button ${finishedTopics.has(topic.id) ? 'finished' : ''}`}
                                            onClick={() => handleFinishClick(topic.id)}
                                            disabled={finishedTopics.has(topic.id)}
                                        >
                                            {finishedTopics.has(topic.id) ? 'Finished' : 'Finish'}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default FacultySyllabus;
