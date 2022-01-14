import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {TextField, Typography, Button, Table, TableContainer, TableRow, TableCell, TableHead, Box} from '@mui/material';
import ProjectItem from '../ProjectItem/ProjectItem.jsx';

function Projects(){

    const history = useHistory();
    const dispatch = useDispatch();
    const [inputProject, setInputProject] = useState('');
    const projects = useSelector(store => store.projects);

    useEffect(() =>{
        fetchProjects();
    }, []);

    function fetchProjects(){
        dispatch({
            type: 'GET_PROJECTS',
        });
    };

    function addProject(){
        if(inputProject != ''){
            dispatch({
                type: 'ADD_PROJECT',
                payload: inputProject
            });
            setInputProject('');
        }
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
                minHeight="0vh"
                sx={{mt: 9}}
            >
                <Typography 
                    variant="h2" 
                    component="div" 
                >
                    Start by adding a project.
                </Typography>
            </Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="35vh"
            >
            <TableContainer 
                style={{maxWidth: 800}} 
                textalign="center"
            >
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
                >
                    Add Project
                </Button>
            </Box>
        </div>
    );
};

export default Projects;