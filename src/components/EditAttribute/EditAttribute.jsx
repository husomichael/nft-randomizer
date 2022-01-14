import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {TextField, Box} from '@mui/material';

function EditAttribute() {

  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const attributeToEdit = useSelector(store => store.editThisAttribute);

  useEffect(() => {
    // dispatch to a saga that will populate our
    // edit attribute reducer
    dispatch({
      type: 'FETCH_ONE_ATTRIBUTE',
      payload: params.id
    })
  }, [])

  const handleAttributeNameChange = (e) => {
    dispatch({
      type: 'EDIT_ATTRIBUTE_NAME',
      payload: e.target.value
    })
  }

  const handleAttributeRarityChange = (e) => {
    dispatch({
      type: 'EDIT_ATTRIBUTE_RARITY',
      payload: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'EDIT_ATTRIBUTE',
      payload: {
        id: params.id,
        attributeName: attributeToEdit.attributeName,
        attributeRarity: attributeToEdit.attributeRarity
      }
    })
    dispatch({
      type: 'CLEAR_EDIT_ATTRIBUTE'
    })
    history.push(`/attributes/${attributeToEdit.attributeProjectId}`);
  }

  const handleCancel = (e) => {
    dispatch({
      type: 'CLEAR_EDIT_ATTRIBUTE'
    })
    history.push(`/attributes/${attributeToEdit.attributeProjectId}`);
  }

  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="15vh"
      >
        <h2>Edit Attribute</h2>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="0vh"
      >
        <form onSubmit={handleSubmit}>
          <TextField
            placeholder='Attribute Name'
            value={attributeToEdit.attributeName || ''}
            onChange={handleAttributeNameChange} 
            sx={{mr: 3, width: 250}}
          />
          <TextField
            placeholder='Attribute Rarity'
            value={attributeToEdit.attributeRarity || ''}
            onChange={handleAttributeRarityChange} 
            sx={{mr: 3, width: 250}}
          />
          <button className="btn" >
              Update Attribute
          </button>
        </form>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="20vh"
      >
        <button 
          className="cancel_btn"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </Box>
    </div>
  );
};

export default EditAttribute;