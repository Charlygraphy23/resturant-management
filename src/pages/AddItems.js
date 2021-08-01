import { appAPI } from "Api/API";
import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addModalMessage } from "store/action.type";

const AddItems = () => {
	const dispatch = useDispatch();

	const { modal } = useSelector((state) => state);

	const [state, setState] = useState({
		name: "",
		description: "",
		url: "",
		type: "",
		cost: 0,
	});

	const handleChnage = (e) => {
		setState((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();

			appAPI
				.addFood(state)
				.then(() => {
					setState({
						name: "",
						description: "",
						url: "",
						type: "",
						cost: 0,
					});

					modal.show();
					dispatch(
						addModalMessage({ type: "sucss", message: "Successfully added!" })
					);
				})
				.catch((err) => {
					console.log(err);
					modal.show();
					addModalMessage({ type: "sucss", message: err.message });
				});
		},
		[modal, state, dispatch]
	);

	return (
		<form className='container my-5' action='#' onSubmit={handleSubmit}>
			<div className='mb-3'>
				<label for='name' className='form-label'>
					Food Name
				</label>
				<input
					id='name'
					type='text'
					className='form-control'
					onChange={handleChnage}
					value={state.name}
				/>
			</div>
			<div className='mb-3'>
				<label for='description' className='form-label'>
					Description
				</label>
				<input
					id='description'
					type='text'
					className='form-control'
					onChange={handleChnage}
					value={state.description}
				/>
			</div>
			<div className='mb-3'>
				<label for='url' className='form-label'>
					Food Url
				</label>
				<input
					id='url'
					type='text'
					className='form-control'
					onChange={handleChnage}
					value={state.url}
				/>
			</div>
			<div className='mb-3'>
				<label for='url' className='form-label'>
					Cost
				</label>
				<input
					id='cost'
					type='number'
					className='form-control'
					onChange={handleChnage}
					value={state.cost}
				/>
			</div>
			<br />
			<select
				id='type'
				value={state.type}
				className='form-select'
				onChange={handleChnage}>
				<option>select menu</option>
				<option value='veg'>Veg</option>
				<option value='non-veg'>Non-veg</option>
			</select>

			<br />
			<br />

			<button type='submit' className='btn btn-primary'>
				Submit
			</button>
		</form>
	);
};

export default AddItems;
