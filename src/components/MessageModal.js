import React from "react";
import { useSelector } from "react-redux";

const MessageModal = () => {
	const { modalMessage } = useSelector((state) => state);

	return (
		<div className='modal' id='messageModal'>
			<div className='modal-dialog modal-dialog-centered'>
				<div className='modal-content'>
					<div className='modal-header'>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'></button>
					</div>
					<div className='modal-body'>
						<p
							className={
								modalMessage?.type === "err" ? "text-danger" : "text-primary"
							}>
							{modalMessage?.message}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MessageModal;
