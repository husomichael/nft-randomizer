import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Button, TableCell} from '@mui/material';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

function LayerItem({layer}){

  const MySwal = withReactContent(Swal)
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
      <TableCell 
        align="center" 
        style={{width: 500}}
        sx={{fontSize: 18, pr: 40}}
      >
        {layer.layer_name}
      </TableCell>
      <TableCell 
        align="right" 
        style={{width: 100}}
      >
        <Button 
          variant='outlined' 
          sx={{color: '#ba8f00', borderColor: '#ba8f00'}} 
          onClick={() => history.push(`/editlayer/${layer.id}`)}
        >
          Edit
        </Button>
      </TableCell>
      <TableCell 
        align="right" 
        style={{width: 100}}
      >
        <Button 
          variant='outlined'
          sx={{color: '#C21E56', borderColor: '#C21E56'}}
          onClick={deleteLayer}
        >
            Delete
        </Button>
      </TableCell>
    </div>
  )
};

export default LayerItem;