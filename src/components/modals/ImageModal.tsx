import { useState } from "react"
import { Modal, Button } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Modal.css"
import type { ImagesType } from "../cards/PickAirship"
import type { Airship } from "../table/TableModal"

interface props {
	show: boolean
	handleClose: () => void
	images: ImagesType[]
	currentIndex: number
	items: Airship | undefined
}

const ImageModal = ({
	show,
	handleClose,
	items,
	currentIndex,
	images,
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
				<div>
					{currentItem?.dataValues?.image ? (
						<img
							src={currentItem.dataValues.image}
							alt={`slide ${currentIndex + 1}`}
							className={`modal-image ${
								isFullscreen ? "fullscreen" : ""
							}`}
							onClick={handleImageClick}
						/>
					) : (
						<p>Loading image...</p>
					)}
					<h5>{items ? items.title : "Title"}</h5>
					<p>{items ? items.description : "description"}</p>
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
