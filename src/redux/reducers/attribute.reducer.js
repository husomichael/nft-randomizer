const attributeReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ATTRIBUTES':
        return action.payload;
      default:
        return state;
    };
  };
  
  export default attributeReducer;