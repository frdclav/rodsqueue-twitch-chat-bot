// var express = require( 'express' );
// var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


const path = require( "path" );
const router = require( "express" ).Router();
const firebaseApi = require( "./firebaseAPI.js" );
const chatBotApi = require( "./chatBotAPI.js" );


// API Routes
router.use( "/firebaseApi", firebaseApi );
router.use( "/chatBotApi", chatBotApi );

// If no API routes are hit, send the React app
router.use( function ( req, res )
{
    console.log( 'ok trying tp pull react' )
    res.sendFile( path.join( __dirname, "../client/build/" ) );
} );

module.exports = router;



