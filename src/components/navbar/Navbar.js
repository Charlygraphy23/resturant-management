import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogOut } from "store/action.type";

const Navbar = () => {
	const { userDetails, cart } = useSelector((state) => state);
	const dispatch = useDispatch();

	const handleLogout = useCallback(() => {
		localStorage.removeItem("useInfo");
		localStorage.clear();

		dispatch(userLogOut());
	}, [dispatch]);

	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light px-4'>
			<div className='container-fluid'>
				<Link className='navbar-brand' to='/'>
					Restaurant
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div
					className='collapse navbar-collapse justify-content-end'
					id='navbarNav'>
					<ul className='navbar-nav'>
						{userDetails ? (
							<>
								<Link to='/cart'>
									<div className='d-flex justify-content-center align-items-center mx-3 cart'>
										<span>{cart.length}</span>
										<i
											className='bi bi-bag-check-fill'
											style={{ fontSize: "1.5rem" }}></i>
									</div>
								</Link>
								<li className='nav-item dropdown'>
									<img
										id='navbarDropdownMenuLink'
										role='button'
										data-bs-toggle='dropdown'
										aria-expanded='false'
										className='dropdown-toggle'
										width='40'
										src={userDetails?.photoURL}
										alt='logo'
										style={{ borderRadius: "50%" }}
									/>
									<ul
										className='dropdown-menu'
										aria-labelledby='navbarDropdownMenuLink'>
										<li onClick={handleLogout}>
											<Link className='dropdown-item' to='/'>
												Log out
											</Link>
										</li>
									</ul>
								</li>
							</>
						) : (
							<li className='nav-item'>
								<Link className='nav-link' to='/login'>
									Login
								</Link>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
