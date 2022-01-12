import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Button, TableCell} from '@mui/material';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

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
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch({
                    type: 'DELETE_PROJECT',
                    payload: project.id
                });
                swalWithBootstrapButtons.fire(
                    'Deleted!',
              )
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
              )
            }
          })
    };

    return(
        <div>
            <TableCell align="center" style={{width: 500}}>
            {project.project_name}
            </TableCell>
            <TableCell align="right" style={{width: 80}}>
            <Button variant="outlined"
            sx={{color: '#FFC300', borderColor: '#FFC300'}} 
            onClick={() => history.push(`/editproject/${project.id}`)}>Edit</Button>
            </TableCell>
            <TableCell align="right" style={{width: 80}}>
            <Button variant="outlined" 
            sx={{color: '#C21E56', borderColor: '#C21E56'}}
            onClick={deleteProject}>Delete</Button>
            </TableCell>
            <TableCell align="right" style={{width: 80}}>
            <Button 
            variant="outlined"
            sx={{color: '#00ADB5', borderColor: '#00ADB5'}}
            onClick={selectProject}>Select</Button>
            </TableCell>
        </div>
    )
};

export default ProjectItem;