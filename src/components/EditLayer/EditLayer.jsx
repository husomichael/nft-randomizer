import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {TextField, Button, Table, TableContainer, TableRow, TableCell, TableHead, Grid, Box} from '@mui/material';


function EditLayer() {

  const params = useParams();
  console.log('params:')
  console.log(params)

  useEffect(() => {
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
    history.push(`/layers/${layerToEdit.layerProjectId}`);
  }

  const handleCancel = (e) => {
    dispatch({
      type: 'CLEAR_EDIT_LAYER'
    })
    history.push('/');
  }

  return (
    <div>
      <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="15vh"
      >
      <h2>Edit Layer</h2>
      </Box>
      <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="0vh"
      >
        <form onSubmit={handleSubmit}>
        <TextField
          placeholder='Layer Name'
          value={layerToEdit.layerName || ''}
          onChange={handleLayerNameChange} 
          sx={{mr: 3, width: 250}}
        />
        <button className="btn">
          Update Layer
        </button>
      </form>
      </Box>
      <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="20vh"
      >
      <button className="cancel_btn"
        onClick={handleCancel}>
        Cancel
      </button>
      </Box>
    </div>
  );
}


export default EditLayer;