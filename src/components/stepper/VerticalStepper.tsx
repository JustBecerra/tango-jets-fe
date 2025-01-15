interface props {
	phase: number
}

const steps = [
	{
		step: 1,
		title: "First Contact",
	},
	{
		step: 2,
		title: "Quote Creation",
	},
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

const logoDecider = ({ phase, step }: { phase: number; step: number }) => {
	if (phase > step) {
		return (
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
		)
	} else if (phase === step) {
		return (
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
		)
	} else {
		return <></>
	}
}

export const VerticalStepper = ({ phase }: props) => {
	return (
		<ol className="space-y-4 w-72">
			{steps.map(
				({ step, title }: { step: number; title: string }, index) => (
					<li key={index}>
						<div
							className={`w-full p-4 ${
								phase > step &&
								"text-green-400 border-green-800 bg-green-800"
							} border rounded-lg ${
								phase < step &&
								"bg-gray-800 border-gray-700 text-gray-400"
							}
                            ${
								phase === step &&
								"bg-gray-800 border-blue-800 text-blue-400"
							}
                        `}
							role="alert"
						>
							<div className="flex items-center justify-between">
								<h3 className="font-medium">
									{step} {title}
								</h3>
								{logoDecider({ phase, step })}
							</div>
						</div>
					</li>
				)
			)}
		</ol>
	)
}
