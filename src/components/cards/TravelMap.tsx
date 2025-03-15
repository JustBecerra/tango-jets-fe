import { useEffect } from "react"
import "ol/ol.css"
import { Map, View } from "ol"
import TileLayer from "ol/layer/Tile"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import OSM from "ol/source/OSM"
import { fromLonLat } from "ol/proj"
import { Point, LineString } from "ol/geom"
import Feature from "ol/Feature"
import { Style, Stroke } from "ol/style"
import type { Coordinate } from "ol/coordinate"

interface props {
	first_latitude: string
	first_longitude: string
	second_latitude: string
	second_longitude: string
}

const Travelmap = ({
	first_latitude,
	first_longitude,
	second_latitude,
	second_longitude,
}: props) => {
	useEffect(() => {
		const points = [
			fromLonLat([parseInt(first_longitude), parseInt(first_latitude)]),
			fromLonLat([parseInt(second_longitude), parseInt(second_latitude)]),
		]

		const pointFeatures = points.map(
			(point) => new Feature(new Point(point))
		)

		const pointSource = new VectorSource({
			features: pointFeatures,
		})

		const pointLayer = new VectorLayer({
			source: pointSource,
		})

		const generateGeodesicLine = ({
			start,
			end,
		}: {
			start: Coordinate
			end: Coordinate
		}) => {
			const line = new LineString([start, end])
			const distance = line.getLength()
			const numPoints = Math.ceil(distance / 100000)
			const geodesicCoordinates = []
			for (let i = 0; i <= numPoints; i++) {
				const fraction = i / numPoints
				const intermediatePoint = line.getCoordinateAt(fraction)
				geodesicCoordinates.push(intermediatePoint)
			}
			return new LineString(geodesicCoordinates)
		}

		const geodesicLines = []
		for (let i = 0; i < points.length - 1; i++) {
			geodesicLines.push(
				generateGeodesicLine({ start: points[i], end: points[i + 1] })
			)
		}

		const lineFeatures = geodesicLines.map(
			(line) => new Feature({ geometry: line })
		)

		const lineSource = new VectorSource({
			features: lineFeatures,
		})

		const lineLayer = new VectorLayer({
			source: lineSource,
			style: new Style({
				stroke: new Stroke({
					color: "#FF0000",
					width: 2,
				}),
			}),
		})

		const map = new Map({
			target: "map",
			layers: [
				new TileLayer({
					source: new OSM(),
				}),
				pointLayer,
				lineLayer,
			],
			view: new View({
				center: fromLonLat([0, 20]), // Center of the map
				zoom: 2,
			}),
		})

		return () => {
			map.setTarget("")
		}
	}, [])

	return (
		<div className="flex flex-col items-center w-full h-full mt-2">
			<div
				id="map"
				className="w-full h-full border-1 border-solid border-black flex overflow-hidden rounded shadow-md"
			></div>
		</div>
	)
}

export default Travelmap
