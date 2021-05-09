import React, { useContext, useEffect, useState } from 'react';
import { ChatBotLogContext } from '../../Context/ChatBotLogContext';

const ChatBotLog = ( props ) =>
{
    const content = useContext( ChatBotLogContext )

    useEffect( () =>
    {
        console.log( 'ChatBotLog', content.botLog )




    } )

    return (
        <React.Fragment>
            { content.botLog.length > 0 && content.botLog.map( element => <p>{`${element}`}</p> )}
        </React.Fragment>
    )
}

export default ChatBotLog