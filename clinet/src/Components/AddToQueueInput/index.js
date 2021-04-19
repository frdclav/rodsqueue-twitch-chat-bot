import React, { useState, useContext } from 'react';
import { Button, Input, FormControl, InputLabel } from '@material-ui/core';
import { WaitingQueueContext } from '../../Context/WaitingQueueContext';
import { AddToQueueInputContext } from '../../Context/AddToQueueInputContext';


const AddToQueueInput = (props) => {
	const { curWaitingQueueState, setCurWaitingQueueState } = useContext(WaitingQueueContext)
	const { setCurAddToQueueInputState } = useContext(AddToQueueInputContext)
	const [inputData, setInputData] = useState('');

	// const [curQueueState, setCurQueueState] = useState(curQueue.curQueueArr)


	const handleAddToQueue = async (event) => {
		event.preventDefault();
		// const { name, value } = event.target;

		console.log('HANDLE ADD TO QUEUE ', inputData)
		let newQueue = curWaitingQueueState.curQueueArr
		newQueue.push({id: ID(), value: inputData})



		// setCurQueue(newQueue)
		setCurWaitingQueueState({ curQueueArr: newQueue })
		setInputData('')
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		console.log(name, value)
		setCurAddToQueueInputState(value);

		setInputData(value);
	}

	
const ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };


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