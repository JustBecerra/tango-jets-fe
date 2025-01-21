import { useEffect, useState } from "react"
import Delete from "../buttons/Delete"
import { EmptyTableCard } from "../cards/EmptyTableCard"
import Edit from "../buttons/Edit"
import ModalAdd from "../modals/ModalAdd"
import ModalJetAdd from "../modals/ModalJetAdd"
import useStore from "../../store/store"

export interface Client {
	id: number
	fullname: string
	nationality: string
	email: string
	identification: string
	passport: string
	weight: string
}

export interface Airship {
	id: number
	title: string
	seats: number
	status: string
	size: string
	pricepermile: number
	images?: File[]
}

export interface Flight {
	[x: string]: any
	id: number
	launchtime: string
	to: string
	from: string
	airship_name: string
	createdby: string
	master_passenger: string
	companion_passengers: string[]
	price_cost: string
	price_revenue: number
	phase: number
	pslc: number
}

export type DataType = Flight | Airship | Client

interface TableProps {
	caseType: string
}

const TableModal = ({ caseType }: TableProps) => {
	const [data, setData] = useState<DataType[]>([])
	const [loading, setLoading] = useState(true)
	const flights = useStore((state) => state.flights)
	const clients = useStore((state) => state.clients)
	const airships = useStore((state) => state.airships)

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (caseType === "flight") {
					setData(
						flights
							.map((flight: any) => {
								const { updatedAt, ...rest } = flight
								return rest
							})
							.filter((flight: any) => {
								const launchTime = new Date(flight.launchtime)
								const currentTime = new Date()
								return currentTime < launchTime
							})
					)
				} else if (caseType === "history") {
					setData(
						flights
							.map((flight: any) => {
								const { updatedAt, ...rest } = flight
								return rest
							})
							.filter((flight: any) => flight.phase > 7)
					)
				} else if (caseType === "client") {
					setData(clients)
				} else if (caseType === "airship") {
					setData(airships)
				}
			} catch (error) {
				console.error("Failed to fetch data:", error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [caseType, flights, clients, airships])

	const handleScheduler = () => {
		window.location.href = "/Scheduler"
	}

	const buttonRetriever = () => {
		if (caseType === "flight") {
			return (
				<button
					className="block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
					type="button"
					onClick={handleScheduler}
				>
					Add Flight
				</button>
			)
		} else if (caseType === "client") {
			return <ModalAdd />
		} else {
			return <ModalJetAdd />
		}
	}

	return (
		<div className="relative overflow-x-auto overflow-y-auto max-h-[800px] w-full max-w-[100%] shadow-md sm:rounded-lg">
			{data.length > 0 ? (
				<>
					<div className="mb-2">{buttonRetriever()}</div>
					<table className="w-full text-sm text-left rtl:text-right text-gray-500 overflow-y-auto">
						<thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-400">
							<tr>
								{Object.entries(data[0]).map(
									([key, value], index) => (
										<th
											key={index}
											scope="col"
											className="px-6 py-3"
										>
											{key}
										</th>
									)
								)}

								<th scope="col" className="px-6 py-3">
									Action
								</th>
							</tr>
						</thead>
						<tbody className="overflow-y-auto">
							{data.map((singledata) => (
								<tr
									key={singledata.id}
									className="bg-white border-b cursor-pointer hover:bg-gray-200"
								>
									{Object.entries(singledata).map(
										([key, value]) => (
											<td
												key={key}
												onClick={() => {
													caseType === "flight"
														? (window.location.href = `/trip/${singledata.id}`)
														: ""
												}}
												className="px-6 py-3 whitespace-nowrap"
											>
												{value}
											</td>
										)
									)}

									<td className="px-6 py-3 flex whitespace-nowrap">
										{caseType !== "history" &&
											caseType !== "flight" && (
												<Edit
													id={singledata.id}
													caseType={caseType}
													data={singledata}
												/>
											)}
										<Delete
											id={singledata.id}
											caseType={caseType}
											setData={setData}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			) : (
				<>
					<EmptyTableCard loading={loading} />
				</>
			)}
		</div>
	)
}

export default TableModal
