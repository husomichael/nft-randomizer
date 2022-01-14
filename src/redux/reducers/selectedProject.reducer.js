const selectedProjectReducer = (state = [], action) =>{
    switch (action.type) {
        case 'SET_SELECTED_PROJECT':
            return action.payload;
        default:
            return state;
    };
};

export default selectedProjectReducer;