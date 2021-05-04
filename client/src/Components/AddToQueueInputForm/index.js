import React, { useState, useEffect } from "react";
import { Grid, Button, ButtonGroup, Input, FormLabel, FormGroup } from "@material-ui/core";
import { ClearQueueButton } from "../ClearQueueButton";
import { WaitingQueueContext } from "../../Context/WaitingQueueContext";
const AddToQueueInputForm = ( props ) =>
{
  const [ inputData, setInputData ] = useState( '' )
  const [ curQueue, setCurQueue ] = useState( props.curQueue )
  const [ handleSubmit, setHandleSubmit ] = useState( ( e ) => { } )

  useEffect( () =>
  {
    console.log( 'curQueue', props.curQueue )
    setCurQueue( props.curQueue )
    let newSubmit = ( e ) =>
    {
      e.preventDefault()
      // console.log( 'curQueue', props.curQueue.curQueueArr )
      console.log( 'inputData', inputData )
      if ( props.curQueue.length !== 0 )
      {
        let newQueue = props.curQueue.curQueueArr
        newQueue.push( inputData )
        console.log( 'handleSubmit', newQueue )

        props.onSubmit( newQueue )

      } else
      {
        let newQueue = [ inputData ]
        console.log( 'empty arr so add handleSubmit', newQueue )
        props.onSubmit( newQueue )

      }

      setInputData( "" )
    }
    setHandleSubmit( e => newSubmit )
  }, [ props.curQueue, inputData ] )

  // useEffect( () =>
  // {
  //   console.log( inputData, 'inputData' )
  // }, [ inputData ] )
  // const handleSubmit = ( e ) =>
  // {
  //   e.preventDefault()
  //   console.log( 'curQueue', curQueue )
  //   if ( curQueue )
  //   {
  //     let newQueue = curQueue
  //     newQueue.push( inputData )
  //     console.log( 'handleSubmit', newQueue )

  //     props.onSubmit( newQueue )

  //   } else
  //   {
  //     let newQueue = [ inputData ]
  //     console.log( 'empty arr so add handleSubmit', newQueue )
  //     props.onSubmit( newQueue )

  //   }

  //   setInputData( "" )
  // }

  return (

    <center>

      <FormGroup  >
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <FormLabel>Add to Queue:</FormLabel></Grid><Grid item>
            <Input type='text' value={inputData} onChange={( e ) => setInputData( e.target.value )}></Input>
          </Grid>
          <Grid container item>
            <ButtonGroup
              style={{ padding: '6px' }}
              fullWidth={false}
              color="primary"
              size="small"
              aria-label="text primary button group" justify="center"
            ><Button color='primary' onClick={( e ) => { handleSubmit( e ) }}>+</Button>
            </ButtonGroup>

          </Grid>
        </Grid>

      </FormGroup >
    </center>
  )

};





export { AddToQueueInputForm };
