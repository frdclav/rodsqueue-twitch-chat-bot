import React from "react";
import { Typography } from "@material-ui/core";
import
{
    FirebaseDatabaseNode
} from "@react-firebase/database";
const QueueStatus = ( props ) =>
{


    return (
        <center>
            <FirebaseDatabaseNode path={`/${props.curShop}/queuestatus`}>
                {( d ) =>
                {

                    const helper = () =>
                    {
                        if ( d.value )
                        {
                            return ( <Typography variant="body1" component="h2" gutterBottom>Queue is Open</Typography> )
                        } else
                        {
                            return (

                                <Typography variant="body1" component="p" gutterBottom>Queue is CLOSED</Typography>
                            )
                        }
                    }
                    return ( helper() )
                }}

            </FirebaseDatabaseNode>
        </center >
    )

};





export { QueueStatus };
