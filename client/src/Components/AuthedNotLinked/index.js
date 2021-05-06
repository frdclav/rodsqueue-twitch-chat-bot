import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import
{
	FirebaseDatabaseNode,
	FirebaseDatabaseProvider,
} from "@react-firebase/database";
import { WaitingQueueContext } from "../../Context/WaitingQueueContext";
import { AddToQueueInputContext } from "../../Context/AddToQueueInputContext";
import { Link } from "react-router-dom";
import { SetStoreForm } from '../SetStoreForm';

const AuthedNotLinked = ( props ) =>
{
	const firebase = props.firebase

	const firebaseConfig = props.firebaseConfig;
	const [ curWaitingQueueState, setCurWaitingQueueState ] = useState( {
		curQueueArr: [
			{ id: "_piaefnpiae23048", value: "Item1" },
			{ id: "_apeine93f04bnf08", value: "Item2" },
		],
	} );
	const [ curAddToQueueInputState, setCurAddToQueueInputState ] = useState( {
		in: "",
	} )
	const curShop = props.curShop

	return (

		<FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
			<FirebaseDatabaseNode path={`/${curShop}`}>
				{( d ) =>
				{
					// console.log( 'd', d.value )
					return (


						<WaitingQueueContext.Provider
							value={{ curWaitingQueueState, setCurWaitingQueueState }}
						>
							<AddToQueueInputContext.Provider
								value={{
									curAddToQueueInputState,
									setCurAddToQueueInputState,
								}}
							>
								<Grid container direction="column" justify="center" alignItems="center" >
									<Grid item> <p> you are not linked to a store</p></Grid>
									<Grid item> <SetStoreForm user={props.user}></SetStoreForm></Grid>
									<Grid item>
										<Button color="primary" onClick={() => { firebase.auth().signOut() }}>SIGN OUT!</Button>
									</Grid>
								</Grid>

							</AddToQueueInputContext.Provider>
						</WaitingQueueContext.Provider>

					);
				}
				}
			</FirebaseDatabaseNode>
		</FirebaseDatabaseProvider >
	)


};

export { AuthedNotLinked };