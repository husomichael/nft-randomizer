import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Button, TableCell, TableRow} from '@mui/material';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function AttributeItem({attribute}){

  const dispatch = useDispatch();
  const history = useHistory();

  function deleteAttribute(){
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
          type: 'DELETE_ATTRIBUTE',
          payload: attribute.id
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
    <TableRow 
      sx={{minWidth: 400}}
    >
      <TableCell 
        sx={{minWidth: 100, width: 130}}
      >
        <b>{attribute.attribute_name}</b>
      </TableCell>
      <TableCell 
        sx={{minWidth: 100, width: 130}}
      >
        <b>{attribute.rarity_value}%</b>
      </TableCell>
      <TableCell 
        sx={{minWidth: 100, width: 130, pr: 0, pl: 6}}
        align="right"
      >
        <Button 
          variant='outlined'
          sx={{color: '#ba8f00', borderColor: '#ba8f00'}} 
          onClick={() => history.push(`/editattribute/${attribute.id}`)}
        >
            Edit
        </Button>
      </TableCell>
      <TableCell
        sx={{minWidth: 100, width: 130, pr: 0,}}
        align="right"
      >
        <Button 
          variant='outlined' 
          onClick={deleteAttribute}
          sx={{color: '#C21E56', borderColor: '#C21E56'}}
        >
            Delete
        </Button>
      </TableCell>
    </TableRow>
  )
};

export default AttributeItem;