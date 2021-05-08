import React, { useState } from 'react';
import { Button, Input, FormGroup, FormLabel, ButtonGroup, Grid, Typography, Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import API from '../../Utils/API';


const UnAuthed = ( props ) =>
{
	const firebase = props.firebase

	const [ emailInput, setEmailInput ] = useState( '' );
	const [ passwordInput, setPasswordInput ] = useState( '' );
	const handleCreateAccount = () =>
	{
		firebase.auth().createUserWithEmailAndPassword( emailInput, passwordInput )
			.then( ( userCredential ) =>
			{
				// Signed in 

				var user = userCredential.user;
				// console.log( user )
				API.createNewUser( user )
				// ...
			} )
			.catch( ( error ) =>
			{
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log( errorCode, errorMessage )
				// ..
			} );
	}

	const handleLoginUser = () => 
	{
		firebase.auth().signInWithEmailAndPassword( emailInput, passwordInput )
			.then( ( userCredential ) =>
			{
				// Signed in
				var user = userCredential.user;
				// ...
				API.createNewUser( user )

			} )
			.catch( ( error ) =>
			{
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log( errorCode, errorMessage )

			} );
	}
	const handleGoogleLogin = () =>
	{
		const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup( googleAuthProvider ).then( ( userCredential ) =>
		{
			// Signed in
			var user = userCredential.user;
			// ...
			API.createNewUser( user )

		} )
			.catch( ( error ) =>
			{
				var errorCode = error.code;
				var errorMessage = error.message;
				console.error( errorCode, errorMessage )
			} );;
	}
	return (
		<center style={{ backgroundColor: "#9e9e9e", padding: '20px', height: '100%' }}>
			<Card style={{ display: 'inline-block', padding: '20px' }}>
				<CardHeader title={'r o d s q u e u e'} subheader={`login || new account`}></CardHeader>

				<CardContent>


					<FormGroup >
						<FormLabel style={{ padding: '20px' }}>email</FormLabel>
						<Input type='text' onChange={( e ) => { setEmailInput( e.target.value ) }} ></Input>
						<FormLabel style={{ padding: '20px' }}>password</FormLabel>
						<Input type='password' onChange={( e ) => { setPasswordInput( e.target.value ) }} ></Input>

					</FormGroup >

				</CardContent>
				<CardActions>
					<Button onClick={handleLoginUser} >Log In</Button>
					<Button onClick={handleCreateAccount} >Create Account</Button>
					<Button
						onClick={handleGoogleLogin}
					>
						Sign in with Google
						 </Button>
				</CardActions>
			</Card>
		</center>
	)

};

export { UnAuthed };