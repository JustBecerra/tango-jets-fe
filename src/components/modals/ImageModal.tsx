import { useState } from "react"
import { Modal, Button } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Modal.css"
import type { ImagesType } from "../cards/PickAirship"
import type { Airship } from "../table/TableModal"

interface props {
	show: boolean
	handleClose: () => void
	images: [ImagesType[]]
	currentIndex: number
	items: Airship | undefined
	revenue: number
}

const ImageModal = ({
	show,
	handleClose,
	items,
	currentIndex,
	images,
	revenue,
}: props) => {
	const [isFullscreen, setIsFullscreen] = useState(false)
	const currentItem = images[currentIndex]

	const handleImageClick = () => {
		setIsFullscreen(!isFullscreen)
	}

	return (
		<Modal show={show} onHide={handleClose} size="xl">
			<Modal.Header closeButton>
				<Modal.Title>Más Imágenes</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="flex flex-col">
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						{currentItem.length > 0 ? (
							currentItem.map((image, index) => (
								<img
									key={index}
									src={image.dataValues.image}
									alt={`slide ${currentIndex + 1}`}
									className={`w-[400px] sm:w-1/2 h-[250px] ${
										isFullscreen ? "fullscreen" : ""
									}`}
									onClick={handleImageClick}
								/>
							))
						) : (
							<p>Loading image...</p>
						)}
					</div>
					<h5>{items ? items.title : "Title"}</h5>
					<p>Price: ${revenue}</p>
					<p>
						Description: {items ? items.description : "description"}
					</p>
					<p>Tail number: {items ? items.status : "Tail number"}</p>
					<p>Seats: {items ? items.seats : "seats"}</p>
					<p>Size: {items ? items.size : "size"}</p>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Cerrar
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ImageModal
