export const VerticalStepper = () => {
	return (
		<ol className="space-y-4 w-72">
			<li>
				<div
					className="w-full p-4 text-green-700 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:border-green-800 dark:text-green-400"
					role="alert"
				>
					<div className="flex items-center justify-between">
						<span className="sr-only">User info</span>
						<h3 className="font-medium">1. User info</h3>
						<svg
							className="w-4 h-4"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 16 12"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M1 5.917 5.724 10.5 15 1.5"
							/>
						</svg>
					</div>
				</div>
			</li>
			<li>
				<div
					className="w-full p-4 text-green-700 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:border-green-800 dark:text-green-400"
					role="alert"
				>
					<div className="flex items-center justify-between">
						<span className="sr-only">Account info</span>
						<h3 className="font-medium">2. Account info</h3>
						<svg
							className="w-4 h-4"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 16 12"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M1 5.917 5.724 10.5 15 1.5"
							/>
						</svg>
					</div>
				</div>
			</li>
			<li>
				<div
					className="w-full p-4 text-blue-700 bg-blue-100 border border-blue-300 rounded-lg dark:bg-gray-800 dark:border-blue-800 dark:text-blue-400"
					role="alert"
				>
					<div className="flex items-center justify-between">
						<span className="sr-only">Social accounts</span>
						<h3 className="font-medium">3. Social accounts</h3>
						<svg
							className="rtl:rotate-180 w-4 h-4"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 14 10"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M1 5h12m0 0L9 1m4 4L9 9"
							/>
						</svg>
					</div>
				</div>
			</li>
			<li>
				<div
					className="w-full p-4 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
					role="alert"
				>
					<div className="flex items-center justify-between">
						<span className="sr-only">Review</span>
						<h3 className="font-medium">4. Review</h3>
					</div>
				</div>
			</li>
			<li>
				<div
					className="w-full p-4 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
					role="alert"
				>
					<div className="flex items-center justify-between">
						<span className="sr-only">Confirmation</span>
						<h3 className="font-medium">5. Confirmation</h3>
					</div>
				</div>
			</li>
		</ol>
	)
}
