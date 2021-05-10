import React, { useState, useEffect } from "react";
import { Grid, Button, Input, FormLabel, FormGroup, CardContent, CardActions } from "@material-ui/core";
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

  const [ handleSubmit, setHandleSubmit ] = useState( ( e ) => { } )
  const [ handleCreate, setHandleCreate ] = useState( ( e ) => { } )


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
        // console.log( 'submit!', user, nameInputData, pwInputData )
        // check if store exists
        API.setStore( { user, storename: nameInputData, password: pwInputData } ).then( ( response ) =>
        {
          // console.log( 'checkStore', response )
          if ( response.data )
          {
            // if store exists, link store to user

            // console.log( 'store exists' )


          }
          else
          {
            // if store does not exists -- error

            // console.log( 'store does not exist' )
            showPwCheckFailSwal()
          }

        } )
      }



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
        // console.log( 'create!', user, nameInputData, pwInputData )
        //Check if store exists
        API.checkStore( { user, storename: nameInputData, password: pwInputData } ).then( ( response ) =>
        {
          // console.log( 'checkStore', response )
          if ( response.data )
          {
            //if store exists -- error s
            // console.log( 'store exists' )
            showPwCheckFailSwal()

          }
          else
          {
            //if store does not exist create store/link store to user
            // console.log( 'store does not exist creating store' )
            API.createStore( { user, storename: nameInputData, password: pwInputData } ).then( ( response ) =>
            {
              API.setStore( { user, storename: nameInputData, password: pwInputData } ).then( ( response ) =>
              {
                // console.log( 'checkStore', response )
                if ( response.data )
                {
                  // if store exists, link store to user

                  // console.log( 'store exists' )


                }
                else
                {
                  // if store does not exists -- error

                  // console.log( 'store does not exist' )
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

  // const classes = useStyles()
  // const theme = props.theme
  return (
    <center >
      <CardContent > <FormGroup  >
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <FormLabel>store name:</FormLabel></Grid><Grid item>
            <Input type='text' value={nameInputData} onChange={( e ) => setNameInputData( e.target.value )}></Input>
          </Grid><Grid item>
            <FormLabel>store password:</FormLabel></Grid><Grid item>
            <Input type='password' value={pwInputData} onChange={( e ) => setPwInputData( e.target.value )}></Input>
          </Grid>
        </Grid>
      </FormGroup >
      </CardContent>

      <CardActions><Button
        style={{ padding: '6px' }}

        onClick={( e ) => { handleCreate( e ) }}>Create a new Store</Button>
        <Button
          style={{ padding: '6px' }}

          onClick={( e ) => { handleSubmit( e ) }}>Link to an existing Store</Button></CardActions>



    </center >
  )

};





export { SetStoreForm };
