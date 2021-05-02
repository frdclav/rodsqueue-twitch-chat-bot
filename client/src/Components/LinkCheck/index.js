import React, { useState } from 'react';

import API from "../../Utils/API";
import { Authed } from "../Authed";
import { AuthedNotLinked } from "../AuthedNotLinked";
const LinkCheck = ( props ) =>
{
	const firebase = props.firebase

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
	return ( <div>
		{ curShop ? <Authed firebase={firebase} firebaseConfig={firebaseConfig} curShop={curShop}> </Authed> : <AuthedNotLinked firebase={firebase} firebaseConfig={firebaseConfig}></AuthedNotLinked>
		}
	</div>

	)


};

export { LinkCheck };