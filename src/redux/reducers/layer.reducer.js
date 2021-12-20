const layerReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_LAYERS':
        return action.payload;
      default:
        return state;
    };
  };
  
  // user will be on the redux state at:
  // state.user
  export default layerReducer;