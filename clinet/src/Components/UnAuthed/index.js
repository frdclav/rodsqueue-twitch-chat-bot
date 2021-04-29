import React, { useState, useContext } from 'react';
import { Button, Input, FormGroup, FormLabel, ButtonGroup, Grid } from '@material-ui/core';
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



		< Grid style={{ padding: '36px' }} container alignItems="center" direction="column" >
			{/* <button
          onClick={() =>
          {
            firebase
              .app()
              .auth()
              .signInAnonymously();
          }}
        >
          Sign in anonymously
        </button> */}
			<Grid item><h2>You're not signed in </h2></Grid>
			<Grid item>
				<FormGroup style={{ padding: '36px' }} >
					<h3> Sign In or Create an Account:</h3>
					<FormLabel>email</FormLabel>
					<Input type='text' onChange={( e ) => { setEmailInput( e.target.value ) }} ></Input>
					<FormLabel>password</FormLabel>
					<Input type='password' onChange={( e ) => { setPasswordInput( e.target.value ) }} ></Input>
					<ButtonGroup
						style={{ padding: '36px' }}
						fullWidth="false"
						color="primary"
						size="small"
						aria-label="text primary button group"
					><Button color='primary' onClick={handleLoginUser} >Log In</Button>
						<Button color='primary' onClick={handleCreateAccount} >Create Account</Button>
						<Button
							onClick={handleGoogleLogin}
						>
							Sign in with Google
        </Button></ButtonGroup></FormGroup ></Grid>
		</Grid >


	)

};

export { UnAuthed };