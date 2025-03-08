import { useEffect, useState } from "react";
import Delete from "../buttons/Delete";
import { EmptyTableCard } from "../cards/EmptyTableCard";
import Edit from "../buttons/Edit";
import Pagination from "../Pagination/Pagination";
import ColumnToggles from "../checkboxTables/ColumnToggles";
import { getPilots } from "../../../lib/actions/pilots/actions";
import ModalAddPilot from "../modals/ModalAddPilot";
import useStore from "../../store/store"

export interface Pilot {
	id: number
	fullname: string
	phonenumber: string
	weight: string
	email: string
	type: string
	passport: string
	date_of_birth: string
	expiration_date: string
}

export type DataType = Pilot

interface TableProps {
	caseType: string
}

const TablePilot = ({ caseType }: TableProps) => {
	const [data, setData] = useState<DataType[]>([])
	const [loading, setLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const [searchTerm, setSearchTerm] = useState("")
	const [collapsedColumns, setCollapsedColumns] = useState<string[]>([])
	const pilots = useStore((state) => state.pilots)
	const itemsPerPage = 8

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (caseType === "pilot") {
					const pilots = await getPilots()
					setData(pilots)
				}
			} catch (error) {
				console.error("Failed to fetch data:", error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [caseType, pilots])

	const filteredData = data.filter((item) => {
		if (caseType === "pilot" && "fullname" in item) {
			return item.fullname
				?.toLowerCase()
				.includes(searchTerm.toLowerCase())
		}
		return true
	})

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber)
	}

	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)
	const totalPages = Math.ceil(filteredData.length / itemsPerPage)

	const hiddenColumns = ["id"]

	return (
		<>
			<ColumnToggles
				toggleColumn={(column) =>
					setCollapsedColumns((prev) =>
						prev.includes(column)
							? prev.filter((col) => col !== column)
							: [...prev, column]
					)
				}
				collapsedColumns={collapsedColumns}
				hiddenColumns={hiddenColumns}
			/>

			<div className="w-full max-w-[100%]">
				<div className="flex items-center justify-between mt-2 mb-2">
					<div className="relative">
						<input
							type="text"
							placeholder="Search Pilot"
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
					<ModalAddPilot />
				</div>

				{currentItems.length > 0 ? (
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
											<th
												key={index}
												className="px-6 py-3"
											>
												{key}
											</th>
										))}
									<th className="px-6 py-3">Action</th>
								</tr>
							</thead>
							<tbody className="overflow-y-auto rounded-b-3xl">
								{currentItems.map((singledata: DataType) => (
									<tr
										key={singledata.id}
										className="bg-white border-b cursor-pointer hover:bg-gray-200"
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
											.map(([key, value]) => (
												<td
													key={key}
													className="px-6 py-3 whitespace-nowrap"
												>
													{value}
												</td>
											))}
										<td className="px-6 py-3 flex whitespace-nowrap">
											<Edit
												id={singledata.id}
												caseType={caseType}
												data={singledata}
											/>
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
					</div>
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
		</>
	)
}

export default TablePilot;
