import { useMemo, useState } from "react"
import type { Flight } from "../table/TableModal"
import LoaderSpinner from "../Loaders/LoaderSpinner"

interface props {
	flights: Flight[]
}

const DepartingSoon = ({ flights }: props) => {
	const formatLaunchTime = (launchtime: string) => {
		const date = new Date(launchtime)
		return date.toLocaleString("en-US", {
			month: "short",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		})
	}

	const filteredFlights = useMemo(() => {
		const now = new Date()
		const fiveDaysFromNow = new Date(now)
		fiveDaysFromNow.setDate(now.getDate() + 5)

		return flights.filter((flight) => {
			const launchDate = new Date(flight.launchtime)
			return launchDate > now && launchDate <= fiveDaysFromNow
		})
	}, [flights])

	return (
		<div className="h-full overflow-y-auto rounded-lg shadow-lg scrollbar-hide">
			<table
				className={`min-w-full divide-y divide-gray-200 ${
					flights.length === 0 && "h-[300px]"
				} `}
			>
				<thead className="bg-gray-50 sticky top-0 z-10">
					<tr>
						<th
							colSpan={4}
							className="px-3 py-2 text-center font-semibold text-gray-700 uppercase tracking-wider text-sm"
						>
							🛫Departing soon
						</th>
					</tr>
					<tr>
						<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
							Airship
						</th>
						<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
							From - To
						</th>
						<th className="px-6 py-3 hidden md:table-cell text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
							Time
						</th>
					</tr>
				</thead>
				<tbody className="bg-white w-full h-full divide-y divide-gray-200 rounded-b-lg">
					{flights.length === 0 ? (
						<tr className="h-full">
							<td className="h-full" colSpan={3}>
								<div className="flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
									<LoaderSpinner />
								</div>
							</td>
						</tr>
					) : (
						filteredFlights.map((flight) => (
							<tr
								key={flight.id}
								className="bg-white border-b cursor-pointer hover:bg-gray-200"
								onClick={() =>
									(window.location.href = `/trip/${flight.id}`)
								}
							>
								<td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900">
									{flight.airship_name}
								</td>
								<td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-700">
									{flight.from}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="inline-block w-4 h-4 mx-1 text-gray-500"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path d="M13.5 4.5a1 1 0 011.41 0l6 6a1 1 0 010 1.41l-6 6a1 1 0 01-1.41-1.41L17.59 12H4a1 1 0 010-2h13.59l-4.09-4.09a1 1 0 010-1.41z" />
									</svg>
									{flight.to}
								</td>
								<td className="px-6 py-4 hidden md:table-cell text-center whitespace-nowrap text-sm text-gray-700">
									{formatLaunchTime(flight.launchtime)}
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	)
}

export default DepartingSoon
