export const ADD_USER_DETAILS = "ADD_USER_DETAILS";
export const ADD_MODAL = "ADD_MODAL";
export const ADD_MESSAGE_MODAL = "ADD_MESSAGE_MODAL";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_CART_ITEM = "REMOVE_CART_ITEM";
export const ADD_BILL_ITEMS = "ADD_BILL_ITEMS";
export const ADD_PAYMENT_FOODS = "ADD_PAYMENT_FOODS";
export const FETCH_ADD_CARTS = "FETCH_ADD_CARTS";
export const USER_LOGOUT = "USER_LOGOUT";
export const REMOVE_ALL_PAYMENT = "REMOVE_ALL_PAYMENT";

export const addUserDetails = (userDetails) => {
	return {
		type: ADD_USER_DETAILS,
		userDetails,
	};
};

export const addModal = (modal) => {
	return {
		type: ADD_MODAL,
		modal,
	};
};

export const addModalMessage = (modalMessage) => {
	return {
		type: ADD_MESSAGE_MODAL,
		modalMessage,
	};
};

export const addToCart = (cartItem) => {
	return {
		type: ADD_TO_CART,
		cartItem,
	};
};
export const fetchAddCart = (cartArray) => {
	return {
		type: FETCH_ADD_CARTS,
		cartArray,
	};
};

export const removeCart = (cartRemoveItem) => {
	return {
		type: REMOVE_CART_ITEM,
		cartRemoveItem,
	};
};

export const addBillItems = (billItem) => {
	return {
		type: ADD_BILL_ITEMS,
		billItem,
	};
};
export const addPaymentFood = (paymentFood) => {
	return {
		type: ADD_PAYMENT_FOODS,
		paymentFood,
	};
};

export const userLogOut = () => {
	return {
		type: USER_LOGOUT,
	};
};

export const removeAllPayment = () => {
	return {
		type: REMOVE_ALL_PAYMENT,
	};
};
