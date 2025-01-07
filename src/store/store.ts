import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
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

const useStore = create(
	persist<State & Action>(
		(set) => ({
			flights: [],
			updateFlights: (newFlights) => set({ flights: newFlights }),
			airships: [],
			updateAirships: (newAirships) => set({ airships: newAirships }),
			clients: [],
			updateClients: (newClients) => set({ clients: newClients }),
		}),
		{
			name: "data-storage",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
)

export default useStore
