// import firebase
import firebase from "firebase/app";

export const loginAPI = {
	//..
	//..

	//initiate google Provider for user Login
	initGoogleProvider: () => {
		return new firebase.auth.GoogleAuthProvider();
	},

	//signIn api
	signIn: async (provider) => {
		return await firebase.auth().signInWithPopup(provider);
	},

	// get currently sign in user
	checkSignIn: async () => {
		return await firebase.auth();
	},
};
