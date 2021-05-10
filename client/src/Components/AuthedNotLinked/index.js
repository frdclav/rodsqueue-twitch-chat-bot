import React, { useState } from 'react';
import { CardHeader, Card } from '@material-ui/core';
import
{
	FirebaseDatabaseNode,
	FirebaseDatabaseProvider,
} from "@react-firebase/database";
import { WaitingQueueContext } from "../../Context/WaitingQueueContext";
import { AddToQueueInputContext } from "../../Context/AddToQueueInputContext";
import { SetStoreForm } from '../SetStoreForm';
import { SiteHeader } from '../SiteHeader';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
const theme = createMuiTheme( {
	palette: {
		primary: {
			main: '#9e9e9e',
			contrastText: '#eeeeee'
		},
		secondary: {
			main: '#bdbdbd'
		},
		text: {
			main: '#eeeeee'
		}
	},
} );
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
								<SiteHeader firebase={firebase} ></SiteHeader>
								<ThemeProvider theme={theme}>
									<center style={{ padding: '20px' }}>
										<Card style={{ display: 'inline-block', padding: '20px' }}>
											<CardHeader title={`Let's link your account to a shop`}></CardHeader>
											<SetStoreForm theme={theme} user={props.user}></SetStoreForm>


										</Card>
									</center>
								</ThemeProvider>
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