const editThisAttribute = (state = {}, action) => {
    if (action.type === 'SET_ATTRIBUTE_TO_EDIT') {
        return {
        attributeName: action.payload.attribute_name,
        attributeRarity: action.payload.rarity_value,
        attributeProjectId: action.payload.project_id,
        }
    } else if (action.type === 'EDIT_ATTRIBUTE_NAME') {
        return { ...state, attributeName: action.payload }
    } else if (action.type === 'EDIT_ATTRIBUTE_RARITY') {
        return { ...state, attributeRarity: action.payload }
    } else if (action.type === 'CLEAR_EDIT_ATTRIBUTE') {
        return {};
    }
    return state;
};

export default editThisAttribute;