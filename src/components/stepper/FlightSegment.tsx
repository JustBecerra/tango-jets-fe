interface FlightSegmentProps {
	departureTime: string
	departureDate: string
	departureAirport: string
	departureCity: string
	arrivalTime: string
	arrivalDate: string
	arrivalAirport: string
	arrivalCity: string
	etr: string
}

export function FlightSegment({
	departureTime,
	departureDate,
	departureAirport,
	departureCity,
	arrivalTime,
	arrivalDate,
	arrivalAirport,
	arrivalCity,
	etr,
}: FlightSegmentProps) {
	return (
		<tr className="border-b">
			<td className="py-4 pr-6">
				<div className="text-sm font-medium">{departureTime}</div>
				<div className="text-xs text-gray-500">{departureDate}</div>
			</td>
			<td className="py-4 pr-6">
				<div className="text-sm font-medium text-cyan-500">
					{departureAirport}
				</div>
				<div className="text-xs text-gray-500">{departureCity}</div>
			</td>
			<td className="py-4 pr-6">
				<div className="flex justify-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="text-gray-400"
					>
						<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
					</svg>
				</div>
			</td>
			<td className="py-4 pr-6">
				<div className="text-sm font-medium">{arrivalTime}</div>
				<div className="text-xs text-gray-500">{arrivalDate}</div>
			</td>
			<td className="py-4 pr-6">
				<div className="text-sm font-medium text-cyan-500">
					{arrivalAirport}
				</div>
				<div className="text-xs text-gray-500">{arrivalCity}</div>
			</td>
			<td className="py-4 pr-6 text-right">
				<div className="text-sm font-medium">{etr}</div>
			</td>
			<td className="py-4">
				<div className="flex gap-2 justify-end">
					<button className="p-1 text-cyan-500 hover:text-cyan-600 border-cyan-500 border-2 rounded">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
						</svg>
					</button>
					<button className="p-1 text-red-500 hover:text-red-600 border-red-500 border-2">
						<svg
							className="w-6 h-6 text-red-500"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
							/>
						</svg>
					</button>
				</div>
			</td>
		</tr>
	)
}
