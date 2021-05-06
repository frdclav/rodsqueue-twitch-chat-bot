import React from "react";
import { Grid, Button, ButtonGroup, FormGroup } from "@material-ui/core";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent( Swal )
const ClearQueueButton = ( props ) =>
{
    // const [ showSwal, setShowSwal ] = useState( false )

    const showSwal = () =>
    {
        MySwal.fire( {
            title: <p>Are you sure you want to clear the current queue?</p>,
            // footer: 'Copyright 2018',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            didOpen: () =>
            {
                // `MySwal` is a subclass of `Swal`
                //   with all the same instance & static methods
                MySwal.clickConfirm()
                MySwal.clickCancel()
            }
        } ).then( ( result ) =>
        {
            // return MySwal.fire( <p>Shorthand works too</p> )
            if ( result.value )
            {
                handleSubmit()
                Swal.fire( 'Queue cleared.' )
            } else if ( result.dismiss === Swal.DismissReason.cancel )
            {
                Swal.fire(
                    'Queue not cleared!'
                )
            }
        } )
    }

    //TODO: Queue clears but the dom does not refresh --- figure this out
    const handleSubmit = ( e ) =>
    {
        // e.preventDefault()
        console.log( 'clearqueue!', props.curShop, props.handleClearQueue )
        props.handleClearQueue( props.curShop )
        // setShowSwal( false )
        // props.onSubmit( inputData )
        // setInputData( "" )
    }
    return (
        <center>

            <FormGroup  >
                <Grid container direction="column" justify="center" alignItems="center">

                    <Grid container item>
                        <ButtonGroup
                            style={{ padding: '6px' }}
                            fullWidth={false}
                            color="primary"
                            size="small"
                            aria-label="text primary button group" justify="center"
                        >
                            <Button color='primary' onClick={showSwal}>Clear Queue</Button>
                        </ButtonGroup>

                    </Grid>

                </Grid >
            </FormGroup >

        </center >
    )

};





export { ClearQueueButton };
