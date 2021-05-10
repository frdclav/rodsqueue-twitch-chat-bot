import { Card, CardActions, CardContent, CardHeader, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
// import { ChatBotLogContext } from '../../Context/ChatBotLogContext';
import API from '../../Utils/API';
// import ChatBotLog from '../ChatBotLog'
// const tmi = require( "tmi.js" );
// const axios = require( "axios" );



const ChatBot = ( props ) => 
{




    //state to track if bot is on or off
    const [ botState, setBotState ] = useState( {} )
    useEffect( () =>
    {
        API.chatBotStatus().then( ( response ) =>
        {
            console.log( response.data )
            setBotState( { ...botState, bool: response.data } )
            // console.log( botState )
        } )
    }, [] )

    // Connect to Twitch:
    const connectToClient = () =>
    {

        API.chatBotConnect().then( ( response ) => 
        {
            // console.log( `connectToChatBotClient: ${JSON.stringify( response )}` )
            setBotState( { ...botState, bool: true } )

        }
        )
    }


    // disconnect from Twitch:
    const disconnectToClient = () =>
    {

        API.chatBotDisconnect().then( ( response ) => 
        {
            // console.log( `disconnectFromChatBotClient: ${JSON.stringify( response )}` )
            setBotState( { ...botState, bool: false } )

        }
        )
    }

    // const { botLog, setBotLog } = useContext( ChatBotLogContext )




    return (
        <Card>
            <CardHeader title={`ChatBot`}></CardHeader>
            <CardActions>
                {

                    botState.bool ?
                        <Button onClick={disconnectToClient}>Disconnect ChatBot</Button>
                        :
                        <Button onClick={connectToClient} >Connect ChatBot</Button>
                }


            </CardActions >
            <CardContent>
                {/* <ChatBotLog ></ChatBotLog> */}
            </CardContent>

        </Card >


    )
}


export { ChatBot };
