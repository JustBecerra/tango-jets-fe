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
	)
}
