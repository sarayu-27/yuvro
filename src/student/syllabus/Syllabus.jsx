import { useCallback, useState } from "react";
import "./Syllabus.scss";
import { chapters, topics as topicsApi, practice_questions } from "../../data/data";
import Instructions from "../instructions/Instructions";
import Questions from "../practiceQuestions/Questions";

const Syllabus = () => {
  const course = { module_name: "java" }; 
  const { module_name } = course; 

  const [highlightedChapter, setHighlightedChapter] = useState(null);
  const [highlightedTopic, setHighlightedTopic] = useState(null);
  const [topics, setTopics] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [toggle, setToggle] = useState(false);

  const onChapterClick = useCallback((id) => {
    setTopics(topicsApi);
    setHighlightedChapter(id);
    setHighlightedTopic(null);
    setToggle(false);
  }, []);

  const onTopicClick = useCallback((itemId) => {
    setQuestions(practice_questions);
    setHighlightedTopic(itemId);
    setToggle(true);
  }, []);

  const selectedChapter = chapters.find(ch => ch.id === highlightedChapter);
  const selectedTopic = topics.find(tp => tp.id === highlightedTopic);

  return (
    <div className="sts-syllabus">
      <div className="sts-syllabus__title">Practice - {module_name}</div>

      <div className="sts-syllabus__buttons">
        {chapters.map((item) => (
          <button
            key={item.id}
            onClick={() => onChapterClick(item.id)}
            className={highlightedChapter === item.id ? "highlighted" : ""}
          >
            {item.syllabus_name}
          </button>
        ))}
      </div>

      <div className="sts-syllabus__content">
        {topics.length > 0 && (
          <aside className="sts-syllabus__content-left">
            <span>{selectedChapter?.syllabus_name}</span>
            <ul>
              {topics.map((item) => (
                <li
                  key={item.id}
                  onClick={() => !item.practice_locked && onTopicClick(item.id)}
                  className={`${item.practice_locked ? "disabled" : ""} ${highlightedTopic === item.id ? "highlighted" : ""}`}
                >
                  {item.topic_name} {item.practice_locked && <i className="material-icons-outlined">lock</i>}
                </li>
              ))}
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
