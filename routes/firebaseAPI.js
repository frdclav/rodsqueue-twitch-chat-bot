var express = require( 'express' );
var router = express.Router();
var axios = require( 'axios' );
require( 'dotenv' )
var bcryptjs = require( 'bcryptjs' )
const ID = function ()
{
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return "_" + Math.random().toString( 36 ).substr( 2, 9 );
};
const firebaseURL = process.env.REACT_APP_FIREBASE_REST_API || 'https://rodsqueue-default-rtdb.firebaseio.com'

router.get( '/miccheck', ( req, res, next ) =>
{
  console.log( 'mic check' )
  res.send( 'mic check 1 2 1 2' )
} )





router.post( '/checkstore', ( req, res, next ) =>
{
  // console.log( 'checkstore', req.body )
  axios.get( `${firebaseURL}/${req.body.storename}.json` ).then( ( response ) => 
  {
    if ( response.data && bcryptjs.compareSync( req.body.password, response.data.password ) )
    {
      // console.log( 'found store', response.data )

      res.send( true )
    } else
    {
      // console.log( 'store does not exist' )
      res.send( false )
    }
  }
  ).catch( function ( error )
  {
    if ( error.response )
    {
      // Request made and server responded
      console.log( error.response.data );
      console.log( error.response.status );
      console.log( error.response.headers );
    } else if ( error.request )
    {
      // The request was made but no response was received
      console.log( error.request );
    } else
    {
      // Something happened in setting up the request that triggered an Error
      console.log( 'Error', error.message );
    }

  } );
} )




router.post( '/createstore', ( req, res, next ) =>
{
  axios.patch( `${firebaseURL}/${req.body.storename}.json`, { password: bcryptjs.hashSync( req.body.password, 10 ), queuestatus: false } )

    .then( ( response ) => res.send( 200 ) )
    .catch( function ( error )
    {
      if ( error.response )
      {
        // Request made and server responded
        console.log( error.response.data );
        console.log( error.response.status );
        console.log( error.response.headers );
      } else if ( error.request )
      {
        // The request was made but no response was received
        console.log( error.request );
      } else
      {
        // Something happened in setting up the request that triggered an Error
        console.log( 'Error', error.message );
      }

    } );
} )
router.post( '/setstore', ( req, res, next ) =>
{
  // console.log( 'setstore', req.body )
  axios.get( `${firebaseURL}/${req.body.storename}.json` ).then( ( response ) => 
  {
    if ( response.data && bcryptjs.compareSync( req.body.password, response.data.password ) )
    {
      axios.patch( `${firebaseURL}/users/${req.body.user}/.json`, { store: req.body.storename } ).then( ( response ) => 
      {
        // console.log( 'found store', response.data )

        res.send( true )
      }
      ).catch( function ( error )
      {
        if ( error.response )
        {
          // Request made and server responded
          console.log( error.response.data );
          console.log( error.response.status );
          console.log( error.response.headers );
        } else if ( error.request )
        {
          // The request was made but no response was received
          console.log( error.request );
        } else
        {
          // Something happened in setting up the request that triggered an Error
          console.log( 'Error', error.message );
        }

      } );

    } else
    {
      // console.log( 'store does not exist' )
      res.send( false )
    }
  }
  ).catch( function ( error )
  {
    if ( error.response )
    {
      // Request made and server responded
      console.log( error.response.data );
      console.log( error.response.status );
      console.log( error.response.headers );
    } else if ( error.request )
    {
      // The request was made but no response was received
      console.log( error.request );
    } else
    {
      // Something happened in setting up the request that triggered an Error
      console.log( 'Error', error.message );
    }

  } );

} )
router.get( '/queuestatus/:curShop', ( req, res, next ) =>
{
  const curShop = req.params.curShop
  // console.log( 'queuestatus', curShop )

  axios.get( `${firebaseURL}/${curShop}/queuestatus.json` ).then( ( response ) =>
  {
    res.send( response.data )
  }
  ).catch( function ( error )
  {
    if ( error.response )
    {
      // Request made and server responded
      console.log( error.response.data );
      console.log( error.response.status );
      console.log( error.response.headers );
    } else if ( error.request )
    {
      // The request was made but no response was received
      console.log( error.request );
    } else
    {
      // Something happened in setting up the request that triggered an Error
      console.log( 'Error', error.message );
    }

  } );
} )

