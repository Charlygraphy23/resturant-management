import React, { useCallback, useEffect, useState } from "react";
import { appAPI } from "Api/API";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "store/action.type";
import { v4 } from "uuid";

const HomePage = () => {
	const [foods, setFood] = useState([]);
	const { userDetails } = useSelector((state) => state);

	const dispatch = useDispatch();

	useEffect(() => {
		appAPI
			.getFood()
			.then((data) => {
				if (data.exists()) {
					// console.log(data.val());
					Object.values(data.val()).forEach((value) => {
						setFood((prevState) => [...prevState, value]);
					});
					// Object.
				} else {
					console.log("No data available");
					setFood([]);
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	const addToCartFun = useCallback(
		(e, cartData) => {
			let data = {
				...cartData,
				count: 1,
				userId: userDetails?.uid,
				uid: v4(),
			};

			console.log(cartData);

			dispatch(addToCart(data));

			appAPI.addToCartApi(data);
		},
		[dispatch, userDetails]
	);

	return (
		<div className='container mt-5'>
			<div className=' d-flex justify-content-center align-items-center flex-wrap '>
				{foods.map((value, i) => (
					<div
						className='card'
						style={{ width: "18rem", margin: "10px" }}
						key={i}>
						<img src={value.url} className='card-img-top' alt='images' />
						<div className='card-body'>
							<h5 className='card-title'>{value?.name}</h5>
							<p className='card-text'>{value?.description}</p>
							{userDetails && (
								<button
									className='btn btn-primary'
									onClick={(e) => addToCartFun(e, value)}>
									Add to cart
								</button>
							)}
						</div>
					</div>
				))}

				{foods.length <= 0 && <p> No Product Found</p>}
			</div>
		</div>
	);
};

export default HomePage;
