import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {TextField, Box} from '@mui/material';

function EditProject() {

  const history = useHistory();
  const dispatch = useDispatch()
  const params = useParams();
  const projectToEdit = useSelector(store => store.editThisProject);

  useEffect(() => {
    // dispatch to a saga that will populate our
    // edit project reducer
    dispatch({
      type: 'FETCH_ONE_PROJECT',
      payload: params.id
    })
  }, [])

  const handleProjectNameChange = (e) => {
    dispatch({
      type: 'EDIT_PROJECT_NAME',
      payload: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'EDIT_PROJECT',
      payload: {
        id: params.id,
        projectName: projectToEdit.projectName
      }
    })
    dispatch({
      type: 'CLEAR_EDIT_PROJECT'
    })
    history.push('/projects');
  }

  const handleCancel = (e) => {
    dispatch({
      type: 'CLEAR_EDIT_PROJECT'
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
        <h2>Edit Project</h2>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="0vh"
      >
        <form onSubmit={handleSubmit}>
          <TextField
            placeholder='Project Name'
            value={projectToEdit.projectName || ''}
            onChange={handleProjectNameChange} 
            sx={{mr: 3, width: 250}}
          />
          <button className="btn" >
              Update Project
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


export default EditProject;