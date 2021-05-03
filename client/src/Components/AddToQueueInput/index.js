import React, { useState, useEffect } from "react";
import { FirebaseDatabaseMutation } from "@react-firebase/database";
import { AddToQueueInputForm } from "../AddToQueueInputForm"
import { ClearQueueButton } from "../ClearQueueButton"
import API from "../../Utils/API"

const AddToQueueInput = ( props ) =>
{




  const [ inputData, setInputData ] = useState( '' );
  const [ theDbValue, setTheDbValue ] = useState( props )
  // useEffect( () =>
  // {
  //   console.log( "inputData", inputData );
  // }, [ inputData ] );
  // useEffect( () =>
  // {
  //   console.log( "props updating", props )
  //   setTheDbValue( props )
  // }, [ props ] )
  const handleSubmit = ( newValue ) =>
  {
    console.log( 'newValue', newValue );
    console.log( 'props', theDbValue );
    API.addToQueueAPI( newValue )
  }
  const handleClearQueue = () =>
  {

    console.log( 'clearqueue!', props.curShop )
    API.clearQueue( props.curShop )
  }
  return (
    <center>
      <AddToQueueInputForm handleClearQueue={handleClearQueue} curShop={props.curShop} onSubmit={handleSubmit} onChange={( e ) => setInputData( e.target.value )}></AddToQueueInputForm>
      <ClearQueueButton handleClearQueue={handleClearQueue} curShop={props.curShop}></ClearQueueButton>
    </center>


  )

};





export { AddToQueueInput };
