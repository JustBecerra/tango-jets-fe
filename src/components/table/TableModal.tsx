import { useEffect, useState } from "react"
import Delete from "../buttons/Delete"
import { EmptyTableCard } from "../cards/EmptyTableCard"
import Edit from "../buttons/Edit"
import { getFlights } from "../../../lib/actions/flights/actions"
import { getClients } from "../../../lib/actions/clients/actions"
import { getAirships } from "../../../lib/actions/airships/actions"
import ModalFlightAdd from "../modals/ModalFlightAdd"
import ModalAdd from "../modals/ModalAdd"
import ModalJetAdd from "../modals/ModalJetAdd"

export interface Client {
	id: number
	firstname: string
	lastname: string
	phonenumber: string
	email: string
	identification: string
	typeid: string
	title: string
	address: string
	company: string
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
	id: number
	launchtime: string
	arrivaltime: string
	to: string
	from: string
	airship_id: string
	createdby: string
}

type DataType = Flight | Airship | Client

interface TableProps {
	caseType: string
}

const TableModal = ({ caseType }: TableProps) => {
	const [data, setData] = useState<DataType[]>([])
	const [isHistoryPage, setIsHistoryPage] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setIsHistoryPage(window.location.pathname === "/History")

		const fetchData = async () => {
			try {
				let result: DataType[] = []

				if (caseType === "flight") {
					const flights = await getFlights()
					result = flights
						.map((flight: any) => {
							const { updatedAt, ...rest } = flight
							return rest
						})
						.filter((flight: any) => {
							const launchTime = new Date(flight.launchtime)
							const currentTime = new Date()
							return currentTime < launchTime
						})
				} else if (caseType === "client") {
					result = await getClients()
				} else if (caseType === "airship") {
					result = await getAirships()
				}

				setData(result)
			} catch (error) {
				console.error("Failed to fetch data:", error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [caseType])

	const buttonRetriever = () => {
		if (caseType === "flight") {
			return <ModalFlightAdd />
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
					<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
						<thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400">
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
						<tbody>
							{data.map((singledata) => (
								<tr
									key={singledata.id}
									className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
								>
									{Object.entries(singledata).map(
										([key, value]) => (
											<td
												key={key}
												className="px-6 py-3 whitespace-nowrap"
											>
												{value}
											</td>
										)
									)}

									<td className="px-6 py-3 flex whitespace-nowrap">
										{!isHistoryPage && (
											<Edit
												id={singledata.id}
												caseType={caseType}
												data={singledata}
											/>
										)}
										<Delete
											id={singledata.id}
											caseType={caseType}
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
