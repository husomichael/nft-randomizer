import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Button} from '@mui/material';
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
            {project.project_name}
            <Button variant="contained" onClick={() => history.push(`/editproject/${project.id}`)}>Edit</Button>
            <Button onClick={deleteProject}>Delete</Button>
            <Button onClick={selectProject}>Select</Button>
        </div>
    )
};

export default ProjectItem;