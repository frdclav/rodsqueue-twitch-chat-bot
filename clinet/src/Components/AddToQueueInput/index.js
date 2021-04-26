import React, { useState, useContext, useEffect } from "react";
import { Button, Input, FormControl, InputLabel, FormLabel, FormGroup } from "@material-ui/core";
import { WaitingQueueContext } from "../../Context/WaitingQueueContext";
import { AddToQueueInputContext } from "../../Context/AddToQueueInputContext";
import { FirebaseDatabaseMutation } from "@react-firebase/database";
import { AddToQueueInputForm } from "../AddToQueueInputForm"
import API from "../../Utils/API"

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

  // const theDbValue = props.dbValue ? props.dbValue.curQueueArr : curWaitingQueueState;
  // let theDbValue = props

  const [ inputData, setInputData ] = useState( '' );
  const [ theDbValue, setTheDbValue ] = useState( props )
  useEffect( () =>
  {
    console.log( "inputData", inputData );
  }, [ inputData ] );
  useEffect( () =>
  {
    console.log( "props updating", props )
    setTheDbValue( props )
  }, [ props ] )

  return (
    <FirebaseDatabaseMutation type="update" path="/">
      {( { runMutation } ) =>
      {

        const handleSubmit = ( newValue ) =>
        {
          console.log( 'newValue', newValue );
          console.log( 'props', theDbValue );
          API.addToQueueAPI( newValue )
          // let newQueue = props.dbValue.curQueueArr;
          // newQueue.push( { id: ID(), value: newValue } );
          // const { key } = runMutation( { curQueueArr: newQueue } );
        }
        return (

          <AddToQueueInputForm onSubmit={handleSubmit} onChange={( e ) => setInputData( e.target.value )}></AddToQueueInputForm>


        )
      }}

    </FirebaseDatabaseMutation>

  )

};





export { AddToQueueInput };
