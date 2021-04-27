import React, { useState, useContext, useEffect } from "react";
import { Grid, Button, ButtonGroup, Input, FormControl, InputLabel, FormLabel, FormGroup } from "@material-ui/core";
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
    <Grid container direction="column" justify="center" alignItems="center" spacing={4}>

      <FormGroup  >
        <FormLabel>Add to Queue:</FormLabel>
        <Input type='text' value={inputData} onChange={( e ) => setInputData( e.target.value )}></Input>
        <ButtonGroup
          style={{ padding: '36px' }}
          fullWidth="false"
          color="primary"
          size="small"
          aria-label="text primary button group"
        ><Button color='primary' onClick={handleSubmit}>+</Button></ButtonGroup>


      </FormGroup >
    </Grid >

  )

};





export { AddToQueueInputForm };
