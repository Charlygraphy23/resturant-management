import React, { useCallback, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { loginAPI } from "Api/login";
import { useDispatch } from "react-redux";
import { addUserDetails } from "store/action.type";

const LoginPage = () => {
	const [provider, setProvider] = useState(null);

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		const __tempProvider = loginAPI.initGoogleProvider();
		__tempProvider.setCustomParameters({
			login_hint: "user@example.com",
		});
		setProvider(__tempProvider);
	}, []);

	const handleClick = useCallback(
		async (e) => {
			if (!provider) return;

			const { user } = await loginAPI.signIn(provider).catch((error) => {
				const errorMessage = error.message;
				console.error("Error message", errorMessage);
			});
			if (!user) return;

			const tempData = {
				displayName: user?.displayName,
				email: user?.email,
				emailVerified: user?.emailVerified,
				uid: user?.uid,
				refreshToken: user?.refreshToken,
				photoURL: user?.photoURL,
			};

			// console.log(user);
			localStorage.setItem("useInfo", JSON.stringify(tempData));

			dispatch(addUserDetails(tempData));
			history.push("/");
		},
		[provider, dispatch, history]
	);

	if (localStorage.getItem("useInfo")) {
		return <Redirect to='/' />;
	}

	return (
		<div
			className='d-flex justify-content-center align-items-center'
			style={{ minHeight: "calc(100vh - 56px)" }}>
			<div className='card'>
				<div className='card-body'>
					<h3>Sign In</h3>
					<br />
					<br />
					<button onClick={handleClick} className='btn btn-primary'>
						Login With Google
					</button>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
