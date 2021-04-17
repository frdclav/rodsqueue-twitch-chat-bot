import React, { useState, useContext } from 'react';
import { Button, Input, FormControl, InputLabel, ListItem, ListItemText } from '@material-ui/core';
import { QueueContext } from '../../Context/QueueContext';


const AddToQueueInput = (props) => {
	// const { curQueueState, setCurQueueState } = useContext(QueueContext)
	// const [curQueueState, setCurQueueState] = useState(curQueue.curQueueArr)


	const handleAddToQueue = async (event) => {
		event.preventDefault();

		console.log('HANDLE ADD TO QUEUE')
		// let newQueue = curQueueState.push(<ListItem >
		// 	<ListItemText primary="Item"></ListItemText>
		// </ListItem>)



		// setCurQueue(newQueue)
		// setCurQueueState(newQueue)
	};

	return (
		<div id="inputForm">
			<FormControl className="form-inline mb-4">
				<div className="form-group">
					<InputLabel>Add to Queue (label)</InputLabel>
					<Input
						type="text"
					// value={inputData.startPoint}
					// onChange={handleInputChange}
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