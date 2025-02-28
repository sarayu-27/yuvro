
export const HEADER_MENU = [
    { label: 'Practice', dropdown: [{label:'Syllabus'},{label:'Test',link:'#'}] },
    { label: 'Assessment'}
];
// export const userType = 'Student';
export const FACULTY_HEADER_MENU = [
    { label: 'Syllabus'},
    { label: 'Assessment'},
    { label: 'Attendance'},
    { label: 'Reports'},
];

export const subjects = [
    { label: "Java", value: "java" },
    { label: "Python", value: "python" },
    { label: "JavaScript", value: "javascript" },
  ];
  
  export const facultySubjects = [
    {"id":"java","subject":"Java"},
    {"id":"sql","subject":"SQL"}
];

export const students = [
    {"id":1,"rollNo":"A21IT001","name":"Sarayu"},
    {"id":2,"rollNo":"A21IT002","name":"Rohith"}
];
export const assessmentCard = [
    {
      "id": 1,
      "testTitle": "Java",
      "description": "Questions on Strings,Arrays",
      "subject_id":"java",
      "questions": [
        {
          "id": 101,
          "text": "What is the capital of India?",
          "type": "choice",
          "multipleAnswers": false,
          "required": true,
          "options": [
            { "id": 1, "text": "Delhi", "correct": true },
            { "id": 2, "text": "London", "correct": false },
            { "id": 3, "text": "Berlin", "correct": false }
          ]
        },
        {
          "id": 102,
          "text": "What is 2 + 2?",
          "type": "text",
          "correctAnswer": "4",
          "required": true
        }
      ],
      "schedule": {
        "duration": 50,
        "endDate":"2025-02-02",
        "endTime":"23:04",
        "message":"Your response is submitted",
        "startDate": "2025-02-02",
        "startTime":"22:34"
      },
      "responses":5
    },
    {
      "id": 2,
      "testTitle": "SQL",
      "description": "Questions on Queries",
      "subject_id":"sql",
      "questions": [
        {
          "id": 101,
          "text": "What is the capital of India?",
          "type": "choice",
          "multipleAnswers": false,
          "required": true,
          "options": [
            { "id": 1, "text": "Delhi", "correct": true },
            { "id": 2, "text": "London", "correct": false },
            { "id": 3, "text": "Berlin", "correct": false }
          ]
        },
        {
          "id": 102,
          "text": "What is 2 + 2?",
          "type": "text",
          "correctAnswer": "4",
          "required": true
        }
      ],
      "schedule": {
        "duration": 30,
        "endDate":"2025-02-02",
        "endTime":"23:04",
        "message":"Your response is submitted",
        "startDate": "2025-02-02",
        "startTime":"22:34"
      },
      "responses":0
    }
  ]

export const viewQuestions = {
  "id": 1,
  "testTitle": "Java",
  "description": "Questions on Strings,Arrays",
  "questions": [
    {
      "id": 101,
      "text": "What is the capital of India?",
      "type": "choice",
      "multipleAnswers": false,
      "required": true,
      "options": [
        { "id": 1, "text": "Delhi", "correct": true },
        { "id": 2, "text": "London", "correct": false },
        { "id": 3, "text": "Berlin", "correct": false }
      ]
    },
    {
      "id": 102,
      "text": "What is 2 + 2?",
      "type": "text",
      "correctAnswer": "4",
      "required": true
    }
  ]
}
export const dashboardData = [
    {
      category: "",
      data: [
        { label: "Number of Assignments Completed", value: "5/20" },
        { label: "Average Assignments Score", value: "60%" },
      ],
    },
    {
      category: "Practice Test",
      data: [
        { label: "Practice Test Completed", value: "1/3" },
        { label: "Average Test Score", value: "60%" },
      ],
    },
    {
      category: "Mock Test",
      data: [
        { label: "Mock Test Completed", value: "1/3" },
        { label: "Average Mock Test Score", value: "60%" },
      ],
    },
    {
      category: "Mock Interviews",
      data: [
        { label: "Mock Interviews Completed", value: "1/3" },
        { label: "Mock Interviews Score", value: "70%" },
      ],
    },
  ];

// export async function fetchCourseByStudentId(studentId) {
//     const response = await fetch(`http://localhost:8080/api/courses/${studentId}`);
//     if (!response.ok) throw new Error('Failed to fetch course');
//     return response.json();
//   }

export const course = {
    "id":"Full Stack Development",
    "course":"Full Stack Development"
};

//   export async function fetchModulesByCourseId(courseId) {
//     const response = await fetch(`http://localhost:8080/api/modules/${courseId}`);
//     if (!response.ok) throw new Error('Failed to fetch modules');
//     return response.json();
//   }

export const modules = [
    { "id": "java", "course_id": "FSD", "module_name": "Java" },
    { "id": "ui", "course_id": "FSD", "module_name": "UI" },
    { "id": "sql", "course_id": "FSD", "module_name": "SQL" }
];

