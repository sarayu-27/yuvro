import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { test__topics } from '../../data/data';
import './Test.scss';

const Test = () => {
    const [topicData, setTopicData] = useState([]);
    const [selectedButton, setSelectedButton] = useState('ALL TESTS PROGRESS');
    const navigate = useNavigate();
    
    const onItemClick = useCallback((event)=>{
      const value = event.target.textContent.toUpperCase();
      setSelectedButton(value);
    },[])
  
    useEffect(() => {
      const fetchTopics = () => {
       setTopicData(test__topics);
      };
      fetchTopics();
    }, []);

    const handleTopicClick = useCallback((topic) => {
      if (!topic.locked) {
            navigate('/student/testQuestions')
        }
    }, [navigate]);
  const ViewResults = ((topic)=>{
    navigate('/student/testResults')
  });
  return (
    <div className="sts-test">
    <div className="sts-test__progress-buttons">
      <button
        className={`sts-test__inProgress ${selectedButton === 'ALL TESTS PROGRESS' ? 'selected' : ''}`}
        onClick={onItemClick}
      >
        All Tests Progress
      </button>
      <button
        className={`sts-test__completed ${selectedButton === "COMPLETED" ? 'selected' : ''}`}
        onClick={onItemClick}
      >
        Completed
      </button>
    </div>
      {
        selectedButton === 'ALL TESTS PROGRESS' &&
        (
          <div className="sts-test__topics">
            {   topicData.map((topic) => (
                <div key={topic.id} className={`sts-test__topic ${(topic.isLocked) ?  'disabled' : ''} ${topic.isCompleted? 'completed':''}`}>
                 <button className='sts-test__topic-button'>{topic.topic}</button>
                {(topic.isLocked) ? (
                <button className='sts-test__topic-test' disabled>Locked
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>
                    </svg>
                </button>
                ) : topic.isCompleted ? (
                <button className='sts-test__topic-test'>Finished</button>
            ):<button className='sts-test__topic-test' onClick={() => handleTopicClick(topic)}>Take Test</button> }
        </div>
      ))}
          </div>
        )
      }
      {
        selectedButton === 'COMPLETED' &&
        (
          <div className="sts-test__topics-completed">
            {
              topicData.map((topic,index)=>(
                <div key={topic.id} className='sts-test__topic'>
                  {
                    topic.isCompleted ? (<>
                      <button className='sts-test__topic-button'>{topic.topic}</button>
                      <button className='sts-test__topic-result' onClick={()=>{ViewResults({id:topic.id,topic:topic.topic})}}>View Results</button>
                    </>) : index===0 && <div>Not Finished any test yet</div> 
                  }
                </div>
              ))
            }
          </div>
        )
      }
  </div>
  )
}

export default Test
