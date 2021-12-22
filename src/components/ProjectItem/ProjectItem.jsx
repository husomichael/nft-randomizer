import {useDispatch} from 'react-redux';

function ProjectItem({project}){

    const dispatch = useDispatch();

    function editProject(){
        dispatch({
            type: 'EDIT_PROJECT',
            payload: project.id
        });
    };

    function deleteProject(){
        dispatch({
            type: 'DELETE_PROJECT',
            payload: project.id
        });
    };

    return(
        <div>
            {project.name}
            <button onClick={editProject}>Edit</button>
            <button onClick={deleteProject}>Delete</button>
        </div>
    )
};

export default ProjectItem;