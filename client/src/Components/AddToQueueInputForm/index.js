import React, { useState, useEffect } from "react";
import { Button, Input, FormLabel, FormGroup, CardContent, CardActions, CardHeader } from "@material-ui/core";
const AddToQueueInputForm = ( props ) =>
{
  const [ inputData, setInputData ] = useState( '' )
  // const [ curQueue, setCurQueue ] = useState( props.curQueue )
  const [ handleSubmit, setHandleSubmit ] = useState( ( e ) => { } )
  const ID = function ()
  {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return "_" + Math.random().toString( 36 ).substr( 2, 9 );
  };
  const curQueue = props.curQueue
  const onSubmit = props.onSubmit

  useEffect( () =>
  {
    // console.log( 'curQueue', props.curQueue )
    // setCurQueue( props.curQueue )
    let newSubmit = ( e ) =>
    {
      e.preventDefault()
      // console.log( 'curQueue', props.curQueue.curQueueArr )
      // console.log( 'inputData', inputData )
      if ( curQueue.curQueueArr )
      {
        let newQueue = curQueue.curQueueArr
        newQueue.push( { id: ID(), message: inputData } )
        // console.log( 'handleSubmit', newQueue )

        onSubmit( newQueue )

      } else
      {
        let newQueue = [ inputData ]
        // console.log( 'empty arr so add handleSubmit', newQueue )
        onSubmit( newQueue )

      }

      setInputData( "" )
    }
    setHandleSubmit( e => newSubmit )
  }, [ curQueue, onSubmit, inputData ] )


  return (
    <React.Fragment>
      <form onSubmit={( e ) => { handleSubmit( e ) }}>
        <CardHeader title={
          `Add to Queue`

        }>

        </CardHeader>
        <CardContent>

          <Input type='text' value={inputData} onChange={( e ) => setInputData( e.target.value )}></Input>


        </CardContent>
        <CardActions><Button type="submit">+</Button></CardActions>

      </form>
    </React.Fragment >


  )

};





export { AddToQueueInputForm };
