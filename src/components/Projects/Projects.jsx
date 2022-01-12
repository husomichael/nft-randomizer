import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {TextField, Button, Table, TableContainer, TableRow, TableCell, TableHead, Grid, Box} from '@mui/material';
import ProjectItem from '../ProjectItem/ProjectItem.jsx';


/*
#222831 Dark Gray
#393E46 Gray
#00ADB5 Teal
#EEEEEE White
*/
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
            <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="35vh"
            >
            <TableContainer style={{maxWidth: 800}} 
            textalign="center">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell 
                            align="center"
                            sx={{fontSize: 30}}
                            >
                                Your Projects
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {projects.map(project =>{
                        return(
                            <TableRow key={project.id}>
                                <ProjectItem project={project}/>
                            </TableRow>
                        )
                    })}
                </Table>
            </TableContainer>
            </Box>
            <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="45"
            >
            <TextField
                placeholder="Add a Project" 
                value={inputProject} 
                onChange={setProjects}
                sx={{mr: 5, pt: 5, width: 250, color: '#00ADB5', borderColor: '#00ADB5'}}
            />
            <Button 
            variant='outlined' 
            onClick={addProject}
            sx={{color: '#00ADB5', borderColor: '#00ADB5', mt: 5, height: 55}}
            >Add Project</Button>
            </Box>
        </div>
    );
};

export default Projects;