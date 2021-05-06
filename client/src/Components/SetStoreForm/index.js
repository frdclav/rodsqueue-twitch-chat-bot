import React, { useState, useEffect } from "react";
import { Grid, Button, ButtonGroup, Input, FormLabel, FormGroup } from "@material-ui/core";
import { ClearQueueButton } from "../ClearQueueButton";
import { WaitingQueueContext } from "../../Context/WaitingQueueContext";
import bcryptjs from 'bcryptjs'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import API from '../../Utils/API'


const MySwal = withReactContent( Swal )
const showPwCheckFailSwal = () =>
{

  MySwal.fire( {
    title: <p>Something is wrong.</p>,
    showCancelButton: true,
    confirmButtonText: 'OK',
    didOpen: () =>
    {
      // `MySwal` is a subclass of `Swal`
      //   with all the same instance & static methods
      MySwal.clickConfirm()
    }
  } )
}

const SetStoreForm = ( props ) =>
{
  const [ nameInputData, setNameInputData ] = useState( '' )
  const [ pwInputData, setPwInputData ] = useState( '' )

  const [ curQueue, setCurQueue ] = useState( props.curQueue )
  const [ handleSubmit, setHandleSubmit ] = useState( ( e ) => { } )
  const [ handleCreate, setHandleCreate ] = useState( ( e ) => { } )

  const ID = function ()
  {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return "_" + Math.random().toString( 36 ).substr( 2, 9 );
  };
  const checkPassword = ( inputtxt ) =>
  {
    const passw = /^[A-Za-z]\w{7,14}$/;
    if ( inputtxt && inputtxt.match( passw ) ) 
    {
      // alert( 'Correct, try another...' )
      return true;
    }
    else
    {
      // alert( 'Wrong...!' )
      return false;
    }
  }

  useEffect( () =>
  {
    // console.log( 'curUser', props.user.uid )
    let user = props.user.uid
    // setCurQueue( props.curQueue )
    let newSubmit = ( e ) =>
    {
      // validate the password
      if ( !nameInputData || !pwInputData )
      {
        // console.log( 'check name or pw', nameInputData, pwInputData )

        showPwCheckFailSwal()
      } else if ( !checkPassword( pwInputData ) )
      {
        showPwCheckFailSwal()
      }
      else
      {
        console.log( 'submit!', user, nameInputData, pwInputData )
        // check if store exists
        API.setStore( { user, storename: nameInputData, password: pwInputData } ).then( ( response ) =>
        {
          // console.log( 'checkStore', response )
          if ( response.data )
          {
            // if store exists, link store to user

            console.log( 'store exists' )


          }
          else
          {
            // if store does not exists -- error

            console.log( 'store does not exist' )
            showPwCheckFailSwal()
          }

        } )
      }

      // e.preventDefault()
      // // console.log( 'curQueue', props.curQueue.curQueueArr )
      // console.log( 'inputData', inputData )
      // if ( props.curQueue.length !== 0 )
      // {
      //   let newQueue = props.curQueue.curQueueArr
      //   newQueue.push( { id: ID(), message: inputData } )
      //   console.log( 'handleSubmit', newQueue )

      //   props.onSubmit( newQueue )

      // } else
      // {
      //   let newQueue = [ inputData ]
      //   console.log( 'empty arr so add handleSubmit', newQueue )
      //   props.onSubmit( newQueue )

      // }

      setNameInputData( "" )
      setPwInputData( "" )
    }
    let newCreate = ( e ) =>
    {
      // validate the password
      if ( !nameInputData || !pwInputData )
      {
        // console.log( 'check name or pw', nameInputData, pwInputData )
        showPwCheckFailSwal()
      } else if ( !checkPassword( pwInputData ) )
      {
        showPwCheckFailSwal()
      }
      else
      {
        console.log( 'create!', user, nameInputData, pwInputData )
        //Check if store exists
        API.checkStore( { user, storename: nameInputData, password: pwInputData } ).then( ( response ) =>
        {
          // console.log( 'checkStore', response )
          if ( response.data )
          {
            //if store exists -- error s
            console.log( 'store exists' )
            showPwCheckFailSwal()

          }
          else
          {
            //if store does not exist create store/link store to user
            console.log( 'store does not exist creating store' )
            API.createStore( { user, storename: nameInputData, password: pwInputData } ).then( ( response ) =>
            {
              API.setStore( { user, storename: nameInputData, password: pwInputData } ).then( ( response ) =>
              {
                // console.log( 'checkStore', response )
                if ( response.data )
                {
                  // if store exists, link store to user

                  console.log( 'store exists' )


                }
                else
                {
                  // if store does not exists -- error

                  console.log( 'store does not exist' )
                  showPwCheckFailSwal()
                }

              } )
            } )
          }

        } )


      }


      setNameInputData( "" )
      setPwInputData( "" )
    }
    setHandleSubmit( e => newSubmit )
    setHandleCreate( e => newCreate )

  }, [ nameInputData, pwInputData, props.user ] )



  return (

    <center>

      <FormGroup  >
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <FormLabel>store name:</FormLabel></Grid><Grid item>
            <Input type='text' value={nameInputData} onChange={( e ) => setNameInputData( e.target.value )}></Input>
          </Grid><Grid item>
            <FormLabel>store password:</FormLabel></Grid><Grid item>
            <Input type='password' value={pwInputData} onChange={( e ) => setPwInputData( e.target.value )}></Input>
          </Grid>
          <Grid container item>
            <ButtonGroup
              style={{ padding: '6px' }}
              fullWidth={false}
              color="primary"
              size="small"
              aria-label="text primary button group" justify="center"
            ><Button
              style={{ padding: '6px' }}

              color='primary' onClick={( e ) => { handleCreate( e ) }}>Create a new Store</Button>
              <Button
                style={{ padding: '6px' }}

                color='primary' onClick={( e ) => { handleSubmit( e ) }}>Link to an existing Store</Button>
            </ButtonGroup>

          </Grid>
        </Grid>

      </FormGroup >
    </center>
  )

};





export { SetStoreForm };
