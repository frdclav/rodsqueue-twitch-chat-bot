import React, { useEffect, useState } from 'react';
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
import { AuthedHelper } from '../AuthedHelper';

const Authed = ( props ) =>
{
	const firebase = props.firebase

	const firebaseConfig = props.firebaseConfig;
	// const [ curQueue, setCurQueue ] = useState();
	// const [ curAddToQueueInputState, setCurAddToQueueInputState ] = useState( {
	// 	in: "",
	// // } )
	const curShop = props.curShop
	// useEffect( () =>
	// {
	// 	console.log( 'Authed curQueue', curQueue )
	// }, [ curQueue ] )
	return (

		<FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
			<FirebaseDatabaseNode path={`/${curShop}`}>
				{( d ) =>
				{
					// setCurQueue( d.value )
					console.log( 'd', d.value )
					return (

						<AuthedHelper {...props} curQueue={d.value}></AuthedHelper>

					);
				}
				}
			</FirebaseDatabaseNode>
		</FirebaseDatabaseProvider >
	)


};

export { Authed };