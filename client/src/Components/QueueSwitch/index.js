import React from "react";
// import { Grid, Button, ButtonGroup, FormGroup, Typography, Card } from "@material-ui/core";
import API from "../../Utils/API.js"
import {
    FirebaseDatabaseNode
} from "@react-firebase/database";
const QueueSwitch = (props) => {
    let firebaseIdAuth
    props.firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
        console.log(idToken, 'idToken')
        firebaseIdAuth = idToken
    }).catch(function (error) {
        // Handle error
        console.log('err with firebase auth', error)
    });

    return (
        <center>
            <FirebaseDatabaseNode path={`/${props.curShop}/queuestatus`}>
                {(d) => {
                    let handleQueueStatus = () => {
                        if (d.value) {

                            API.setQueueStatus({ curShop: props.curShop, statusToSet: false, auth: firebaseIdAuth }).then((response) => {

                            })
                        } else {

                            API.setQueueStatus({ curShop: props.curShop, statusToSet: true, auth: firebaseIdAuth }).then((response) => {

                            })
                        }
                        props.onClick()
                    }
                    const helper = () => {
                        if (d.value) {
                            return (

                                <p onClick={handleQueueStatus}> Close Queue </p>

                            )
                        } else {
                            return (


                                <p onClick={handleQueueStatus}> Open Queue </p>

                            )
                        }
                    }
                    return (helper())
                }}

            </FirebaseDatabaseNode>
        </center >
    )

};





export { QueueSwitch };
