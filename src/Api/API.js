// import firebase
import firebase from "firebase";
import { v4 } from "uuid";
// const database = firebase.database();

export const appAPI = {
	//..
	//..

	//  add food to db
	addFood: ({ name, description, url, type, cost }) => {
		let id = v4();
		return firebase
			.database()
			.ref("food/" + id)
			.set({
				name,
				description,
				url,
				type,
				id,
				cost,
			});
	},

	getFood: () => {
		const dbRef = firebase.database().ref();
		return dbRef.child("food/").get();
	},

	addToCartApi: async (foodDetails) => {
		const dbRef = firebase.database().ref();
		let cartData = await dbRef.child("cart/").get();

		if (cartData.exists()) {
			let __tempData = null;

			for (let i in cartData.val()) {
				if (
					cartData.val()[i].id === foodDetails.id &&
					cartData.val()[i].userId === foodDetails.userId
				) {
					__tempData = cartData.val()[i];
				}
			}
			// console.log("DDD", __tempData);

			if (!__tempData) {
				// if food not in the cart
				return addToCartFood(foodDetails);
			}

			__tempData.count += 1;
			__tempData.ordered = false;
			__tempData.paid = false;
			var updates = {};

			updates["/cart/" + __tempData?.uid] = __tempData;
			return firebase
				.database()
				.ref()
				.update(updates)
				.catch((err) => console.error(err));
		} else {
			return addToCartFood(foodDetails);
		}
	},

	getAllCarts: () => {
		const dbRef = firebase.database().ref();
		return dbRef.child("cart/").get();
	},

	removeCartItem: async (removeItemId) => {
		console.log(removeItemId);

		// const dbRef = firebase.database().ref();
		// let data = await dbRef.child("cart/").get();

		// if (data.exists()) {
		// 	for (let i in data.val()) {
		// 		if (data.val()[i].id === removeItemId) {
		// 			console.log("dDEEE", data.val()[i]);
		// 			firebase
		// 				.database()
		// 				.ref("cart/" + data.val()[i].id)
		// 				.set(null);
		// 		}
		// 	}
		// }

		let dbRef = firebase
			.database()
			.ref("cart/" + removeItemId)
			.set(null)
			.catch((err) => console.error(err));

		return dbRef;
	},

	orderNow: async (foodsObject, userId) => {
		// remove all items from cart
		// debugger;

		const dbRef = firebase.database().ref();
		let data = await dbRef.child("cart/").get();

		if (data.exists()) {
			for (let i in data.val()) {
				if (data.val()[i].userId === userId) {
					firebase
						.database()
						.ref("cart/" + data.val()[i].uid)
						.set(null);
				}
			}
		}

		const dbRef2 = firebase.database().ref();
		let cartData = await dbRef2.child("payment/").get();

		if (cartData.exists()) {
			for (let i in cartData.val()) {
				if (cartData.val()[i].userId === userId) {
					firebase
						.database()
						.ref("payment/" + cartData.val()[i].uid)
						.set(null);
				}
			}
		}
		return await addToCartPayment(foodsObject, userId).catch((error) =>
			console.error(error)
		);
	},

	getPaymentDetails: () => {
		const dbRef = firebase.database().ref();
		return dbRef.child("payment/").get();
	},

	addPaymentHisory: async (payment, userId) => {
		const dbRef = firebase.database().ref();
		let data = await dbRef.child("payment/").get();

		if (data.exists()) {
			for (let i in data.val()) {
				if (data.val()[i].userId === userId) {
					firebase
						.database()
						.ref("payment/" + data.val()[i].id)
						.set(null);
				}
			}
		}

		// await firebase
		// 	.database()
		// 	.ref("payment/")
		// 	.set(null)
		// 	.catch((error) => console.error(error));

		var updates = {};
		var uid = v4();
		for (let i in payment) {
			payment[i].ordered = true;
			payment[i].payment = true;
			payment[i].userId = userId;
			payment[i].uid = uid;
			updates["/history/" + uid] = payment[i];
		}

		return firebase
			.database()
			.ref()
			.update(updates)
			.catch((err) => console.error(err));
	},
};

const addToCartFood = async (foodDetails) => {
	foodDetails.ordered = false;
	foodDetails.paid = false;
	let uid = v4();
	// foodDetails.uid = uid;
	return await firebase
		.database()
		.ref("cart/" + foodDetails.uid)
		.set(foodDetails)
		.catch((err) => console.error(err));
};
const addToCartPayment = async (foodDetails, userId) => {
	var updates = {};

	// console.log("uuuu", foodDetails);
	for (let i in foodDetails) {
		let uid = v4();
		foodDetails[i].ordered = true;
		foodDetails[i].userId = userId;
		foodDetails[i].uid = uid;
		updates["/payment/" + uid] = foodDetails[i];
	}

	return firebase
		.database()
		.ref()
		.update(updates)
		.catch((err) => console.error(err));
};
