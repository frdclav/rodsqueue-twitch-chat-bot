import React from "react";
// import { Grid, Button, ButtonGroup, FormGroup, Typography, Card } from "@material-ui/core";
import API from "../../Utils/API.js"
import
{
    FirebaseDatabaseNode
} from "@react-firebase/database";
const QueueSwitch = ( props ) =>
{


    return (
        <center>
            <FirebaseDatabaseNode path={`/${props.curShop}/queuestatus`}>
                {( d ) =>
                {
                    let handleQueueStatus = () =>
                    {
                        if ( d.value )
                        {

                            API.setQueueStatus( { curShop: props.curShop, statusToSet: false } ).then( ( response ) =>
                            {

                            } )
                        } else
                        {

                            API.setQueueStatus( { curShop: props.curShop, statusToSet: true } ).then( ( response ) =>
                            {

                            } )
                        }
                        props.onClick()
                    }
                    const helper = () =>
                    {
                        if ( d.value )
                        {
                            return (

                                <p onClick={handleQueueStatus}> Close Queue </p>

                            )
                        } else
                        {
                            return (


                                <p onClick={handleQueueStatus}> Open Queue </p>

                            )
                        }
                    }
                    return ( helper() )
                }}

            </FirebaseDatabaseNode>
        </center >
    )

};





export { QueueSwitch };
