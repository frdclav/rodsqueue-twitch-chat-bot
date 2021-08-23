import React from 'react';
import {
FirebaseDatabaseNode,
FirebaseDatabaseProvider,
} from "@react-firebase/database";
import { AuthedHelper } from '../AuthedHelper';
import { SiteHeader } from '../SiteHeader'

const Authed = (props) => {
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

				{(d) => {
					// setCurQueue( d.value )
					// console.log( 'd', d.value )
					return (
						<React.Fragment>
							<SiteHeader {...props}></SiteHeader>

							<AuthedHelper {...props} curQueue={d.value ? d.value : []}></AuthedHelper>
						</React.Fragment>
					);
				}
				}
			</FirebaseDatabaseNode>
		</FirebaseDatabaseProvider >
	)


};

export { Authed };