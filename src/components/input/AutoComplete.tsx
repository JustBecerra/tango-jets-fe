import React, { useState } from "react"
import type { formType } from "../modals/ModalFlightAdd"
import useStore from "../../store/store"
import type { Client } from "../table/TableModal"

interface props {
	value: string
	setter: React.Dispatch<React.SetStateAction<formType>>
}

export const AutoComplete = ({ value, setter }: props) => {
	const { clients } = useStore((state) => state)
	const [listClients, setListClients] = useState<Client[]>([])
	return (
		<div>
			<input
				type="text"
				id="master_passenger"
				name="master_passenger"
				value={value}
				onChange={(e) => {
					setter((prevFormData) => ({
						...prevFormData,
						master_passenger: e.target.value,
					}))
					const newList = clients.filter((client) =>
						client.fullname
							.toLocaleLowerCase()
							.includes(value.toLocaleLowerCase())
					)
					setListClients(newList)
				}}
				className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
				required
			/>
			<ul className="h-[100px] overflow-y-auto">
				{value &&
					listClients.map((client) => <li>{client.fullname}</li>)}
			</ul>
		</div>
	)
}
