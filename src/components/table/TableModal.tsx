import { useEffect, useState } from "react";
import Delete from "../buttons/Delete";
import { EmptyTableCard } from "../cards/EmptyTableCard";
import Edit from "../buttons/Edit";
import ModalAdd from "../modals/ModalAdd";
import ModalJetAdd from "../modals/ModalJetAdd";
import useStore from "../../store/store";

export interface Client {
  id: number;
  fullname: string;
  nationality: string;
  email: string;
  identification: string;
  passport: string;
  weight: string;
}

export interface Airship {
	id: number
	title: string
	seats: number
	status: string
	size: string
	description: string
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
	type_of: string
	associated_to: string
}

export type DataType = Flight | Airship | Client;

interface TableProps {
  caseType: string;
}

const TableModal = ({ caseType }: TableProps) => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);
  const flights = useStore((state) => state.flights);
  const clients = useStore((state) => state.clients);
  const airships = useStore((state) => state.airships);

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
							.map((flight: any) => {
								return {
									...flight,
									launchtime: new Date(
										flight.launchtime
									).toLocaleString("en-US", {
										month: "2-digit",
										day: "numeric",
										hour: "2-digit",
										minute: "2-digit",
										hour12: false,
									}),
									createdAt: new Date(
										flight.createdAt
									).toLocaleString("en-US", {
										month: "2-digit",
										day: "numeric",
										hour: "2-digit",
										minute: "2-digit",
										hour12: false,
									}),
								}
							})
					)
				} else if (caseType === "history") {
					setData(
						flights
							.map((flight: any) => {
								const { updatedAt, ...rest } = flight
								return rest
							})
							.filter(
								(flight: Flight) =>
									flight.phase > 7 ||
									flight.launchtime < new Date().toISOString()
							)
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

  const handleStepper = (id: number) => {
		if (caseType === "flight") window.location.href = `/trip/${id}`
  }

  const buttonRetriever = () => {
		if (caseType === "flight") {
			return (
				<button
					className="flex items-center justify-center mt-2 gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
					type="button"
					onClick={handleScheduler}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-5 h-5 text-blue-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 4v16m8-8H4"
						/>
					</svg>
					<span className="text-sm font-medium text-gray-800">
						New Trip
					</span>
				</button>
			)
		} else if (caseType === "client") {
			return <ModalAdd />
		} else if (caseType === "airship") {
			return <ModalJetAdd />
		} else {
			return <></>
		}
  }

  return (
		<div className=" w-full max-w-[100%] shadow-md sm:rounded-lg">
			{data.length > 0 ? (
				<>
					<div className="mb-2">{buttonRetriever()}</div>
					<table className="border-gray-400 w-full text-sm text-left rtl:text-right text-gray-500 overflow-y-auto">
						<thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-400">
							<tr>
								{Object.entries(data[0])
									.filter(
										([key, value]) =>
											key !== "pslc" &&
											key !== "createdAt" // chequear si son necesarios
									)
									.map(([key, value], index) => (
										<th
											key={index}
											scope="col"
											className="px-6 py-3"
										>
											{key}
										</th>
									))}

								<th scope="col" className="px-6 py-3">
									Action
								</th>
							</tr>
						</thead>
						<tbody className="overflow-y-auto">
							{data
								.map((element: any) => {
									const { pslc, createdAt, ...rest } = element
									return rest
								})
								.map((singledata: DataType) => (
									<tr
										key={singledata.id}
										className="bg-white border-b cursor-pointer hover:bg-gray-200"
									>
										{Object.entries(singledata).map(
											([key, value]) => {
												return (
													<td
														key={key}
														onClick={() =>
															handleStepper(
																singledata.id
															)
														}
														className="px-6 py-3 whitespace-nowrap"
													>
														{value}
													</td>
												)
											}
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
};

export default TableModal;
