import { useCallback, useState, useMemo } from "react";
import "./Syllabus.scss";
import {chapters,  topics as topicsApi, practice_questions } from "../../data/data";
import Instructions from "../instructions/Instructions";
import Questions from "../practiceQuestions/Questions";

const Syllabus = () => {
  const course = { module_name: "java" }; 
  const { module_name } = course; 



  //uncomment in real api 
  // const { module_name = 'java' } = JSON.parse(localStorage?.getItem('ModuleDetails') || '{}');
  // const chapters = Allchapters[module_name];
  // console.log('all', Allchapters[module_name]);
  
  
  const [highlightedChapter, setHighlightedChapter] = useState(null);
  const [highlightedTopic, setHighlightedTopic] = useState(null);
  const [topics, setTopics] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [toggle, setToggle] = useState(false);

  const onChapterClick = useCallback((id) => {
    setHighlightedChapter(id);
    setHighlightedTopic(null);
    setTopics(topicsApi);  // Set topics on chapter click
    setToggle(false);
  }, []);

  const onTopicClick = useCallback((itemId) => {
    setHighlightedTopic(itemId);
    setQuestions(practice_questions); // Set questions on topic click
    setToggle(true);
  }, []);

  const selectedChapter = useMemo(() => chapters?.find(ch => ch.id === highlightedChapter), [highlightedChapter]);
  const selectedTopic = useMemo(() => topics?.find(tp => tp.id === highlightedTopic), [highlightedTopic, topics]);

  const renderTopicList = useMemo(() => {
    return topics.map((item) => {
      const isTopicHighlighted = highlightedTopic === item.id;
      const isTopicLocked = item.practice_locked;
      const itemClass = isTopicHighlighted ? "highlighted" : "";
      const disabledClass = isTopicLocked ? "disabled" : "";
      return (
        <li
          key={item.id}
          onClick={() => !isTopicLocked && onTopicClick(item.id)}
          className={`${itemClass} ${disabledClass}`}
        >
          {item.topic_name} {isTopicLocked && 
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>
          </svg>
          }
        </li>
      );
    });
  }, [highlightedTopic, topics,onTopicClick]);

  const renderChapterButtons = useMemo(() => {
    return chapters?.map((item) => {
      const isChapterHighlighted = highlightedChapter === item.id;
      return (
        <button
          key={item.id}
          onClick={() => onChapterClick(item.id)}
          className={isChapterHighlighted ? "highlighted" : ""}
        >
          {item.syllabus_name}
          {console.log('item', item.syllabus_name)
          }
        </button>
      );
    });
  }, [highlightedChapter,onChapterClick]);

  return (
    <div className="sts-syllabus">
      <div className="sts-syllabus__title">Practice - {module_name}</div>

      <div className="sts-syllabus__buttons">
        {renderChapterButtons}
      </div>

      <div className="sts-syllabus__content">
        {topics.length > 0 && (
          <aside className="sts-syllabus__content-left">
            <span>{selectedChapter?.syllabus_name}</span>
            <ul>
              {renderTopicList}
            </ul>
          </aside>
        )}

        <div className="sts-syllabus__content-right">
          {toggle && questions.length > 0 ? (
            <Questions topicObj={questions} topicName={selectedTopic?.topic_name} />
          ) : (
            <Instructions />
          )}
        </div>
      </div>
    </div>
  );
};

export default Syllabus;
