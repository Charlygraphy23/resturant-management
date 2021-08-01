/* eslint-disable import/no-anonymous-default-export */
import {
	ADD_USER_DETAILS,
	ADD_MODAL,
	ADD_MESSAGE_MODAL,
	ADD_TO_CART,
	REMOVE_CART_ITEM,
	ADD_BILL_ITEMS,
	ADD_PAYMENT_FOODS,
	FETCH_ADD_CARTS,
	USER_LOGOUT,
	REMOVE_ALL_PAYMENT,
} from "./action.type";

let initialState = {
	userDetails: null,
	modal: null,
	modalMessage: {
		type: "",
		message: "",
	},

	cart: [],
	billItems: [],
};

export default (state = initialState, action) => {
	const {
		userDetails,
		modal,
		modalMessage,
		cartItem,
		cartRemoveItem,
		billItem,
		paymentFood,
		cartArray,
	} = action;

	switch (action.type) {
		case ADD_USER_DETAILS:
			return {
				...state,
				userDetails,
			};

		case ADD_MODAL:
			return {
				...state,
				modal,
			};
		case ADD_MESSAGE_MODAL:
			return {
				...state,
				modalMessage,
			};

		case ADD_TO_CART:
			let flag = false;
			let index = 0;
			state.cart.forEach((value, i) => {
				if (value?.id === cartItem?.id) {
					flag = true;
					index = i;
				}
			});

			if (flag) state.cart[index].count = state.cart[index].count + 1;
			else state.cart.push(cartItem);

			return {
				...state,
				cart: state.cart,
			};

		case FETCH_ADD_CARTS:
			return {
				...state,
				cart: cartArray,
			};
		case REMOVE_CART_ITEM:
			return {
				...state,
				cart: cartRemoveItem,
			};

		case ADD_BILL_ITEMS:
			return {
				...state,
				billItems: billItem,
				cart: [],
			};
		case ADD_PAYMENT_FOODS:
			return {
				...state,
				billItems: paymentFood,
			};
		case USER_LOGOUT:
			return {
				...state,
				userDetails: null,
			};
		case REMOVE_ALL_PAYMENT:
			return {
				...state,
				billItems: [],
			};

		default:
			return state;
	}
};
