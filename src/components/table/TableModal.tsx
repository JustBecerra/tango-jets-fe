import { useEffect, useState } from "react";
import Delete from "../buttons/Delete";
import { EmptyTableCard } from "../cards/EmptyTableCard";
import Edit from "../buttons/Edit";
import ModalAdd from "../modals/ModalAdd";
import ModalJetAdd from "../modals/ModalJetAdd";
import useStore from "../../store/store";
import Pagination from "../Pagination/Pagination";
import ColumnToggles from "../checkboxTables/ColumnToggles";
import ViewFlightInfo from "../modals/ViewFlightInfo"
import { getPilots } from "../../../lib/actions/pilots/actions"

export interface Client {
	id: number
	fullname: string
	nationality: string
	email: string
	identification: string
	passport: string
	weight: string
	title: string
	date_of_birth: string
}

export interface Flight {
	id: number
	launchtime: string
	to: string
	from: string
	airship_name: string
	airship_id: number
	createdby: string
	master_passenger: string
	companion_passengers: string[]
	price_cost: string
	price_revenue: number
	phase: number
	arrivaltime: string
	type_of: string
	associated_to: string
	pilot_id: string
	flight_time: string
	first_latitude: string
	first_longitude: string
	second_latitude: string
	second_longitude: string
	// CAMBIO 1: Agregar propiedades para relación padre-hijo
	isChildFlight?: boolean
	parentFlightId?: number
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
	// CAMBIO 2: Añadir estado para rastrear qué padres están expandidos
	const [expandedParents, setExpandedParents] = useState<number[]>([])
	const itemsPerPage = 8

