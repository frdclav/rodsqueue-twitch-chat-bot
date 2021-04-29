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
  return ( <center>

    <FormGroup  ><Grid container direction="column" justify="center" alignItems="center">
      <Grid item>
        <FormLabel>Add to Queue:</FormLabel></Grid><Grid item>
        <Input type='text' value={inputData} onChange={( e ) => setInputData( e.target.value )}></Input>
      </Grid>
      <Grid container item>
        <ButtonGroup
          style={{ padding: '6px' }}
          fullWidth="false"
          color="primary"
          size="small"
          aria-label="text primary button group" justify="center"
        ><Button color='primary' onClick={handleSubmit}>+</Button>
        </ButtonGroup>

      </Grid>

    </Grid >
    </FormGroup >
  </center>
  )

};





export { AddToQueueInputForm };
