import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';

import { WaitingQueueContext } from "../../Context/WaitingQueueContext";
import { AddToQueueInput } from "../AddToQueueInput";
import { Link } from "react-router-dom";
import { Queue } from "../Queue";
import { QueueSwitch } from '../QueueSwitch';
import { QueueStatus } from '../QueueStatus';
import { QueueActions } from '../QueueActions';


const AuthedHelper = ( props ) =>
{
	const firebase = props.firebase

	const [ curQueue, setCurQueue ] = useState( props.curQueue )
	const curShop = props.curShop

	useEffect( () =>
	{
		// console.log( 'curQueue', curQueue )
		setCurQueue( props.curQueue )
	}, [ props.curQueue ] )
	return (

		<WaitingQueueContext.Provider value={{ curQueue, setCurQueue }}>
			<Grid container direction="row-reverse" justify="center" alignItems="center">
				<Grid item style={{ padding: '10px' }}><Card>
					<CardHeader title={
						<Typography variant="h5" component="h5" gutterBottom>{`${curShop}`}
						</Typography>

					} action={
						<QueueActions curShop={curShop}></QueueActions>
					} subheader={
						<QueueStatus curShop={curShop}></QueueStatus>
					}>
					</CardHeader>
					<CardContent>
						<Queue dbValue={curQueue} curShop={curShop} />
					</CardContent></Card></Grid>
				<Grid item>
					<Card>
						<CardContent>
							<Grid container justify="space-around" alignItems="center" >
								<Grid container item direction="column" xs={3}>

									<Grid item>
										<AddToQueueInput curShop={props.curShop} curQueue={curQueue} />

									</Grid>

									<Grid item>
										<Button color="primary" onClick={() => { firebase.auth().signOut() }}>SIGN OUT!</Button>
									</Grid>
									<Grid item>
										<Link to={`public/${curShop}`}>PUBLIC VIEW</Link>
									</Grid>
								</Grid>




							</Grid>

						</CardContent>
					</Card>



				</Grid>
			</Grid>




		</WaitingQueueContext.Provider>

	);

};

export { AuthedHelper };