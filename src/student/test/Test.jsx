import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { test__topics } from '../../data/data';
import './Test.scss';

const Test = () => {
    const [topicData, setTopicData] = useState([]);
    const [selectedButton, setSelectedButton] = useState('ALL TESTS PROGRESS');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
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
    }, [navigate,dispatch]);
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
                <button className='sts-test__topic-test' disabled>Locked<i className='material-icons-outlined'>lock</i></button>
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
