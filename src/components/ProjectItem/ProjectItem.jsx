import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

function ProjectItem({project}){

    const dispatch = useDispatch();
    const history = useHistory();

    function editProject(){
        dispatch({
            type: 'EDIT_PROJECT',
            payload: project.id
        });
    };

    function selectProject(){
        dispatch({
            type: 'SELECT_PROJECT',
            payload: project.id
        });
        history.push(`/layers/`);
    };


    //TODO: Delete all references to layers, and attributes for project when deleted.
    //Find a way to conditionally render EDITING a project.
    function deleteProject(){
        dispatch({
            type: 'DELETE_PROJECT',
            payload: project.id
        });
    };

    return(
        <div>
            {project.project_name}
            <button onClick={editProject}>Edit</button>
            <button onClick={deleteProject}>Delete</button>
            <button onClick={selectProject}>Select</button>
        </div>
    )
};

export default ProjectItem;