import { create } from "zustand"
import type { Airship, Client, Flight } from "../components/table/TableModal"

export type State = {
	airships: Airship[]
	flights: Flight[]
	clients: Client[]
}

export type Action = {
	updateAirships: (airships: State["airships"]) => void
	updateFlights: (flights: State["flights"]) => void
	updateClients: (clients: State["clients"]) => void
}

const useStore = create<State & Action>((set) => ({
	airships: [],
	flights: [],
	clients: [],
	updateAirships: (airships) => set(() => ({ airships: airships })),
	updateFlights: (flights) => set(() => ({ flights: flights })),
	updateClients: (clients) => set(() => ({ clients: clients })),
}))

export default useStore
