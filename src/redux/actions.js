

export const setUser = (user) => {
    return {
      type: 'SET_USER',
      payload: user
    };
};

export const setSubject = (subject) => {
  return {
    type: 'SET_SUBJECT',
    payload: subject
  }
}

export const setAssessment = (assessment) => {
  return {
    type: 'SET_ASSESSMENT',
    payload: assessment
  }
}

export const clearAssessment = () => {
  return {
    type: "CLEAR_ASSESSMENT",
  };
};