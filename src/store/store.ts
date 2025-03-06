import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Airship, Client, Flight } from "../components/table/TableModal";
import type { Pilot } from "../components/table/TablePilot";
export type State = {
  airships: Airship[];
  flights: Flight[];
  clients: Client[];
  pilots: Pilot[];
};

export type Action = {
  updateAirships: (airships: State["airships"]) => void;
  updateFlights: (flights: State["flights"]) => void;
  updateClients: (clients: State["clients"]) => void;
  updatePilots: (pilots: State["pilots"]) => void;
};

const useStore = create(
  persist<State & Action>(
    (set) => ({
      flights: [],
      updateFlights: (newFlights) => set({ flights: newFlights }),
      airships: [],
      updateAirships: (newAirships) => set({ airships: newAirships }),
      clients: [],
      updateClients: (newClients) => set({ clients: newClients }),
      pilots: [],
      updatePilots: (newPilots) => set({ pilots: newPilots }),
    }),
    {
      name: "data-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useStore;
