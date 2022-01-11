import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Button} from '@mui/material';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function LayerItem({layer}){

    const dispatch = useDispatch();
    const history = useHistory();
    
    function deleteLayer(){
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
                    type: 'DELETE_LAYER',
                    payload: layer.id
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
            <h2>{layer.layer_name}</h2>
            <Button variant='contained' onClick={() => history.push(`/editlayer/${layer.id}`)}>Edit</Button>
            <Button variant='contained' onClick={deleteLayer}>Delete</Button>
        </div>
    )
};

export default LayerItem;