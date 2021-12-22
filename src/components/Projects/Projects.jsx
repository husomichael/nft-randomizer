import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import ProjectItem from '../ProjectItem/ProjectItem.jsx';


function Projects(){

    const history = useHistory();
    const dispatch = useDispatch();
    const [inputProject, setInputProject] = useState('');
    const projects = useSelector(store => store.projects)

    useEffect(() =>{
        fetchProjects();
    }, []);

    function fetchProjects(){
        dispatch({
            type: 'GET_PROJECTS',
        });
    };

    function addProject(){
        dispatch({
            type: 'ADD_PROJECT',
            payload: inputProject
        });
        setInputProject('');
    };

    function goToLayers(){
        history.push('/layers');
    };

    function setProjects(event){
        setInputProject(event.target.value);
    };

    return(
        <div>
            <p>Current Projects</p>
            {projects.map(project =>{
                return(
                    <div>
                        <ProjectItem project={project}/>
                    </div>
                )
            })}
            <p>Add a Project</p>
            <input
                placeholder="Add a Project" 
                value={inputProject} 
                onChange={setProjects}
            />
            <button onClick={addProject}>Add a Project</button>
            <button onClick={goToLayers}>Go to Layers</button>
        </div>
    );
};

export default Projects;