import React, { useState, useContext, useEffect } from "react";
import { Button, Input, FormControl, InputLabel, FormLabel, FormGroup } from "@material-ui/core";
import { WaitingQueueContext } from "../../Context/WaitingQueueContext";
import { AddToQueueInputContext } from "../../Context/AddToQueueInputContext";
import { FirebaseDatabaseMutation } from "@react-firebase/database";
import { AddToQueueInputForm } from "../AddToQueueInputForm"

const AddToQueueInput = ( props ) =>
{
  const { curWaitingQueueState, setCurWaitingQueueState } = useContext(
    WaitingQueueContext
  );


  const ID = function ()
  {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return "_" + Math.random().toString( 36 ).substr( 2, 9 );
  };



  const [ inputData, setInputData ] = useState( '' );
  useEffect( () =>
  {
    console.log( "inputData", inputData );
  }, [ inputData ] );

  return (
    <FirebaseDatabaseMutation type="update" path="/">
      {( { runMutation } ) =>
      {

        const handleSubmit = ( newValue ) =>
        {
          console.log( 'newValue', newValue );
          let newQueue = curWaitingQueueState.curQueueArr;
          newQueue.push( { id: ID(), value: newValue } );
          const { key } = runMutation( { curQueueArr: newQueue } );
        }
        return (

          <AddToQueueInputForm onSubmit={handleSubmit} onChange={( e ) => setInputData( e.target.value )}></AddToQueueInputForm>


        )
      }}

    </FirebaseDatabaseMutation>

  )

};





export { AddToQueueInput };
