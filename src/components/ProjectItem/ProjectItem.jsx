import {useDispatch} from 'react-redux';

function ProjectItem({project}){

    const dispatch = useDispatch();

    function editProject(){
        dispatch({
            type: 'EDIT_PROJECT',
            payload: project.id
        });
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
            {project.name}
            <button onClick={editProject}>Edit</button>
            <button onClick={deleteProject}>Delete</button>
        </div>
    )
};

export default ProjectItem;