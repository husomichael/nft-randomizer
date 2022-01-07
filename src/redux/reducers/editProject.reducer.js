const editThisProject = (state = {}, action) => {
    if (action.type === 'SET_PROJECT_TO_EDIT') {
        return {
        projectName: action.payload.project_name
        }
    } else if (action.type === 'EDIT_PROJECT_NAME') {
        return { ...state, projectName: action.payload }
    } else if (action.type === 'CLEAR_EDIT_PROJECT') {
        return {};
    }
    return state;
};

export default editThisProject;