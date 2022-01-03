const layerReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_LAYERS':
        return action.payload;
      default:
        return state;
    };
  };
  

  export default layerReducer;