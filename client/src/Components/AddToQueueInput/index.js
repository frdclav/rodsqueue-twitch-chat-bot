import React from "react";
// import { FirebaseDatabaseMutation } from "@react-firebase/database";
import { AddToQueueInputForm } from "../AddToQueueInputForm"
import { Card } from '@material-ui/core'
// import { ClearQueueButton } from "../ClearQueueButton"
import API from "../../Utils/API"
// import { QueueSwitch } from "../QueueSwitch";

const AddToQueueInput = (props) => {




  // useEffect( () =>
  // {
  //   console.log( "inputData", inputData );
  // }, [ inputData ] );
  // useEffect( () =>
  // {
  //   console.log( "props updating", props )
  //   setTheDbValue( props )
  // }, [ props ] )
  let firebaseIdAuth
  props.firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
    console.log(idToken, 'idToken')
    firebaseIdAuth = idToken
  }).catch(function (error) {
    // Handle error
    console.log('err with firebase auth', error)
  });

  const handleSubmit = (newValue) => {
    // console.log( 'newValue', newValue );
    // console.log( 'props', theDbValue );
    API.addToQueueAPI({ storename: props.curShop, value: newValue, auth: firebaseIdAuth })
  }
  const handleClearQueue = () => {

    // console.log( 'clearqueue!', props.curShop )
    API.clearQueue({ storename: props.curShop, value: [] })
  }
  return (
    <Card>
      <AddToQueueInputForm curQueue={props.curQueue} handleClearQueue={handleClearQueue} curShop={props.curShop} onSubmit={handleSubmit} ></AddToQueueInputForm>
    </Card>


  )

};





export { AddToQueueInput };