//   export async function fetchTestTopicsByCourseId(courseId) {
//     const response = await fetch(`http://localhost:8080/api/modules/${courseId}`);
//     if (!response.ok) throw new Error('Failed to fetch modules');
//     return response.json();
//   }
export const test__topics = [
    {
        "id":"1",
        "topic": "Arrays",
        "isCompleted":true,
        "isLocked":false
    },
    {
        "id":"2",
        "topic": "Strings",
        "isLocked":false,
        "isCompleted":false
    },
    {
        "id":"3",
        "topic": "Methods",
        "isLocked":true,
        "isCompleted":false
    },
    {
        "id":"4",
        "topic": "Classes",
        "isLocked":true,
        "isCompleted":false
    },
    {
        "id":"5",
        "topic": "Abstraction",
        "isLocked":true,
        "isCompleted":false
    },
    {
        "id":"6",
        "topic": "Encapsulation",
        "isLocked":true,
        "isCompleted":false
    },
    {
        "id":"7",
        "topic": "Polymorphism",
        "isLocked":true,
        "isCompleted":false
    },
    {
        "id":"8",
        "topic": "boilerplate",
        "isLocked":true,
        "isCompleted":false
    },
    {
        "id":"9",
        "topic": "Forms",
        "isLocked":true,
        "isCompleted":false
    },
    {
        "id":"10",
        "topic": "Semantics",
        "isLocked":true,
        "isCompleted":false
    },
    {
        "id":"11",
        "topic": "Selectors",
        "isLocked":true,
        "isCompleted":false
    },
    {
        "id":"12",
        "topic": "Box Model",
        "isLocked":true,
        "isCompleted":false
    }
];

export const chapters = [ 
    {"id":"java_basics","module_id":"java","syllabus_name":"Java Basics"},
    {"id":"oops","module_id":"java","syllabus_name":"OOPS"},
    {"id":"advanced_java","module_id":"java","syllabus_name":"Advanced Java"}
];

export const chaptersUI = [ 
    {"id":"jUI_basics","module_id":"UI","syllabus_name":"UI Basics"},
    {"id":"oops","module_id":"UI","syllabus_name":"OOPS"},
    {"id":"advanced_UI","module_id":"UI","syllabus_name":"Advanced UI"}
];

export const chaptersSQL = [ 
    {"id":"SQL","module_id":"SQL","syllabus_name":"SQL Basics"},
    {"id":"oops","module_id":"SQL","syllabus_name":"OOPS"},
    {"id":"advanced_SQL","module_id":"SQL","syllabus_name":"Advanced SQL"}
];

export const topics = [
    {"id":"arrays","topic_name":"Arrays","practice_locked":false},
    {"id":"strings","topic_name":"Strings","practice_locked":false},
    {"id":"methods","topic_name":"Methods","practice_locked":true}
];

export const practice_questions = [
    
    {
      "id": 1,
      "topic_id": "arrays",
      "question": "What is an array in Java?",
      "type": "mcq",
      "options": ["A collection of elements", "A single element", "A data type", "None of the above"],
      "correctAnswer": 1,
      "explanation": "An array is a data structure that can store a fixed-size collection of elements of the same type."
    },
    {
      "id": 2,
      "topic_id": "arrays",
      "question": "How do you handle multidimensional arrays with jagged structures in Java?",
      "type": "mcq",
      "options": ["int[][] arr = new int[rows][cols];", "int[][] arr = new int[rows][];","Arrays.copy(arr)","int[] arr = new int[rows * cols];"],
      "correctAnswer": 2,
      "explanation":"Jagged arrays in Java can be created using `int[][] arr = new int[rows][];` where each row can have a different number of columns."
    },
    {
        "id": 3,
        "topic_id": "arrays",
        "question": "How do you rotate an array k times to the right efficiently?",
        "type": "mcq",
        "options": ["Use a temporary array","Reverse the array in parts","Use nested loops","Sort the array"],
        "correctAnswer": 2,
        "explanation":"Efficient array rotation can be achieved by reversing parts of the array and then reversing the whole array."
      }
 
];

export const test_questions = {
    "id":"Strings",
    "topic":"strings",
    "timer":"50",
    "questions":[
    {
      "id": 101,
      "question": "What is the time complexity of accessing an element in an array by index?",
      "options": ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
      "correctAnswer": 1,
      "questionType":'mcq'
    },
    {
      "id": 102,
      "question": "What is the time complexity of accessing an element in an array by index?",
      "questionType": 'text'
    }]
}

export const test_results = {
    "score":"80%",
    "correct":10,
    "wrong":10,
    "notAttempted":10,
    "questions":[
        {
            question:"What is the correct way to declare an integer variable named count with an initial value of 10?",
            questionType:'mcq',
            options: ["int count = 10;","integer count = 10;","count = 10;","variable int count = 10;"],
            selectedAnswer: 2,
            correctAnswer: 1,
            explanation: "csgvghgkhl",
            answerExplanation:"correct way to declare an integer variable named count with an initial value of 10 is int count=10"
        },
        {
            question:"What is the correct way to declare an integer variable named count with an initial value of 10?",
            questionType:'text',
            explanation: "csgvghgkhl",
            answerExplanation:"correct way to declare an integer variable named count with an initial value of 10 is int count=10"
        }
    ]
}

export const assessment = [
    {
        'test_title': 'java',
        'id': 'java',
        'total_questions':20,
        'time':"40min"
    },
    {
        'test_title': 'sql',
        'id': 'sql',
        'total_questions':15,
        'time':"30min",
        'completed':true
    }
]

export const assessment_report = {
  "student_id":1,
  "student_name":"Sarayu",
  "score":"80%",
  "correct":10,
  "wrong":10,
  "notAttempted":10,
  "questions":[
      {
          question:"What is the correct way to declare an integer variable named count with an initial value of 10?",
          questionType:'mcq',
          options: ["int count = 10;","integer count = 10;","count = 10;","variable int count = 10;"],
          selectedAnswer: 2,
          correctAnswer: 1,
          explanation: "csgvghgkhl",
          answerExplanation:"correct way to declare an integer variable named count with an initial value of 10 is int count=10"
      },
      {
          question:"What is the correct way to declare an integer variable named count with an initial value of 10?",
          questionType:'text',
          explanation: "csgvghgkhl",
          answerExplanation:"correct way to declare an integer variable named count with an initial value of 10 is int count=10"
      }
  ]
}