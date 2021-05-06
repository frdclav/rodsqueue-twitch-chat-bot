import React, { useState, useContext } from 'react';
import { Button, Input, FormControl, InputLabel, ListItem, ListItemText } from '@material-ui/core';
import { QueueContext } from '../../Context/WaitingQueueContext';
import { AddToQueueInputContext } from '../../Context/AddToQueueInputContext';


const AddToQueueInput = ( props ) =>
{
	const { curApprovedQueueState, setCurApprovedQueueState } = useContext( QueueContext )
	const { curAddToQueueInputState, setCurAddToQueueInputState } = useContext( AddToQueueInputContext )
	const [ inputData, setInputData ] = useState( '' );

	// const [curQueueState, setCurQueueState] = useState(curQueue.curQueueArr)


	const handleAddToQueue = async ( event ) =>
	{
		event.preventDefault();
		// const { name, value } = event.target;

		// console.log('HANDLE ADD TO QUEUE ', inputData)
		let newQueue = curApprovedQueueState.curQueueArr
		newQueue.push( inputData )



		// setCurQueue(newQueue)
		setCurApprovedQueueState( { curQueueArr: newQueue } )
		setInputData( '' )
	};

	const handleInputChange = ( event ) =>
	{
		const { name, value } = event.target;
		// console.log(name, value)
		setCurAddToQueueInputState( value );

		setInputData( value );
	}

	return (
		<div id="inputForm">
			<FormControl className="form-inline mb-4">
				<div className="form-group">
					<InputLabel>Add to Queue (label)</InputLabel>
					<Input
						type="text"
						value={inputData}
						onChange={handleInputChange}
					></Input>
				</div>

				<Button
					color="primary"
					onClick={handleAddToQueue}
				>
					Add To Queue
				</Button>
			</FormControl>
		</div>
	);
};

export { AddToQueueInput };