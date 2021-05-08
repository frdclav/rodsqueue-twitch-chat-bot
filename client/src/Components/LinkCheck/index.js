import React, { useState } from 'react';

import API from "../../Utils/API";
import { Authed } from "../Authed";
import { AuthedNotLinked } from "../AuthedNotLinked";
import { SiteHeader } from '../SiteHeader';
const LinkCheck = ( props ) =>
{
	const firebase = props.firebase
	const user = props.user
	const firebaseConfig = props.firebaseConfig;

	const [ curShop, setCurShop ] = useState( '' )
	// const curShop = props.curShop
	// // const user = props.user
	// let curShop
	// let res = <AuthedNotLinked></AuthedNotLinked>
	const linkCheckHelper = ( userVal ) =>
	{

		API.checkIfUserLinkedToStore( userVal ).then( response =>
		{
			// console.log( 'checkuserlink', userVal, response )
			setCurShop( response.data )
		} ).catch( err => console.log( 'err checkuserlink', err ) )




	}
	linkCheckHelper( props.user )
	return ( <React.Fragment>
		{ curShop ? <React.Fragment>

			<Authed firebase={firebase} firebaseConfig={firebaseConfig} curShop={curShop}>
			</Authed>
		</React.Fragment>
			:

			<AuthedNotLinked user={user} firebase={firebase} firebaseConfig={firebaseConfig}></AuthedNotLinked>
		}
	</React.Fragment>

	)


};

export { LinkCheck };