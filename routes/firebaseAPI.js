var express = require( 'express' );
var router = express.Router();
var axios = require( 'axios' );

const ID = function ()
{
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return "_" + Math.random().toString( 36 ).substr( 2, 9 );
};



router.post( '/addtoqueueapi', ( req, res, next ) =>
{
  const value = req.body
  axios.post( `${process.env.REACT_APP_FIREBASE_REST_API
    }/seanthenkyle/curQueueArr.json`, {
    id: ID(),
    value
  } ).then( ( response ) =>
  {
    res.send( response )
  } )
} )



router.post( '/removefromqueueapi', ( req, res ) =>
{
  const value = req.body
  axios.delete( `${process.env.REACT_APP_FIREBASE_REST_API
    }/seanthenkyle/curQueueArr/${value}.json` ).then( ( response ) =>
    {
      res.send( response )
    } )
} )




router.post( '/checkifuserexists', ( req, res, next ) =>
{
  const value = req.body
  axios.get( `${process.env.REACT_APP_FIREBASE_REST_API
    }/users/.json?orderBy="email"&startAt="${value}"` ).then( ( response ) =>
    {
      console.log( 'response.data', Object.keys( response.data ).length > 0, response )
      res.send( response )
      return response.data
    } )
} )

router.post( '/createnewuser', ( req, res, next ) =>
{
  const value = req.body
  axios.get( `${process.env.REACT_APP_FIREBASE_REST_API}/users/${value.uid}.json` ).then( ( response ) =>
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
      axios.post( `${process.env.REACT_APP_FIREBASE_REST_API}/users/${value.uid}.json`, { value } ).then( ( response ) =>
      {
        res.send( response )
        return console.log( 'user created', response.data )
      } )
    }


  } )
} )


router.get( '/checkifuserlinkedtostore', ( req, res, next ) =>
{
  axios.get( `${process.env.REACT_APP_FIREBASE_REST_API}/users/${value.uid}/store.json` ).then( ( response ) =>
  {
    res.send( response )
  } )
} )


router.post( '/setstore', ( req, res, next ) =>
{
  const value = req.body
  const { store } = value
  axios.post( `${process.env.REACT_APP_FIREBASE_REST_API}/users/${value.uid}/store.json`, { store } ).then( ( response ) => { res.send( response ) } )

} )
module.exports = router;

