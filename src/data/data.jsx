
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