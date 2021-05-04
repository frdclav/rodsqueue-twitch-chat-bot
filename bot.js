const tmi = require( "tmi.js" );
const axios = require( "axios" );
require( "dotenv" ).config();
// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  channels: [ process.env.CHANNEL_NAME ],
};

const ID = function ()
{
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return "_" + Math.random().toString( 36 ).substr( 2, 9 );
};

// Create a client with our options
const client = new tmi.client( opts );

// Register our event handlers (defined below)
client.on( "message", onMessageHandler );
client.on( "connected", onConnectedHandler );

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler ( target, context, msg, self )
{
  if ( self )
  {
    return;
  } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.split( " " );

  // If the command is known, let's execute it
  // if (commandName === "!dice") {
  //   const num = rollDice();
  //   client.say(target, `You rolled a ${num}`);
  //   console.log(`* Executed ${commandName} command`);
  // } else

  //expecting !queue <order number from shopify>
  // if the order is found, and paid for, then we should add to the queue -- check if there are other statuses
  // if order is found but not paid for, then we should let the user know we are waiting on payment confrimation and try agian?
  // if order is not found, let the user know we did not find the order
  if ( commandName[ 0 ] === "!queue" )
  {
    console.log( `msg: ${msg}` );
    const order_id = commandName[ 1 ];
    console.log( `Checking order ${commandName[ 1 ]}` );
    const url = `https://${process.env.SHOPIFY_API}:${process.env.SHOPIFY_PASSWORD}@${process.env.SHOPIFY_SHOP}.myshopify.com/admin/api/2021-04/orders.json?status=any&name=${order_id}`;
    const sender = context.username;
    axios
      .get( url )
      .then( ( response ) =>
      {
        console.log( `status: ${response.status}` );
        // console.log(`data: ${JSON.stringify(response.data)}`);
        console.log(
          `financial_status: ${response.data.orders[ 0 ].financial_status}`
        );
        // console.log(
        //   `financial_status: ${response.data.order.financial_status}`
        // );
        const lineItems = response.data.orders[ 0 ].line_items;
        const listOfItems = lineItems.map(
          ( el ) => `${el.quantity} x ${el.name}`
        );
        client.say(
          target,
          // `${sender},I've found order_id: ${order_id}.
          //  Your items are: ${listOfItems}`
          `${sender}, I've confirmed your order. Adding you to the queue now!`
        );
        const newItem = `${sender}: ${listOfItems}`
        axios.get( `https://rodsqueue-default-rtdb.firebaseio.com/seanthenkyle/curQueueArr.json` ).then( ( res ) =>
        {
          if ( res.data )
          {
            const newArr = res.data
            newArr.push( newItem )
            axios.patch( 'https://rodsqueue-default-rtdb.firebaseio.com/seanthenkyle.json', { curQueueArr: newArr } ).then( ( response ) =>
            {
              // console.log( response )
            } )
          } else
          {
            axios.patch( 'https://rodsqueue-default-rtdb.firebaseio.com/seanthenkyle.json', { curQueueArr: [ newItem ] } ).then( ( response ) =>
            {
              // console.log( response )
            } )
          }
        } )

      } )
      .catch( ( error, response ) =>
      {
        console.log( error.response.status );
        console.log( `context: ${JSON.stringify( context )}` );
        client.say(
          target,
          `${sender}, I can't find this order_id: ${order_id}`
        );
      } );
  } else
  {
    console.log( `* Unknown command ${commandName}` );
  }
}

// Function called when the "dice" command is issued
// function rollDice() {
//   const sides = 6;
//   return Math.floor(Math.random() * sides) + 1;
// }

// Called every time the bot connects to Twitch chat
function onConnectedHandler ( addr, port )
{
  console.log( `* Connected to ${addr}:${port}` );
}
