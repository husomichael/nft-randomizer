import { combineReducers } from "redux";

const projectReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PROJECTS':
            return action.payload;
        default:
            return state;
    };
};

export default projectReducer;