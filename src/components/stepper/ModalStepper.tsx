interface Props {
	phase: string
}

export const ModalStepper = ({ phase }: Props) => {
	return (
		<div className="p-2 rounded mb-8">
			<ol className="flex items-center w-full text-sm font-medium text-center sm:text-base ">
				<li
					className={`flex md:w-full items-center text-blue-600 
				 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}
				>
					<span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
						{phase !== "first" && (
							<svg
								className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
							</svg>
						)}
						Flight
						<span className="hidden sm:inline-flex sm:ms-2">
							Info
						</span>
					</span>
				</li>
				<li
					className={`flex md:w-full items-center ${
						phase !== "first" && "text-blue-600"
					} sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}
				>
					<span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
						{phase === "third" && (
							<svg
								className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
							</svg>
						)}
						Quote
					</span>
				</li>
				<li className="flex items-center">
					<span
						className={`flex items-center ${
							phase === "third" && "text-blue-600"
						} after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 `}
					>
						Confirmation
					</span>
				</li>
			</ol>
		</div>
	)
}
