import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';


function EditProject() {

  const params = useParams();
  console.log('params:')
  console.log(params)

  useEffect(() => {
    // dispatch to a saga that will populate our
    // editThisUser reducer
    dispatch({
      type: 'FETCH_ONE_PROJECT',
      payload: params.id
    })
  }, [])

  const history = useHistory();
  const dispatch = useDispatch()

  const projectToEdit = useSelector(store => store.editThisProject)

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
      <h2>Edit Project:</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          placeholder='Project Name'
          value={projectToEdit.projectName || ''}
          onChange={handleProjectNameChange} 
        />
        <button>Update Project</button>
      </form>

      <button
        onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
}


export default EditProject;