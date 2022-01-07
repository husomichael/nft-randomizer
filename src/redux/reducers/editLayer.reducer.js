const editThisLayer = (state = {}, action) => {
    if (action.type === 'SET_LAYER_TO_EDIT') {
        return {
        layerName: action.payload.layer_name
        }
    } else if (action.type === 'EDIT_LAYER_NAME') {
        return { ...state, layerName: action.payload }
    } else if (action.type === 'CLEAR_EDIT_LAYER') {
        return {};
    }
    return state;
};

export default editThisLayer;