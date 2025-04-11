import React from 'react'
import TravelMap from '../cards/TravelMap'

interface props{
    coordinates: {
        latitude: string
        longitude: string
    }[]
}


export const StepperFlightInfo = ({coordinates} : props) => {
  return (
    <div>
        <div className='flex flex-col'>
            <div className='flex'><p>logo</p>Route
            <TravelMap Coordinates={coordinates} />
            </div>
        </div>
    </div>
  )
}
