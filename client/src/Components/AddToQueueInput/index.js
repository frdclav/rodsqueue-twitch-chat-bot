import React, { useState, useEffect } from "react";
import { FirebaseDatabaseMutation } from "@react-firebase/database";
import { AddToQueueInputForm } from "../AddToQueueInputForm"
import API from "../../Utils/API"

const AddToQueueInput = ( props ) =>
{




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
        }
        return (
          <center>
            <AddToQueueInputForm onSubmit={handleSubmit} onChange={( e ) => setInputData( e.target.value )}></AddToQueueInputForm>
          </center>

        )
      }}

    </FirebaseDatabaseMutation>

  )

};





export { AddToQueueInput };
