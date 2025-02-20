import React, { useState } from "react";
import { editAction } from "../../../lib/actions/edit/actions";

import ModalEditCli from "../modals/ModalEditCli";
import ModalEditJet from "../modals/ModalEditJet";
import ModalFlightEdit from "../modals/ModalFlightEdit";
import type { Airship, Client, Flight } from "../table/TableModal"
import { getFlights } from "../../../lib/actions/flights/actions"
import { getClients } from "../../../lib/actions/clients/actions"
import { getAirships } from "../../../lib/actions/airships/actions"
import useStore from "../../store/store"

interface Props {
	id: number
	caseType: string
	data: Client | Airship | Flight
}

const Edit = ({ id, caseType, data }: Props) => {
	const [openModal, setOpenModal] = useState(false)
	const [formData, setFormData] = useState<Client | Airship | Flight>(data)
	const [portraitData, setPortraitData] = useState<File>(
		new File(["initial content"], "", { type: "text/plain" })
	)
	const [genericData, setGenericData] = useState<File[]>([])
	const { updateClients, updateAirships } = useStore()

	const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formElement = event.currentTarget
		const formData = new FormData(formElement)

		formData.delete("portrait")
		formData.delete("generic")

		formData.append("portrait", portraitData)

		genericData.forEach((file) => {
			formData.append("generic", file)
		})

		try {
			await editAction({ caseType, data: formData, id })
			if (caseType === "client") {
				const clients = await getClients()
				updateClients(clients)
			} else if (caseType === "airship") {
				const airships = await getAirships()
				updateAirships(airships)
			}
		} catch (error) {
			console.error("Error:", error)
		} finally {
			setOpenModal(false)
		}
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		setFormData((prevData) => ({ ...prevData, [name]: value, id: id }))
	}

	return (
		<>
			<button
				className="bg-transparent p-2"
				onClick={() => setOpenModal(true)}
			>
				<svg
					className="w-6 h-6 text-blue-500 "
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
					/>
				</svg>
			</button>

			{openModal &&
				(caseType === "airship" ? (
					<ModalEditJet
						formData={formData as Airship}
						handleChange={handleChange}
						handleEdit={handleEdit}
						setOpenModal={setOpenModal}
						genericData={genericData}
						setGenericData={setGenericData}
						portraitData={portraitData}
						setPortraitData={setPortraitData}
					/>
				) : caseType === "flight" ? (
					<ModalFlightEdit
						formData={formData as Flight}
						handleChange={handleChange}
						handleEdit={handleEdit}
						setOpenModal={setOpenModal}
					/>
				) : caseType === "client" ? (
					<ModalEditCli
						formData={formData as Client}
						handleChange={handleChange}
						handleEdit={handleEdit}
						setOpenModal={setOpenModal}
					/>
				) : null)}
		</>
	)
}

export default Edit;
