import { useEffect, useState } from "react";
import Delete from "../buttons/Delete";
import { EmptyTableCard } from "../cards/EmptyTableCard";
import Edit from "../buttons/Edit";
import ModalAdd from "../modals/ModalAdd";
import ModalJetAdd from "../modals/ModalJetAdd";
import useStore from "../../store/store";
import Pagination from "../Pagination/Pagination";
import ColumnToggles from "../checkboxTables/ColumnToggles";
import ViewFlightInfo from "../modals/ViewFlightInfo";

export interface Client {
	id: number
	fullname: string
	nationality: string
	email: string
	identification: string
	passport: string
	weight: string
}

export interface Flight {
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

export interface Airship {
	id: number
	title: string
	seats: number
	status: string
	size: string
	description: string
	images?: File[]
}

export type DataType = Flight | Client | Airship

interface TableProps {
	caseType: string
}

const TableModal = ({ caseType }: TableProps) => {
	const [data, setData] = useState<DataType[]>([])
	const [loading, setLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const [searchTerm, setSearchTerm] = useState("")
	const [collapsedColumns, setCollapsedColumns] = useState<string[]>([])
	const [openViewModal, setOpenViewModal] = useState(false)
	const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null)
	const itemsPerPage = 8

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

	const filteredData = data.filter((item) => {
		if (caseType === "client" && "fullname" in item) {
			return item.fullname
				?.toLowerCase()
				.includes(searchTerm.toLowerCase())
		} else if (
			(caseType === "flight" || caseType === "history") &&
			"master_passenger" in item
		) {
			return item.master_passenger
				?.toLowerCase()
				.includes(searchTerm.toLowerCase())
		} else if (caseType === "airship" && "title" in item) {
			return item.title?.toLowerCase().includes(searchTerm.toLowerCase())
		}
		return true
	})

	const handleScheduler = () => {
		window.location.href = "/Scheduler"
	}

	const handleStepper = (id: number) => {
		if (caseType === "flight") {
			const selectedFlight = data.find((item) => item.id === id) as Flight
			if (selectedFlight) {
				setSelectedFlight(selectedFlight)
				setOpenViewModal(true)
			}
		}
	}

	const toggleColumn = (column: string) => {
		setCollapsedColumns((prev) =>
			prev.includes(column)
				? prev.filter((col) => col !== column)
				: [...prev, column]
		)
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

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber)
	}

	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)
	const totalPages = Math.ceil(filteredData.length / itemsPerPage)

	const hiddenColumns = [
		"id",
		"price_revenue",
		"pslc",
		"type_of",
		"associated_to",
		"createdby",
	]
	return (
		<>
			<ColumnToggles
				toggleColumn={toggleColumn}
				collapsedColumns={collapsedColumns}
				hiddenColumns={hiddenColumns}
			/>

			<div className="w-full max-w-[100%]">
				<div className="flex items-center justify-between mt-2 mb-2">
					{caseType !== "airship" && (
						<div className="relative">
							<input
								type="text"
								placeholder={`Search ${
									caseType === "client" ? "Client" : "Client"
								}`}
								className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="absolute left-3 top-3 w-6 h-6 text-gray-500"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
								/>
							</svg>
						</div>
					)}
					{buttonRetriever()}
				</div>

				{filteredData.length > 0 ? (
					<>
						<div className="overflow-hidden rounded-2xl shadow-md">
							<table className="border-gray-400 w-full text-sm text-left text-gray-500 overflow-y-auto">
								<thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-400 rounded-t-3xl">
									<tr>
										{Object.keys(currentItems[0] || {}).map(
											(key, index) =>
												!collapsedColumns.includes(
													key
												) && (
													<th
														key={index}
														className="px-6 py-3"
													>
														{key}
													</th>
												)
										)}
										<th className="px-6 py-3">Action</th>
									</tr>
								</thead>
								<tbody className="overflow-y-auto rounded-b-3xl">
									{currentItems.map(
										(singledata: DataType) => (
											<tr
												key={singledata.id}
												onClick={() =>
													handleStepper(singledata.id)
												}
												className="bg-white border-b cursor-pointer hover:bg-gray-200"
											>
												{Object.entries(singledata).map(
													([key, value]) =>
														!collapsedColumns.includes(
															key
														) && (
															<td
																key={key}
																className="px-6 py-3 whitespace-nowrap"
															>
																{value}
															</td>
														)
												)}
												<td className="px-6 py-3 flex whitespace-nowrap">
													{caseType !== "history" &&
														caseType !==
															"flight" && (
															<>
																<Edit
																	id={
																		singledata.id
																	}
																	caseType={
																		caseType
																	}
																	data={
																		singledata
																	}
																/>
															</>
														)}
													<Delete
														id={singledata.id}
														caseType={caseType}
														setData={setData}
													/>
												</td>
											</tr>
										)
									)}
								</tbody>
							</table>
						</div>
					</>
				) : (
					<div className="flex-grow flex items-center  min-h-[400px] justify-center">
						<EmptyTableCard loading={loading} />
					</div>
				)}
			</div>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				handlePageChange={handlePageChange}
			/>
			{openViewModal && selectedFlight && (
				<ViewFlightInfo
					formData={selectedFlight}
					setOpenModal={setOpenViewModal}
					caseType={caseType}
				/>
			)}
		</>
	)
}

export default TableModal;
