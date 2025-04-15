interface FlightSegmentProps {
	status: "pos" | "live"
	departureTime: string
	departureDate: string
	departureAirport: string
	departureCity: string
	arrivalTime: string
	arrivalAirport: string
	arrivalCity: string
	distance: string
	etr: string
}

export function FlightSegment({
	status,
	departureTime,
	departureDate,
	departureAirport,
	departureCity,
	arrivalTime,
	arrivalAirport,
	arrivalCity,
	distance,
	etr,
}: FlightSegmentProps) {
	return (
		<tr className="border-b">
			<td className="py-4 pl-6">
				<div
					className={`text-sm font-medium ${
						status === "live" ? "text-red-500" : "text-cyan-500"
					}`}
				>
					{status}
				</div>
			</td>
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
				<div className="text-sm font-medium text-cyan-500">
					{arrivalAirport}
				</div>
				<div className="text-xs text-gray-500">{arrivalCity}</div>
			</td>
			<td className="py-4 pr-6 text-right">
				<div className="text-sm font-medium">{distance}</div>
			</td>
			<td className="py-4 pr-6 text-right">
				<div className="text-sm font-medium">{etr}</div>
			</td>
			<td className="py-4">
				<div className="flex gap-2 justify-end">
					<button className="text-cyan-500 hover:text-cyan-600">
						{/* <Pencil className="h-4 w-4" /> */}Pencil
					</button>
					<button className="text-red-500 hover:text-red-600">
						{/* <Trash2 className="h-4 w-4" /> */}Trash
					</button>
				</div>
			</td>
		</tr>
	)
}
