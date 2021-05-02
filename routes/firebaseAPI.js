var express = require( 'express' );
var router = express.Router();
var axios = require( 'axios' );
require( 'dotenv' )

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

router.post( '/addtoqueueapi', ( req, res, next ) =>
{
  const value = req.body
  axios.post( `${firebaseURL}/seanthenkyle/curQueueArr.json`, {
    id: ID(),
    value
  } ).then( ( response ) =>
  {
    res.send( response )
  } ).catch( ( err ) => res.send( new Error( err ) ) )
} )



router.delete( '/removefromqueueapi/:value', ( req, res ) =>
{
  const value = req.params.value
  axios.delete( `${firebaseURL}/seanthenkyle/curQueueArr/${value}.json` ).then( ( response ) =>
  {
    console.log( 'remove', value )

    res.send( {
      blah: `${firebaseURL}/seanthenkyle/curQueueArr/${value}.json`,
      res: response
    } )
  } ).catch( ( err ) => res.send( new Error( err ) ) )
} )




router.post( '/checkifuserexists', ( req, res, next ) =>
{
  const value = req.body
  axios.get( `${firebaseURL}/users/.json?orderBy="email"&startAt="${value}"` ).then( ( response ) =>
  {
    console.log( 'response.data', Object.keys( response.data ).length > 0, response )
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
    console.log( 'createNewUser', response )
    if ( snap )
    {

      res.send( response )
      return console.log( 'user already exists', response )


    } else
    {
      console.log( 'user does not exist', response )
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
  // console.log( 'url', firebaseURL )
  // console.log( 'check link 1', value.uid )

  axios.get( `${firebaseURL}/users/${value.uid}/store.json` ).then( ( response ) =>
  {
    // console.log( 'check link', response )
    res.send( response.data )
  } ).catch( ( err ) => res.send( new Error( err ) ) )
} )


router.post( '/setstore', ( req, res, next ) =>
{
  const value = req.body
  const { store } = value
  axios.post( `${firebaseURL}/users/${value.uid}/store.json`, { store } ).then( ( response ) => { res.send( response ) } ).catch( ( err ) => res.send( new Error( err ) ) )

} )
module.exports = router;

