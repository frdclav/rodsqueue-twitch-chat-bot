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
			console.log( userVal, response )
			setCurShop( response.data )
		} )




	}
	linkCheckHelper( props.user )
	return ( <div>
		{ curShop ? <Authed firebase={firebase} firebaseConfig={firebaseConfig} curShop={curShop}> </Authed> : <AuthedNotLinked></AuthedNotLinked>
		}
	</div>

	)


};

export { LinkCheck };