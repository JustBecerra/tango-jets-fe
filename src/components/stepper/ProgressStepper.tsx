const steps = [
	{
		step: 3,
		title: "Plane Selection",
	},
	{
		step: 4,
		title: "Internal Checking",
	},
	{
		step: 5,
		title: "Confirmation",
	},
	{
		step: 6,
		title: "Flight Payment",
	},
	{
		step: 7,
		title: "Payment Received",
	},
	{
		step: 8,
		title: "Post Flight Routine",
	},
]

export const ProgressStepper = ({ currentStep }: { currentStep: number }) => {
	return (
		<div className="w-[80%] h-[60px] rounded flex justify-center items-center">
			<ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg shadow-xs sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse">
				{steps.map((step, index) => (
					<li
						key={index}
						className={`flex items-center ${
							currentStep === step.step
								? "text-green-600"
								: "text-blue-600"
						}`}
					>
						<span
							className={`flex items-center justify-center w-5 h-5 me-2 text-xs border ${
								currentStep === step.step
									? "border-green-600"
									: "border-blue-600"
							} rounded-full shrink-0`}
						>
							{step.step}
						</span>
						<p className="text-xs">{step.title}</p>
						{step.step !== 8 && (
							<svg
								className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 12 10"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m7 9 4-4-4-4M1 9l4-4-4-4"
								/>
							</svg>
						)}
					</li>
				))}
			</ol>
		</div>
	)
}
