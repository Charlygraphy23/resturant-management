import MessageModal from "components/MessageModal";
import React, { Suspense, lazy, useEffect, useCallback } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	addModal,
	addToCart,
	addUserDetails,
	addPaymentFood,
	fetchAddCart,
} from "store/action.type";
import firebase from "firebase/app";
import { appAPI } from "Api/API";

const LoginPage = lazy(() => import("pages/LoginPage"));
const HomePage = lazy(() => import("pages/HomePage"));
const NavBar = lazy(() => import("components/navbar/Navbar"));
const AddItems = lazy(() => import("pages/AddItems"));
const CartItem = lazy(() => import("pages/CartItem"));

const PublicRoute = () => {
	const dispatch = useDispatch();
	const { userDetails } = useSelector((state) => state);

	useEffect(() => {
		// firebase.auth().onAuthStateChanged((user) => {
		// 	if (user) {
		// 		// User is signed in, see docs for a list of available properties
		// 		// https://firebase.google.com/docs/reference/js/firebase.User
		// 		var uid = user.uid;

		// 		console.log("UUI", user);
		// 		// ...
		// 	} else {
		// 		// User is signed out
		// 		// ...

		// 		console.log("Sigout");
		// 	}
		// });

		var myModalEl = document.querySelector("#messageModal");
		var modal = window.bootstrap.Modal.getOrCreateInstance(myModalEl);
		dispatch(addModal(modal));
		dispatch(addUserDetails(JSON.parse(localStorage.getItem("useInfo"))));
	}, [dispatch]);

	const getData = useCallback(async () => {
		firebase.auth().onAuthStateChanged(async (user) => {
			console.log(user);
			if (user) {
				await Promise.all([
					await appAPI.getAllCarts(),
					await appAPI.getPaymentDetails(),
				])
					.then((data) => {
						let userData = JSON.parse(localStorage.getItem("useInfo"));
						if (!userData) return;
						const cartData = data[0];
						const paymentData = data[1];

						if (cartData.exists()) {
							let val = cartData.val();

							// pushing cart by user id
							let dd = [];
							Object.values(val).forEach((temp) => {
								if (temp?.userId === userData.uid) {
									dd.push(temp);
								}
							});
							dispatch(fetchAddCart(dd));
						} else {
							console.log("no data");
						}

						if (paymentData.exists()) {
							let val = paymentData.val();
							// pushing cart by user id
							let dd = [];
							Object.values(val).forEach((temp) => {
								if (temp?.userId === userData.uid) {
									dd.push(temp);
								}
							});
							dispatch(addPaymentFood(dd));
						} else {
							console.log("no data");
						}
					})
					.catch((err) => console.error(err));
			} else {
				// User is signed out
				// ...

				console.log("Sigout");
			}
		});
	}, [dispatch]);

	useEffect(() => {
		getData();
	}, [getData, userDetails]);

	return (
		<>
			<Router>
				<Suspense fallback={<> Loading .... </>}>
					<NavBar />
					<Switch>
						<Route exact path='/' component={HomePage} />
						<Route path='/login' component={LoginPage} />
						<Route path='/add-product' component={AddItems} />
						<Route path='/cart' component={CartItem} />
					</Switch>
				</Suspense>
			</Router>
			<MessageModal />
		</>
	);
};

export default PublicRoute;
