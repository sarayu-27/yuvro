


const initialState = {
    user:'',
    subject:'',
    assessment:''
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return {
            ...state,
            user:action.payload
        }
      case 'SET_SUBJECT':
        return {
          ...state,
          subject: action.payload
        }
      case 'SET_ASSESSMENT': 
        return {
          ...state,
          assessment: action.payload
        }
      case "CLEAR_ASSESSMENT": 
        return {
          ...state,
          assessment: "",
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  