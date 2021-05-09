import { Card, CardActions, CardContent, CardHeader, Button } from '@material-ui/core';
import { render } from 'jade';
import React, { useContext, useEffect, useState } from 'react';
import { ChatBotLogContext } from '../../Context/ChatBotLogContext';
import ChatBotLog from '../ChatBotLog'
const tmi = require( "tmi.js" );
const axios = require( "axios" );



const ChatBot = ( props ) => 
{
    // Define configuration options
    const opts = {
        identity: {
            username: props.bot_username,
            password: props.oauth_token,
        },
        channels: [ props.channel_name ],
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



    //state to track if bot is on or off
    const [ botState, setBotState ] = useState( false )

    // Connect to Twitch:
    const connectToClient = () =>
    {
        addToBotLog( botState )
        if ( botState )
        {
            addToBotLog( 'Bot is already on' )
        }
        else
        {
            client.connect().then( ( data ) =>
            {
                // Register our event handlers (defined below)
                client.on( "message", onMessageHandler );
                client.on( "connected", onConnectedHandler );
                setBotState( true )
            } ).catch( ( err ) =>
            {
                addToBotLog( 'connectToClient err', err )
            } );;

        }


    }

    // disconnect from Twitch:
    const disconnectToClient = () =>
    {
        addToBotLog( botState )

        if ( botState ) 
        {
            client.disconnect().then( ( data ) =>
            {
                setBotState( false )

            } ).catch( ( err ) =>
            {
                addToBotLog( 'disconnectToClient err', err )
            } );;
        }
        else 
        {
            addToBotLog( 'Bot is already off' )
        }


    }

    const { botLog, setBotLog } = useContext( ChatBotLogContext )
    const addToBotLog = ( message ) =>
    {
        console.log( 'addToBotLog', message, botLog )
        const newBotLog = botLog
        newBotLog.push( message )
        console.log( 'addToBotLog new', message, newBotLog )

        setBotLog( newBotLog )
    }

    // Called every time a message comes in
    const onMessageHandler = ( target, context, msg, self ) =>
    {

        if ( self )
        {
            return;
        } // Ignore messages from the bot

        // Remove whitespace from chat message
        const commandName = msg.split( " " );

        // If the command is known, let's execute it

        const sender = context.username;
        //expecting !queue <order number from shopify>
        // if the order is found, and paid for, then we should add to the queue -- check if there are other statuses
        // if order is found but not paid for, then we should let the user know we are waiting on payment confrimation and try agian?
        // if order is not found, let the user know we did not find the order
        if ( commandName[ 0 ] === "!queue" )
        {
            addToBotLog( `msg: ${msg}` );
            const order_id = commandName[ 1 ];
            axios.get( `https://rodsqueue-default-rtdb.firebaseio.com/seanthenkyle/queuestatus.json` ).then( ( response ) =>
            {
                addToBotLog( 'queuestatus', response.data )
                if ( !response.data )
                {
                    client.say(
                        target,
                        // `${sender},I've found order_id: ${order_id}.
                        //  Your items are: ${listOfItems}`
                        `${sender}, the queue is closed!`
                    );
                }
                else
                {

                    addToBotLog( `Checking order ${commandName[ 1 ]}` );
                    //Check current queue if order already exists
                    const currentQueueUrl = `https://rodsqueue-default-rtdb.firebaseio.com/seanthenkyle/curQueueArr.json`
                    axios.get( currentQueueUrl ).then(
                        ( response ) =>
                        {
                            const currentQueue = response.data
                            const found = currentQueue.find( element => element.order_id && element.order_id === commandName[ 1 ] )
                            if ( found )
                            {
                                client.say(
                                    target,
                                    // `${sender},I've found order_id: ${order_id}.
                                    //  Your items are: ${listOfItems}`
                                    `${sender}, Your position in the queue is ${currentQueue.indexOf( found )}.`
                                ).catch( ( error, response ) =>
                                {
                                    addToBotLog( error.response.status );
                                    addToBotLog( `error on checking currentQueueUrl context: ${JSON.stringify( context )}` );
                                    // client.say(
                                    //   target,
                                    //   `${sender}, I can't find this order_id: ${order_id}`
                                    // );
                                } );
                            }
                            else 
                            {
                                const url = `https://${process.env.SHOPIFY_API}:${process.env.SHOPIFY_PASSWORD}@${process.env.SHOPIFY_SHOP}.myshopify.com/admin/api/2021-04/orders.json?status=any&name=${order_id}`;

                                axios
                                    .get( url )
                                    .then( ( response ) =>
                                    {
                                        addToBotLog( `status: ${response.status}` );
                                        // console.log(`data: ${JSON.stringify(response.data)}`);
                                        addToBotLog(
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
                                        const newItem = {
                                            id: ID(), order_id: order_id, message: `${sender}: ${listOfItems}`
                                        }
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
                                        addToBotLog( error.response.status );
                                        addToBotLog( `context: ${JSON.stringify( context )}` );
                                        client.say(
                                            target,
                                            `${sender}, I can't find this order_id: ${order_id}`
                                        );
                                    } );
                            }
                        }
                    )







                }
            } ).catch( ( error, response ) =>
            {
                // console.log( error.response.status );
                addToBotLog( `context: ${JSON.stringify( error )}` );

            } );

        }
        // my giveaway burner logic - essentially, if we count 10 people run the play command, the bot also plays. 
        // TODO: figure out a way to reset the counter after a marbles game is run
        // else if ( commandName[ 0 ] === "!play" ) 
        // {
        //     console.log( playCounter, 'play before' )

        //     playCounter++

        //     console.log( playCounter, 'play after' )
        //     if ( playCounter === 10 )
        //     {
        //         client.say(
        //             target,
        //             `!play`
        //         );

        //     }

        // }
        // leaving in the dice command
        else if ( commandName[ 0 ] === "!dice" )
        {
            const sides = isNaN( commandName[ 1 ] ) ? 6 : commandName[ 1 ]
            addToBotLog( sides )
            const num = rollDice( sides );
            addToBotLog( num )
            client.say( target, `${sender}, you rolled a ${num}` );
            addToBotLog( `* Executed ${commandName} command` );
        } else
        {
            addToBotLog( `* Unknown command ${commandName}` );
        }

    }

    const rollDice = ( sides ) =>
    {
        // const sides = 6;
        console.log( 'rolling d', sides )
        return Math.floor( Math.random() * sides ) + 1;
    }

    // Called every time the bot connects to Twitch chat
    const onConnectedHandler = ( addr, port ) => 
    {
        addToBotLog( `* Connected to ${addr}:${port}` );
    }
    // let renderTheLog = () =>
    // {
    //     return
    //     <ChatBotLog content={botLog}></ChatBotLog>

    // }
    useEffect( () =>
    {
        console.log( 'botLog', botLog )

    }, [ botLog ] )


    return (
        <Card>
            <CardHeader title={`ChatBot`}></CardHeader>
            <CardActions>
                {botState ?
                    <Button onClick={() => { console.log( 'foo' ) }}>Disconnect ChatBot</Button>
                    :
                    <Button onClick={() => { addToBotLog( 'bar' ) }} >Connect ChatBot</Button>

                }


            </CardActions >
            <CardContent>
                <ChatBotLog ></ChatBotLog>
            </CardContent>

        </Card >


    )
}


export { ChatBot };
