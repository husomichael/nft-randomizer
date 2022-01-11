import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {List, ListItem, Button, Grid, Paper, Box} from '@mui/material';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function AttributeItem({attribute}){

    const dispatch = useDispatch();
    const history = useHistory();
    const attributes = useSelector(store => store.attributes);
    const projects = useSelector(store => store.selectedProject);

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
        <div>
            <Grid 
            container direction="row" 
            spacing={0} 
            justifyContent={'space-between'}
            align-items={'center'}
            >
                <Grid item >
                    <b>{attribute.attribute_name}  {attribute.rarity_value}%</b>
                </Grid>
                <Grid 
                container direction="row" 
                spacing={0} 
                justifyContent={'flex-end'}
                align-items={'center'}
                >
                    <Grid item>
                        <Button onClick={() => history.push(`/editattribute/${attribute.id}`)}>Edit</Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={deleteAttribute}>Delete</Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
};

export default AttributeItem;