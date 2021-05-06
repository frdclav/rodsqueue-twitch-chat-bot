import React, { useState, useEffect } from "react";
import { Grid, Button, ButtonGroup, Input, FormLabel, FormGroup } from "@material-ui/core";
import { ClearQueueButton } from "../ClearQueueButton";
import { WaitingQueueContext } from "../../Context/WaitingQueueContext";
const AddToQueueInputForm = ( props ) =>
{
  const [ inputData, setInputData ] = useState( '' )
  const [ curQueue, setCurQueue ] = useState( props.curQueue )
  const [ handleSubmit, setHandleSubmit ] = useState( ( e ) => { } )
  const ID = function ()
  {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return "_" + Math.random().toString( 36 ).substr( 2, 9 );
  };

  useEffect( () =>
  {
    console.log( 'curQueue', props.curQueue )
    setCurQueue( props.curQueue )
    let newSubmit = ( e ) =>
    {
      e.preventDefault()
      // console.log( 'curQueue', props.curQueue.curQueueArr )
      console.log( 'inputData', inputData )
      if ( props.curQueue.curQueueArr )
      {
        let newQueue = props.curQueue.curQueueArr
        newQueue.push( { id: ID(), message: inputData } )
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
