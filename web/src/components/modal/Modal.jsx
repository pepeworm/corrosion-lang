"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Modal(props) {
	const { content, isModalOpen, setIsModalOpen } = props;

	return (
		<>
			{isModalOpen && (
				<div
					className="z-[50] fixed left-0 right-0 bottom-0 top-0 bg-transparent"
					onClick={(e) => setIsModalOpen((prev) => !prev)}
				></div>
			)}

			<dialog
				open={isModalOpen ? true : false}
				className="z-[60] overscroll-contain fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 bg-bg-secondary px-6 py-6 border border-border rounded"
			>
				<div className="relative pt-10">
					<FontAwesomeIcon
						icon={faXmark}
						className="text-xl absolute top-0 right-0 cursor-pointer text-text-dangerous"
						onClick={(e) => setIsModalOpen((prev) => !prev)}
					/>
				</div>

				<div>{content}</div>
			</dialog>
		</>
	);
}
