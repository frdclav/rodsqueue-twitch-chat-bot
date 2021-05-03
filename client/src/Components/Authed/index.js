import React, { useState } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import
{
	FirebaseDatabaseNode,
	FirebaseDatabaseProvider,
} from "@react-firebase/database";
import { WaitingQueueContext } from "../../Context/WaitingQueueContext";
import { AddToQueueInputContext } from "../../Context/AddToQueueInputContext";
import { AddToQueueInput } from "../AddToQueueInput";
import { Link } from "react-router-dom";
import { Queue } from "../Queue";

const Authed = ( props ) =>
{
	const firebase = props.firebase

	const firebaseConfig = props.firebaseConfig;
	const [ curWaitingQueueState, setCurWaitingQueueState ] = useState( {
		curQueueArr: [],
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
					console.log( 'd', d.value )
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
								<Grid container direction="row" justify="space-around" alignItems="center" >
									<Grid container item direction="column" xs={3}>
										<Grid item>
											<Typography variant="h3" component="h2" gutterBottom>store: {`${curShop}`} </Typography>
										</Grid>

										<Grid item>
											<AddToQueueInput curShop={props.curShop} dbValue={d.value ? d.value : `NULL`} />

										</Grid>

										<Grid item>
											<Button color="primary" onClick={() => { firebase.auth().signOut() }}>SIGN OUT!</Button>
										</Grid>
										<Grid item>
											<Link to={`public/${curShop}`}>PUBLIC VIEW</Link>
										</Grid>
									</Grid>
									<Grid item xs={8}>
										<Queue dbValue={d.value} />
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

export { Authed };