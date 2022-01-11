import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {TextField, Button} from '@mui/material';
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
            <header class="component-header">
                <h2>Your Projects</h2>
            </header>
            {projects.map(project =>{
                return(
                    <div key={project.id}>
                        <ProjectItem project={project}/>
                    </div>
                )
            })}
            <p>Add a Project</p>
            <TextField
                placeholder="Add a Project" 
                value={inputProject} 
                onChange={setProjects}
            />
            <Button variant='contained' onClick={addProject}>Add a Project</Button>
        </div>
    );
};

export default Projects;