import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';


function EditLayer() {

  const params = useParams();
  console.log('params:')
  console.log(params)

  useEffect(() => {
    // dispatch to a saga that will populate our
    // editThisUser reducer
    dispatch({
      type: 'FETCH_ONE_LAYER',
      payload: params.id
    })
  }, [])

  const history = useHistory();
  const dispatch = useDispatch()

  const layerToEdit = useSelector(store => store.editThisLayer)

  const handleLayerNameChange = (e) => {
    dispatch({
      type: 'EDIT_LAYER_NAME',
      payload: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'EDIT_LAYER',
      payload: {
        id: params.id,
        layerName: layerToEdit.layerName
      }
    })
    dispatch({
      type: 'CLEAR_EDIT_LAYER'
    })
    history.push(`/layers/${layerToEdit.layerProjectId}`); //What do I do here? Go to last page visited.
    //All other components are based on project ID for params.
    //This component's use params are based on layer ID.
  }

  const handleCancel = (e) => {
    dispatch({
      type: 'CLEAR_EDIT_LAYER'
    })
    history.push('/');
  }

  return (
    <div>
      <h2>Edit Layer:</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          placeholder='Layer Name'
          value={layerToEdit.layerName || ''}
          onChange={handleLayerNameChange} 
        />
        <button>Update Layer</button>
      </form>

      <button
        onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
}


export default EditLayer;