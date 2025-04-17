import React, { useState, useEffect, useRef } from "react";
import useStore from "../../store/store";
import type { Client } from "../table/TableModal";
import type { formType } from "../scheduler/SchedulerFrame";
import type { formEditType } from "../edit-trip/MainEditFlight";
import StarRanking from "../stepper/StarsRank";
import { FaUser, FaPassport } from "react-icons/fa";

interface props {
	value: string
	setter:
		| React.Dispatch<React.SetStateAction<formType>>
		| React.Dispatch<React.SetStateAction<formType[]>>
	formDataIndex?: number
}

export const AutoComplete = ({ value, setter, formDataIndex }: props) => {
	const { clients } = useStore((state) => state)
	const [listClients, setListClients] = useState<Client[]>([])
	const [openDropdown, setOpenDropdown] = useState(false)
	const wrapperRef = useRef<HTMLDivElement>(null);

	// Manejar clics fuera del componente
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
				setOpenDropdown(false);
			}
		}
		
		// Agregar event listener cuando el dropdown está abierto
		if (openDropdown) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		
		// Cleanup del event listener
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [openDropdown]);
	
	return (
		<div className="relative w-full" ref={wrapperRef}>
			<input
				type="text"
				id="master_passenger"
				name="master_passenger"
				value={value}
				onChange={(e) => {
					if (formDataIndex !== undefined) {
						setter((prevFormData: any) => {
							if (Array.isArray(prevFormData)) {
								const updatedFormData = [...prevFormData]
								updatedFormData[
									formDataIndex
								].master_passenger = e.target.value
								return updatedFormData
							}
							return prevFormData
						})
					} else {
						setter((prevFormData: any) => ({
							...prevFormData,
							master_passenger: e.target.value,
						}))
					}

					if (e.target.value.length > 0) setOpenDropdown(true)
					
					const searchTerm = e.target.value.toLowerCase();
					
					// Filtrar y ordenar clientes
					const filteredClients = clients
						.filter(client => 
							client.fullname.toLowerCase().includes(searchTerm)
						)
						.sort((a, b) => {
							// Priorizar los que comienzan con el término de búsqueda
							const aStartsWith = a.fullname.toLowerCase().startsWith(searchTerm);
							const bStartsWith = b.fullname.toLowerCase().startsWith(searchTerm);
							
							if (aStartsWith && !bStartsWith) return -1;
							if (!aStartsWith && bStartsWith) return 1;
							
							// Si ambos comienzan o ninguno comienza, ordenar alfabéticamente
							return a.fullname.localeCompare(b.fullname);
						});
					
					// Limitar la lista a un máximo de 3 resultados
					setListClients(filteredClients.slice(0, 3));
				}}
				className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
				required
			/>

			{openDropdown && (
				<div className="fixed inset-0 z-[1000] overflow-y-auto pointer-events-none" style={{ backgroundColor: 'transparent' }}>
					<ul 
						className="h-auto max-h-[300px] w-[370px] overflow-y-auto border border-gray-200 shadow-lg rounded-lg bg-white pointer-events-auto"
						style={{
							position: 'fixed',
							top: wrapperRef.current ? wrapperRef.current.getBoundingClientRect().bottom + 5 + 'px' : '0px',
							left: wrapperRef.current ? wrapperRef.current.getBoundingClientRect().left + 'px' : '0px',
							zIndex: 1050
						}}
					>
						{listClients.length > 0 ? (
							listClients.map((client, index) => (
								<li
									className="cursor-pointer text-black hover:bg-blue-50 transition-colors px-4 py-3"
									onClick={() => {
										if (formDataIndex !== undefined) {
											setter((prevFormData: any) => {
												if (Array.isArray(prevFormData)) {
													const updatedFormData = [
														...prevFormData,
													]
													updatedFormData[
														formDataIndex
													].master_passenger = client.fullname
													return updatedFormData
												}
												return prevFormData
											})
										} else {
											setter((prevFormData: any) => ({
												...prevFormData,
												master_passenger: client.fullname,
											}))
										}
										setOpenDropdown(false)
									}}
									key={index}
								>
									<div className="flex flex-col">
										<div className="flex items-center gap-2">
											<FaUser className="text-gray-500" />
											<span className="font-medium">{client.fullname}</span>
										</div>
										<div className="flex items-center justify-between mt-1 text-sm text-gray-500">
											<div className="flex items-center gap-2">
												<FaPassport className="text-gray-400" />
												<span>{client.passport || "Sin pasaporte"}</span>
											</div>
											{client.nationality && (
												<span className="text-gray-400">{client.nationality}</span>
											)}
										</div>
										{(client as any).ranking !== undefined && (
											<StarRanking ranking={(client as any).ranking} />
										)}
									</div>
								</li>
							))
						) : (
							<li className="py-4 px-4 text-gray-500 text-center">
								Client not found
							</li>
						)}
					</ul>
				</div>
			)}
		</div>
	)
}
