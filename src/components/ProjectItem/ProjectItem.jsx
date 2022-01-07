import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

function ProjectItem({project}){

    const dispatch = useDispatch();
    const history = useHistory();
    const projects = useSelector(store => store.projects);

    function selectProject(){
        if(projects == []){
            dispatch({
                type: 'SELECT_PROJECT',
                payload: project.id
            });
        }else{
            dispatch({
                type: 'CHANGE_PROJECT',
                payload: project.id
            });
        };
        history.push(`/layers/${project.id}`);
    };

    function deleteProject(){
        dispatch({
            type: 'DELETE_PROJECT',
            payload: project.id
        });
    };

    return(
        <div>
            {project.project_name}
            <button onClick={() => history.push(`/editproject/${project.id}`)}>Edit</button>
            <button onClick={deleteProject}>Delete</button>
            <button onClick={selectProject}>Select</button>
        </div>
    )
};

export default ProjectItem;