router.post( '/setqueuestatus/:curShop', ( req, res, next ) =>
{
  const curShop = req.body.curShop
  const statusToSet = req.body.statusToSet
  // console.log( 'setqueuestatus', curShop, statusToSet )

  axios.patch( `${firebaseURL}/${curShop}/.json`, { queuestatus: statusToSet } ).then( ( response ) =>
  {
    res.send( response.data )
  }
  ).catch( function ( error )
  {
    if ( error.response )
    {
      // Request made and server responded
      console.log( error.response.data );
      console.log( error.response.status );
      console.log( error.response.headers );
    } else if ( error.request )
    {
      // The request was made but no response was received
      console.log( error.request );
    } else
    {
      // Something happened in setting up the request that triggered an Error
      console.log( 'Error', error.message );
    }

  } );
} )

router.post( '/addtoqueueapi', ( req, res, next ) =>
{
  const value = req.body.value
  const storename = req.body.storename
  // console.log( 'addtoqueue', storename, value )
  axios.patch( `${firebaseURL}/${storename}/.json`, {
    curQueueArr: value
  } ).then( ( response ) =>
  {
    res.send( response )
  } ).catch( ( err ) => res.send( new Error( err ) ) )
} )



// router.delete( '/removefromqueueapi/:storename/:value', ( req, res ) =>
// {
//   const value = req.params.value
//   const storeName = req.params.storename
//   axios.delete( `${firebaseURL}/seanthenkyle/curQueueArr/${value}.json` ).then( ( response ) =>
//   {
//     // console.log( 'remove', value )

//     res.send( {
//       blah: `${firebaseURL}/seanthenkyle/curQueueArr/${value}.json`,
//       res: response
//     } )
//   } ).catch( ( err ) => res.send( new Error( err ) ) )
// } )




router.post( '/checkifuserexists', ( req, res, next ) =>
{
  const value = req.body
  const url =
    axios.get( `${firebaseURL}/users/.json ? orderBy = "email" & startAt="${value}"` ).then( ( response ) =>
    {
      // console.log( 'response.data', Object.keys( response.data ).length > 0, response )
      res.send( response )
      return response.data
    } ).catch( ( err ) => res.send( new Error( err ) ) )
} )

router.post( '/createnewuser', ( req, res, next ) =>
{
  const value = req.body
  axios.get( `${firebaseURL}/users/${value.uid}.json` ).then( ( response ) =>
  {
    const snap = response.data
    // console.log( 'createNewUser', response )
    if ( snap )
    {

      res.send( response )
      return console.log( 'user already exists', response )


    } else
    {
      // console.log( 'user does not exist', response )
      axios.post( `${firebaseURL}/users/${value.uid}.json`, { value } ).then( ( response ) =>
      {
        res.send( response )
        return console.log( 'user created', response.data )
      } )
    }


  } ).catch( ( err ) => res.send( new Error( err ) ) )
} )


router.post( '/checkifuserlinkedtostore', ( req, res, next ) =>
{
  const value = req.body
  const url = `${firebaseURL}/users/${value.uid}/store.json`
  // console.log( 'url', url )
  // console.log( 'check link 1', value.uid )

  axios.get( url ).then( ( response ) =>
  {
    // console.log( 'check link 2', response.data )
    res.send( response.data )
  } ).catch( function ( error )
  {
    if ( error.response )
    {
      // Request made and server responded
      console.log( error.response.data );
      console.log( error.response.status );
      console.log( error.response.headers );
    } else if ( error.request )
    {
      // The request was made but no response was received
      console.log( error.request );
    } else
    {
      // Something happened in setting up the request that triggered an Error
      console.log( 'Error', error.message );
    }

  } );
} )


router.post( '/setstore', ( req, res, next ) =>
{
  const value = req.body
  const { store } = value
  axios.post( `${firebaseURL}/users/${value.uid}/store.json`, { store } ).then( ( response ) => { res.send( response ) } ).catch( ( err ) => res.send( new Error( err ) ) )

} )

router.get( '/clearqueue/:curShop', ( req, res, next ) =>
{
  const curShop = req.params.curShop
  axios.delete( `${firebaseURL}/${curShop}/curQueueArr/.json` ).then( ( response ) =>
  {
    // console.log( 'clearqueue for', curShop )


    res.send( {
      blah: `${firebaseURL}/${curShop}/curQueueArr/.json`,
      res: response
    } )
  } ).catch( ( err ) => res.send( new Error( err ) ) )
} )
module.exports = router;