	const flights = useStore((state) => state.flights)
	const clients = useStore((state) => state.clients)
	const airships = useStore((state) => state.airships)
	const setPilots = useStore((state) => state.updatePilots)
	//Cambio Jero nombres de columnas para Usuario
	const columnDisplayNamesClient: { [key: string]: string } = {
		fullname: "Full Name",
		email: "Email",
		nationality: "Nationality",
		identification: "Identification",
		passport: "Passport",
		weight: "Weight",
		title: "Title",
		date_of_birth: "Date of Birth",
	};
	
const columnDisplayNamesTrips: { [key: string]: string } = {
   
    launchtime: "Launch Time",
	arrivaltime: "Arrival Time",
    airship_name: "Airship Name",
	master_passenger: "Master Passenger",
	to: "Destination",
    from: "Origin",
    createdby: "Created By",
    companion_passengers: "Companions",
    price_cost: "Cost",
    phase: "Phase",
    type_of: "Type",
   
   
   
    
};
const columnDisplayNamesAirship: { [key: string]: string } = {
  
    title: "Title",
    status: "Status",
	description: "Description",
	seats: "Seats",
    size: "Size",
    

};

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (caseType === "flight" || caseType === "history") {
					// CAMBIO 3: Crear un mapa para buscar vuelos fácilmente
					const flightsMap = new Map<number, Flight>()
					const pilots = await getPilots()
					// Obtener la lista base de vuelos según el tipo (próximos o historial)
					let processedFlights = flights.map((flight: any) => {
						const { updatedAt, ...rest } = flight
						return rest
					})

					// Filtrar por fecha o fase basado en caseType (sin cambios)
					if (caseType === "flight") {
						processedFlights = processedFlights.filter(
							(flight: any) => {
								const launchTime = new Date(flight.launchtime)
								const currentTime = new Date()
								return currentTime < launchTime
							}
						)
					} else if (caseType === "history") {
						processedFlights = processedFlights.filter(
							(flight: Flight) =>
								flight.phase > 7 ||
								flight.arrivaltime < new Date().toISOString()
						)
					}

					// CAMBIO 4: Formatear fechas y agregar propiedades de relación padre-hijo
					processedFlights = processedFlights.map((flight: any) => {
						const formattedFlight = {
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
							// Agregar propiedades de relación padre-hijo
							isChildFlight:
								flight.type_of === "return" ||
								flight.type_of === "connection",
							parentFlightId: flight.associated_to
								? parseInt(flight.associated_to)
								: undefined,
						}
						flightsMap.set(flight.id, formattedFlight)
						return formattedFlight
					})

					setPilots(pilots)
					// Establecer los datos con la relación jerárquica
					setData(processedFlights)
				} else if (caseType === "client") {
					setData(clients)
				} else if (caseType === "airship") {
					setData(airships)
				}
			} catch (error) {
				console.error("Failed to fetch data:", error)
			} finally {
				setTimeout(() => {
					setLoading(false)
				}, 1000)
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

	// CAMBIO 5: Función para organizar vuelos en estructura jerárquica
	const organizedFlights = () => {
		if (caseType !== "flight" && caseType !== "history") {
			return filteredData
		}

		const flights = filteredData as Flight[]
		const parentFlights = flights.filter((flight) => !flight.isChildFlight)
		const result: Flight[] = []

		parentFlights.forEach((parent) => {
			result.push(parent)

			// Si este padre está expandido, agregar sus hijos
			if (expandedParents.includes(parent.id)) {
				const childFlights = flights.filter(
					(flight) =>
						flight.isChildFlight &&
						flight.parentFlightId === parent.id
				)
				childFlights.forEach((child) => {
					result.push(child)
				})
			}
		})

		return result
	}

	// CAMBIO 6: Usar datos organizados en lugar de filteredData directamente
	const organizedData = organizedFlights()

	const handleScheduler = () => {
		window.location.href = "/Scheduler"
	}

	// CAMBIO 7: Manejar click en el dropdown separado del click en la fila
	const handleToggleExpand = (id: number, event: React.MouseEvent) => {
		event.stopPropagation() // Detener la propagación del evento

		setExpandedParents((prev) =>
			prev.includes(id)
				? prev.filter((parentId) => parentId !== id)
				: [...prev, id]
		)
	}

	// Modificado para separar la funcionalidad de expandir/colapsar de mostrar detalles
	const handleStepper = (id: number, event: React.MouseEvent) => {
		// No hacer nada si se hace clic en botones de acción u otros elementos interactivos
		if (
			(event.target as Element).closest("button") ||
			(event.target as Element).closest("svg") ||
			(event.target as Element).closest("path")
		) {
			return
		}

		// Mostrar modal de detalles del vuelo
		if (caseType === "flight" || caseType === "history") {
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

	// CAMBIO 8: Usar organizedData para paginación
	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentItems = organizedData.slice(indexOfFirstItem, indexOfLastItem)
	const totalPages = Math.ceil(organizedData.length / itemsPerPage)

	// CAMBIO 9: Agregar nuevas propiedades a hiddenColumns
	const hiddenColumns = [
		"id",
		"price_revenue",
		"associated_to",
		"createdby",
		"isChildFlight",
		"parentFlightId",
		"pilot_id",
		"first_longitude",
		"first_latitude",
		"second_longitude",
		"second_latitude",
		"flight_time",
	]

	// Funcion para asegurarse de chequear que filtre la airship de titulo TBD
	function isAirship(item: DataType): item is Airship {
		return (item as Airship).title !== undefined
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen flex-1 gap-8">
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

				{currentItems.length > 0 && !loading ? (
					<>
						<div className="overflow-hidden rounded-2xl shadow-md">
							<table className="border-gray-400 w-full text-sm text-left text-gray-500 overflow-y-auto">
							<thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-400 rounded-t-3xl">
								<tr>
									{Object.keys(currentItems[0] || {})
										.filter(
											(key) =>
												!hiddenColumns.includes(key) &&
												!collapsedColumns.includes(key)
										)
										.map((key, index) => (
											<th key={index} className="px-6 py-3">
												{caseType === "flight" || caseType === "history"
													? columnDisplayNamesTrips[key] || key
													: caseType === "client"
													? columnDisplayNamesClient[key] || key
													: caseType === "airship"
													? columnDisplayNamesAirship[key] || key
													: key}
											</th>
										))}
									<th className="px-6 py-3">Action</th>
								</tr>
							</thead>
								<tbody className="overflow-y-auto rounded-b-3xl">
									{/* CAMBIO 11: Renderizado jerárquico de filas */}
									{currentItems
										.filter((item) => {
											if (
												caseType === "airship" &&
												isAirship(item)
											) {
												return item.title !== "TBD"
											}
											return true
										})
										.map((singledata: DataType) => {
											// Verificar si es un vuelo hijo
											const isChild =
												(caseType === "flight" ||
													caseType === "history") &&
												"isChildFlight" in singledata &&
												singledata.isChildFlight

											// Verificar si es un padre expandible
											const isExpandable =
												(caseType === "flight" ||
													caseType === "history") &&
												"isChildFlight" in singledata &&
												!singledata.isChildFlight &&
												filteredData.some(
													(item) =>
														"parentFlightId" in
															item &&
														item.parentFlightId ===
															singledata.id
												)

											const isExpanded =
												isExpandable &&
												expandedParents.includes(
													singledata.id
												)

											return (
												<tr
													key={singledata.id}
													onClick={(e) =>
														handleStepper(
															singledata.id,
															e
														)
													}
													className={`${
														isChild
															? "bg-gray-100"
															: "bg-white"
													} border-b cursor-pointer hover:bg-gray-200`}
												>
													{Object.entries(singledata)
														.filter(
															([key]) =>
																!hiddenColumns.includes(
																	key
																) &&
																!collapsedColumns.includes(
																	key
																)
														)
														.map(
															(
																[key, value],
																index
															) => {
																// Renderizado especial para la primera columna de vuelos hijo
																if (
																	index === 0
																) {
																	if (
																		isChild
																	) {
																		return (
																			<td
																				key={
																					key
																				}
																				className="px-6 py-3 whitespace-nowrap"
																			>
																				<div className="flex items-center">
																					<span className="ml-4 text-gray-600">
																						└─{" "}
																						{
																							value
																						}
																					</span>
																				</div>
																			</td>
																		)
																	} else if (
																		isExpandable
																	) {
																		return (
																			<td
																				key={
																					key
																				}
																				className="px-6 py-3 whitespace-nowrap"
																			>
																				<div className="flex items-center">
																					<button
																						className="mr-2 text-gray-600 focus:outline-none"
																						onClick={(
																							e
																						) =>
																							handleToggleExpand(
																								singledata.id,
																								e
																							)
																						}
																					>
																						{isExpanded ? (
																							<svg
																								xmlns="http://www.w3.org/2000/svg"
																								width="16"
																								height="16"
																								fill="currentColor"
																								viewBox="0 0 16 16"
																							>
																								<path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
																							</svg>
																						) : (
																							<svg
																								xmlns="http://www.w3.org/2000/svg"
																								width="16"
																								height="16"
																								fill="currentColor"
																								viewBox="0 0 16 16"
																							>
																								<path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
																							</svg>
																						)}
																					</button>
																					{
																						value
																					}
																				</div>
																			</td>
																		)
																	}
																}
																return (
																	<td
																		key={
																			key
																		}
																		className="px-6 py-3 whitespace-nowrap"
																	>
																		{value}
																	</td>
																)
															}
														)}
													<td className="px-6 py-3 flex whitespace-nowrap">
														{caseType !==
															"history" &&
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
										})}
								</tbody>
							</table>
						</div>
					</>
				) : (
					<div className="flex-grow flex items-center min-h-[400px] justify-center">
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
		</div>
	)
}

export default TableModal;
