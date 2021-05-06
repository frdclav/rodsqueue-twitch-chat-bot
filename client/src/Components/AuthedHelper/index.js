import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';

import { WaitingQueueContext } from "../../Context/WaitingQueueContext";
import { AddToQueueInput } from "../AddToQueueInput";
import { Link } from "react-router-dom";
import { Queue } from "../Queue";

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


			<Grid container direction="row" justify="space-around" alignItems="center" >
				<Grid container item direction="column" xs={3}>
					<Grid item>
						<Typography variant="h3" component="h2" gutterBottom>store: {`${curShop}`} </Typography>
					</Grid>

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
				<Grid item xs={8}>
					<Queue dbValue={curQueue} curShop={curShop} />
				</Grid>



			</Grid>
		</WaitingQueueContext.Provider>

	);

};

export { AuthedHelper };