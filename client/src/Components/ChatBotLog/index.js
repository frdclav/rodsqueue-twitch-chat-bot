import React, { useContext, useEffect, useState } from 'react';
import { ChatBotLogContext } from '../../Context/ChatBotLogContext';

const ChatBotLog = ( props ) =>
{
    const content = useContext( ChatBotLogContext )

    useEffect( () =>
    {
        console.log( 'ChatBotLog', content.botLog )




    }, [ props ] )

    return (
        <React.Fragment>
            { content.botLog.message ? content.botLog.message.map( ( element ) =>
            {
                // console.log( 'el', element )

                return ( < p > {`${element}`
                }</p> )

            } ) : <p>n/a</p>}

            {/* <p>{`${JSON.stringify( content )}`}</p> */}
        </React.Fragment >
    )
}

export default ChatBotLog