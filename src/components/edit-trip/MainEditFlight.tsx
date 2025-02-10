import CsvSelect from '../stepper/prueba'
import { AutoComplete } from '../input/AutoComplete'
import { useState } from 'react'
import type { Flight } from '../table/TableModal'
import type { formType } from '../scheduler/SchedulerFrame'

interface props {
    currentFlight: Flight
}

export interface formEditType{
    launchtime: string;
  to: string;
  from: string;
  airship_name: string;
  price_cost: string;
  price_revenue: number;
  master_passenger: string;
}

export const MainEditFlight = ({currentFlight}: props) => {
    const [formData, setFormData] = useState<formEditType>({
        launchtime: currentFlight.launchtime,
        to: currentFlight.to,
        from: currentFlight.from,
        airship_name: currentFlight.airship_name,
        price_cost: currentFlight.price_cost,
        price_revenue: currentFlight.price_revenue,
        master_passenger: currentFlight.master_passenger
    })
    const [distance, setDistance] = useState<number | null>(null);
    const [flightTime, setFlightTime] = useState<number | null>(null);

      const handleSelectFrom = (value: string) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          from: value,
        }));
      };
    
      const handleSelectTo = (value: string) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          to: value,
        }));
      };

      const handleDistanceCalculated = (calculatedDistance: number) => {
        setDistance(calculatedDistance);
      };
    
      const handleFlightTimeCalculated = (calculatedFlightTime: number) => {
        setFlightTime(calculatedFlightTime);
      };
  return (
    <div className="border-2 border-red-200 border-solid w-[1000px] h-[600px]">
        <form>
        <CsvSelect
					labelFrom="From"
					labelTo="To"
					onSelectFrom={handleSelectFrom}
					onSelectTo={handleSelectTo}
					onDistanceCalculated={handleDistanceCalculated}
					onFlightTimeCalculated={handleFlightTimeCalculated}
				/>
				<div className="flex flex-col justify-end">
					<label
						htmlFor="launchtime"
						className="block text-sm font-medium"
					>
						Launch Time
					</label>
					<input
						type="datetime-local"
						id="launchtime"
						name="launchtime"
						value={formData.launchtime}
						onChange={(e) =>
							setFormData((prevFormData) => ({
								...prevFormData,
								launchtime: new Date(e.target.value).toISOString().slice(0, 16),
							}))
						}
						min={new Date().toISOString().slice(0, 16)}
						className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
						required
					/>
				</div>
				<div>
					<label
						htmlFor="master_passenger"
						className="block text-sm font-medium"
					>
						Lead Passenger
					</label>
					<AutoComplete
						value={formData.master_passenger}
						setter={setFormData as unknown as React.Dispatch<React.SetStateAction<formType>>}
					/>
				</div>
        </form>
    </div>
  )
}
