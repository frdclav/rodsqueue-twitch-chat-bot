import React from 'react';
import { Button, Input, FormControl, InputLabel } from '@material-ui/core';
// import API from '../../utils/API';
// import './style.css';
// import Directions from '../../utils/Directions';

// import { CurrentUserIdContext } from '../../Context/CurrentUserIdContext';
// import { UserLoggedInContext } from '../../Context/UserLoggedInContext';
// import { RouteContext } from '../../Context/RouteContext';
// import { SearchInputContext } from '../../Context/SearchInputContext';

const AddToQueueInput = (props) => {
	// const { currentUserId } = useContext(CurrentUserIdContext);
	// const { userLoggedIn } = useContext(UserLoggedInContext);
	// const { setRoute } = useContext(RouteContext);
	// const { searchInput, setSearchInput } = useContext(SearchInputContext);

	// const [inputData, setInputData] = useState(searchInput);
	// const handleInputChange = (event) => {
	// 	const { name, value } = event.target;

	// 	setSearchInput({
	// 		...inputData,
	// 		[name]: value
	// 	});

	// 	setInputData(searchInput);
	// };
	// useEffect(() => setInputData(searchInput));

	const handleAddToQueue = async (event) => {
        console.log('HANDLE ADD TO QUEUE')
		// event.preventDefault();

		// const start = await Directions.getCoords(inputData.startPoint);
		// const end = await Directions.getCoords(inputData.endPoint);
		// const newRoute = await Directions.getRoute(start, end);
		// setRoute(newRoute);

		// if (userLoggedIn) {
		// 	const apiInputData = {
		// 		start: inputData.startPoint,
		// 		end: inputData.endPoint,
		// 		userId: currentUserId
		// 	};

		// 	API.userInput(apiInputData)
		// 		.then((data) => {
		// 			if (data.data.message === 'Success') {
		// 				console.log(`Added to search history`);
		// 			} else if (data.data.message === 'Search exists!') {
		// 				console.log(data.data.message);
		// 			} else {
		// 				console.log(data.data.message);
		// 				console.log(data.data.message);
		// 			}
		// 		})
		// 		.catch((err) => console.log(err));
		// }
	};

	return (
		<div  id="inputForm">
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
					color ="primary"
					onClick={handleAddToQueue}
				>
					Add To Queue
				</Button>
			</FormControl>
		</div>
	);
};

export { AddToQueueInput };
// export { RouteContext };
