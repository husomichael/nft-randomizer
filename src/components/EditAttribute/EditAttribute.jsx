import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';


function EditAttribute() {

  const params = useParams();
  console.log('params:')
  console.log(params)

  useEffect(() => {
    // dispatch to a saga that will populate our
    // editThisUser reducer
    dispatch({
      type: 'FETCH_ONE_ATTRIBUTE',
      payload: params.id
    })
  }, [])

  const history = useHistory();
  const dispatch = useDispatch()

  const attributeToEdit = useSelector(store => store.editThisAttribute)

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
    history.push(`/attributes/${attributeToEdit.attributeProjectId}`); //What do I do here? Go to last page visited.
    //All other components are based on project ID for params.
    //This component's use params are based on attribute ID.
  }

  const handleCancel = (e) => {
    dispatch({
      type: 'CLEAR_EDIT_ATTRIBUTE'
    })
    history.push('/');
  }

  return (
    <div>
      <h2>Edit Attribute:</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          placeholder='Attribute Name'
          value={attributeToEdit.attributeName || ''}
          onChange={handleAttributeNameChange} 
        />
        <input
          placeholder='Attribute Rarity'
          value={attributeToEdit.attributeRarity || ''}
          onChange={handleAttributeRarityChange} 
        />
        <button>Update Attribute</button>
      </form>

      <button
        onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
}


export default EditAttribute;