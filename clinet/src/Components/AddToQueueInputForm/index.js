import React, { useState, useContext, useEffect } from "react";
import { Button, Input, FormControl, InputLabel, FormLabel, FormGroup } from "@material-ui/core";
import { WaitingQueueContext } from "../../Context/WaitingQueueContext";
import { AddToQueueInputContext } from "../../Context/AddToQueueInputContext";
import { FirebaseDatabaseMutation } from "@react-firebase/database";

const AddToQueueInputForm = ( props ) =>
{
  const [ inputData, setInputData ] = useState( '' )

  const handleSubmit = ( e ) =>
  {
    e.preventDefault()
    console.log( 'handleSubmit', inputData )
    props.onSubmit( inputData )
    setInputData( "" )
  }
  return (

    <FormGroup  >
      <FormLabel>Add to Queue:</FormLabel>
      <Input type='text' value={inputData} onChange={( e ) => setInputData( e.target.value )}></Input>
      <Input type='submit' value="+" onClick={handleSubmit}></Input>
    </FormGroup >
  )

};





export { AddToQueueInputForm };
