import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';

import { WaitingQueueContext } from "../../Context/WaitingQueueContext";
import { AddToQueueInput } from "../AddToQueueInput";
// import { Link } from "react-router-dom";
import { Queue } from "../Queue";
// import { QueueSwitch } from '../QueueSwitch';
import { QueueStatus } from '../QueueStatus';
import { QueueActions } from '../QueueActions';
// import { SiteHeader } from '../SiteHeader';
import { ChatBot } from '../ChatBot';
import { ChatBotLogContext } from '../../Context/ChatBotLogContext'


const AuthedHelper = (props) => {
	// const firebase = props.firebase

	const [curQueue, setCurQueue] = useState(props.curQueue)
	const curShop = props.curShop
	const [botLog, setBotLog] = useState({})
	useEffect(() => {
		// console.log( 'curShop', curShop )
		setCurQueue(props.curQueue)
	}, [props.curQueue])
	return (
		<ChatBotLogContext.Provider value={{ botLog, setBotLog }}>

			<WaitingQueueContext.Provider value={{ curQueue, setCurQueue }}>

				<Grid container style={{ padding: '10px' }} direction="row" justify="center" alignItems="center">
					<Grid xs={3} item container style={{ padding: '10px' }}>
						<Grid item>


							<AddToQueueInput firebase={props.firebase} curShop={props.curShop} curQueue={curQueue} />



						</Grid>
						<Grid item style={{ padding: '10px' }}>

							<ChatBot></ChatBot>
						</Grid>
					</Grid>
					<Grid item style={{ padding: '10px' }}>
						<Card>
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
							</CardContent>
						</Card>
					</Grid>


				</Grid>




			</WaitingQueueContext.Provider>
		</ChatBotLogContext.Provider>
	);

};

export { AuthedHelper };