import { useState } from 'react'
import { CCarousel, CCarouselItem, CImage } from "@coreui/react"
import "@coreui/coreui/dist/css/coreui.min.css"
import "./Carousel.css"
import type { Airship } from '../table/TableModal'
import type { ImagesType } from './PickAirship'

interface props {
    airshipImages: [ImagesType]
    selectedAirship: Airship
}

export const CarouselInvoice = ({ airshipImages, selectedAirship }: props) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [currentImage, setCurrentImage] = useState<ImagesType>(
		airshipImages[currentIndex]
	)

	const handleSlideChange = (e: any) => {
		const newIndex = e
		if (typeof newIndex !== "undefined") {
			setCurrentIndex(newIndex)
			setCurrentImage(airshipImages[newIndex])
		} else {
			console.error(
				"Slide change event does not contain expected properties"
			)
		}
	}

	return (
		<div className="w-full sm:w-[50%] h-full p-4  border-2 rounded border-solid bg-white border-gray-300">
			<div className="flex justify-center items-center w-full border-b-2 border-gray-300 border-solid">
				<p className="text-2xl mb-2">Aircraft</p>
			</div>
			<div className="h-full w-full flex flex-col items-center justify-center">
				<CCarousel
					controls
					indicators
					transition="crossfade"
					interval={false}
					className="custom-carousel"
					onSlid={handleSlideChange}
				>
					{airshipImages ? (
						airshipImages.map((item, index) => (
							<CCarouselItem key={index}>
								<CImage
									className="d-block w-full h-[300px]"
									src={item?.dataValues.image}
									alt={`slide ${index + 1}`}
								/>
							</CCarouselItem>
						))
					) : (
						<>Loading...</>
					)}
				</CCarousel>
			</div>
		</div>
	)
}
