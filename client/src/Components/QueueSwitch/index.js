import React from "react";
import { Grid, Button, ButtonGroup, FormGroup } from "@material-ui/core";
import API from "../../Utils/API.js"
import
{
    FirebaseDatabaseNode
} from "@react-firebase/database";
const QueueSwitch = ( props ) =>
{
    // const [ showSwal, setShowSwal ] = useState( false )

    // const showSwal = () =>
    // {
    //     MySwal.fire( {
    //         title: <p>Are you sure you want to clear the current queue?</p>,
    //         // footer: 'Copyright 2018',
    //         showCancelButton: true,
    //         confirmButtonText: 'Yes',
    //         cancelButtonText: 'No',
    //         didOpen: () =>
    //         {
    //             // `MySwal` is a subclass of `Swal`
    //             //   with all the same instance & static methods
    //             MySwal.clickConfirm()
    //             MySwal.clickCancel()
    //         }
    //     } ).then( ( result ) =>
    //     {
    //         // return MySwal.fire( <p>Shorthand works too</p> )
    //         if ( result.value )
    //         {
    //             handleSubmit()
    //             Swal.fire( 'Queue cleared.' )
    //         } else if ( result.dismiss === Swal.DismissReason.cancel )
    //         {
    //             Swal.fire(
    //                 'Queue not cleared!'
    //             )
    //         }
    //     } )
    // }
    // const [ queueStatus, setQueueStatus ] = useState( '' )
    // const [ handleSubmit, setHandleSubmit ] = useState( () => { } )

    // useEffect( () =>
    // {
    //     // API.queueStatus( props.curShop ).then( ( response ) =>
    //     // {
    //     //     console.log( 'queueStatus response', response.data )
    //     // } )
    //     console.log( 'props.curQueueStatus', props.curQueueStatus )
    //     setQueueStatus( props.curQueueStatus )
    //     let handleQueueStatus = () =>
    //     {
    //         if ( !props.curQueueStatus )
    //         {
    //             console.log( 'closing queue' )
    //             // props.handleClearQueue( props.curShop )
    //             // setShowSwal( false )
    //             // props.onSubmit( inputData )
    //             // setInputData( "" )
    //             API.setQueueStatus( { curShop: props.curShop, statusToSet: false } ).then( ( response ) =>
    //             {
    //                 console.log( 'setqueueStatus close response', response.data )
    //                 // setQueueStatus( response.data.queuestatus )
    //             } )
    //         } else
    //         {
    //             console.log( 'opening queue' )
    //             // props.handleClearQueue( props.curShop )
    //             // setShowSwal( false )
    //             // props.onSubmit( inputData )
    //             // setInputData( "" )
    //             API.setQueueStatus( { curShop: props.curShop, statusToSet: true } ).then( ( response ) =>
    //             {
    //                 console.log( 'setqueueStatus open response', response.data )
    //                 // setQueueStatus( response.data.queuestatus )
    //             } )
    //         }
    //     }
    //     setHandleSubmit( handleQueueStatus )
    // }, [ props.curQueueStatus ] )


    // let helper = () =>
    // {
    //     if ( props.curQueueStatus )
    //     {
    //         return ( <Button color='primary' onClick={handleCloseQueue} >Close Queue {props.curQueueStatus}</Button> )
    //     } else
    //     {
    //         return ( <Button color='primary' onClick={handleOpenQueue} >Open Queue {props.curQueueStatus}</Button> )
    //     }
    // }


    // const handleOpenQueue = ( e ) =>
    // {
    //     e.preventDefault()
    //     console.log( 'opening queue' )
    //     // props.handleClearQueue( props.curShop )
    //     // setShowSwal( false )
    //     // props.onSubmit( inputData )
    //     // setInputData( "" )
    //     API.setQueueStatus( { curShop: props.curShop, statusToSet: true } ).then( ( response ) =>
    //     {
    //         console.log( 'setqueueStatus open response', response.data )
    //         // setQueueStatus( response.data.queuestatus )
    //     } )
    // }
    // const handleCloseQueue = ( e ) =>
    // {
    //     e.preventDefault()
    //     console.log( 'closing queue' )
    //     // props.handleClearQueue( props.curShop )
    //     // setShowSwal( false )
    //     // props.onSubmit( inputData )
    //     // setInputData( "" )
    //     API.setQueueStatus( { curShop: props.curShop, statusToSet: false } ).then( ( response ) =>
    //     {
    //         console.log( 'setqueueStatus close response', response.data )
    //         // setQueueStatus( response.data.queuestatus )
    //     } )
    // }


    return (
        <center>
            <FirebaseDatabaseNode path={`/${props.curShop}/queuestatus`}>
                {( d ) =>
                {
                    let handleQueueStatus = () =>
                    {
                        if ( d.value )
                        {
                            // console.log( 'closing queue' )
                            // props.handleClearQueue( props.curShop )
                            // setShowSwal( false )
                            // props.onSubmit( inputData )
                            // setInputData( "" )
                            API.setQueueStatus( { curShop: props.curShop, statusToSet: false } ).then( ( response ) =>
                            {
                                // console.log( 'setqueueStatus close response', response.data )
                                // setQueueStatus( response.data.queuestatus )
                            } )
                        } else
                        {
                            // console.log( 'opening queue' )
                            // props.handleClearQueue( props.curShop )
                            // setShowSwal( false )
                            // props.onSubmit( inputData )
                            // setInputData( "" )
                            API.setQueueStatus( { curShop: props.curShop, statusToSet: true } ).then( ( response ) =>
                            {
                                // console.log( 'setqueueStatus open response', response.data )
                                // setQueueStatus( response.data.queuestatus )
                            } )
                        }
                    }
                    const helper = () =>
                    {
                        if ( d.value )
                        {
                            return ( <FormGroup  >
                                <Grid container direction="column" justify="center" alignItems="center">
                                    <Grid item>
                                        {`Queue is OPEN`}
                                    </Grid>
                                    <Grid item>
                                        <ButtonGroup
                                            style={{ padding: '6px' }}
                                            fullWidth={false}
                                            color="primary"
                                            size="small"
                                            aria-label="text primary button group" justify="center"
                                        >
                                            <Button onClick={handleQueueStatus}> Close Queue </Button>
                                        </ ButtonGroup>
                                    </Grid>

                                </Grid >
                            </FormGroup > )
                        } else
                        {
                            return ( <FormGroup  >
                                <Grid container direction="column" justify="center" alignItems="center">
                                    <Grid item>
                                        {` Queue is CLOSED`}
                                    </Grid>
                                    <Grid item>
                                        <ButtonGroup
                                            style={{ padding: '6px' }}
                                            fullWidth={false}
                                            color="primary"
                                            size="small"
                                            aria-label="text primary button group" justify="center"
                                        >
                                            <Button onClick={handleQueueStatus}> Open Queue </Button>
                                        </ ButtonGroup>
                                    </Grid>
                                </Grid >
                            </FormGroup > )
                        }
                    }
                    return ( helper() )
                }}

            </FirebaseDatabaseNode>
            {/* <p>BLAH</p> */}
        </center >
    )

};





export { QueueSwitch };
