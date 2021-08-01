import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { appAPI } from "Api/API";
import { removeCart, addBillItems, removeAllPayment } from "store/action.type";
import { setDefination } from "./ExportToPDF";
import pdfMake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts.js";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const CartItem = () => {
	const { cart, billItems, userDetails } = useSelector((state) => state);
	const [tip, setTip] = useState(0);

	const dispatch = useDispatch();

	const handleRemoveItem = useCallback(
		(e, item) => {
			e.preventDefault();
			let __temp = cart.filter((value) => value.uid !== item.uid);

			dispatch(removeCart(__temp));

			appAPI.removeCartItem(item.uid);
		},
		[dispatch, cart]
	);

	const handleOrder = useCallback(
		(e) => {
			e.preventDefault();
			let objectCartData = {};

			cart.forEach((val) => {
				objectCartData[val.id] = val;
			});
			// debugger;
			billItems.forEach((val) => {
				if (objectCartData[val.id]) {
					objectCartData[val.id].count += val.count;
				} else {
					objectCartData[val.id] = val;
				}
			});

			dispatch(addBillItems(Object.values(objectCartData)));

			console.log("DDDD", objectCartData);
			appAPI.orderNow(objectCartData, userDetails?.uid);
		},
		[billItems, cart, dispatch, userDetails]
	);

	const handlePdfExport = useCallback(() => {
		if (billItems?.products?.length <= 0) return;

		let totalAmount =
			(billItems.reduce((acc, val) => {
				return acc + val.cost * val.count;
			}, 0) *
				tip) /
				100 +
			billItems.reduce((acc, val) => {
				return acc + val.cost * val.count;
			}, 0);
		let logo = `https://images.pexels.com/photos/1111371/pexels-photo-1111371.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`;
		let dd = setDefination(
			new Date().getTime(),
			new Date().toLocaleDateString(),
			billItems,
			totalAmount,
			logo,
			tip
		);

		let data = {};
		billItems.forEach((value) => {
			data[value.id] = value;
		});

		dispatch(removeAllPayment());

		appAPI.addPaymentHisory(data, userDetails?.uid);

		pdfMake.createPdf(dd).download();
	}, [billItems, tip, userDetails, dispatch]);

	return (
		<div className='row  m-0  justify-content-center align-items-center mt-5'>
			{cart.map((value, i) => (
				<div className='card col-md-5 mx-3 mb-4' key={i}>
					<div className='card-header text-center'>
						<img width='100px' src={value?.url} alt='ddd' />
					</div>
					<div className='card-body'>
						<h5 className='card-title'>{value?.name}</h5>
						<p className='card-text m-0'>{value?.description}</p>
						<p className='card-text m-0'>
							Count : x <strong>{value?.count}</strong>
						</p>
						<p className='card-text m-0'>
							Price :{" "}
							<strong> ${parseInt(value?.cost * value?.count, 10)}</strong>
						</p>
						<button
							className='btn btn-danger mt-3'
							onClick={(e) => handleRemoveItem(e, value)}>
							Remove
						</button>
					</div>
				</div>
			))}

			{cart.length <= 0 && <p> No Product Found</p>}

			<br />
			<hr />
			{cart.length > 0 && (
				<div className='d-flex justify-content-end flex-column'>
					<p className='m-0 mr-2 mb-2 text-end'>
						<strong>Total : </strong> $
						{cart.reduce((acc, val) => {
							return acc + val.cost * val.count;
						}, 0)}
					</p>

					<div className='text-end'>
						<button className=' btn btn-warning mb-3' onClick={handleOrder}>
							Order Now
						</button>
					</div>
				</div>
			)}
			<hr />
			<h3>Bill -</h3>
			<h5>Tip</h5>
			<div>
				<button
					className='btn btn-info m-2'
					style={{ border: tip === 10 ? `1px solid black` : "" }}
					onClick={() => setTip(10)}>
					10%
				</button>
				<button
					className='btn btn-warning'
					style={{ border: tip === 20 ? `1px solid black` : "" }}
					onClick={() => setTip(20)}>
					20%
				</button>
			</div>
			<hr />

			<table className='table align-middle'>
				<thead>
					<tr>
						<th scope='col'>#</th>
						<th scope='col'>Image</th>
						<th scope='col'>Food Name</th>
						<th scope='col'>Description</th>
						<th scope='col'>Cost</th>
						<th scope='col'>Count</th>
					</tr>
				</thead>
				<tbody>
					{billItems.map((value, i) => (
						<tr key={i}>
							<th>{i + 1}</th>
							<th scope='row'>
								<img width='100px' height='100px' src={value?.url} alt='ddd' />
							</th>
							<th scope='row'>{value?.name}</th>
							<th scope='row'>{value?.description}</th>

							<td>
								x <strong>{value?.count}</strong>
							</td>
							<td>${parseInt(value?.cost, 10)}</td>
						</tr>
					))}
				</tbody>
			</table>

			<br />
			<hr />

			{billItems.length > 0 && (
				<div className='d-flex justify-content-end flex-column'>
					{tip !== 0 && (
						<p className='m-0 mr-2 mb-2 text-end'>
							<strong>Tip : </strong> ${tip}%
						</p>
					)}

					<p className='m-0 mr-2 mb-2 text-end'>
						<strong>Total : </strong> $
						{(billItems.reduce((acc, val) => {
							return acc + val.cost * val.count;
						}, 0) *
							tip) /
							100 +
							billItems.reduce((acc, val) => {
								return acc + val.cost * val.count;
							}, 0)}
					</p>

					<div className='text-end'>
						<button className=' btn btn-warning mb-3' onClick={handlePdfExport}>
							Pay Now
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default CartItem;
