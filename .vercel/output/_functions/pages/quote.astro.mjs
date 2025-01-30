/* empty css                                    */
import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_DwpHebLD.mjs';
import 'kleur/colors';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useEffect } from 'react';
/* empty css                                 */
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import OSM from 'ol/source/OSM.js';
import { fromLonLat } from 'ol/proj.js';
import { Point, LineString } from 'ol/geom.js';
import Feature from 'ol/Feature.js';
import { Style, Stroke } from 'ol/style.js';
import { $ as $$ClientLayout } from '../chunks/ClientLayout_Dm5D5PY9.mjs';
export { renderers } from '../renderers.mjs';

const Travelmap = () => {
  useEffect(() => {
    const points = [
      fromLonLat([-74.006, 40.7128]),
      fromLonLat([-0.1276, 51.5074]),
      fromLonLat([139.6917, 35.6895])
    ];
    const pointFeatures = points.map(
      (point) => new Feature(new Point(point))
    );
    const pointSource = new VectorSource({
      features: pointFeatures
    });
    const pointLayer = new VectorLayer({
      source: pointSource
    });
    const generateGeodesicLine = ({
      start,
      end
    }) => {
      const line = new LineString([start, end]);
      const distance = line.getLength();
      const numPoints = Math.ceil(distance / 1e5);
      const geodesicCoordinates = [];
      for (let i = 0; i <= numPoints; i++) {
        const fraction = i / numPoints;
        const intermediatePoint = line.getCoordinateAt(fraction);
        geodesicCoordinates.push(intermediatePoint);
      }
      return new LineString(geodesicCoordinates);
    };
    const geodesicLines = [];
    for (let i = 0; i < points.length - 1; i++) {
      geodesicLines.push(
        generateGeodesicLine({ start: points[i], end: points[i + 1] })
      );
    }
    const lineFeatures = geodesicLines.map(
      (line) => new Feature({ geometry: line })
    );
    const lineSource = new VectorSource({
      features: lineFeatures
    });
    const lineLayer = new VectorLayer({
      source: lineSource,
      style: new Style({
        stroke: new Stroke({
          color: "#FF0000",
          width: 2
        })
      })
    });
    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        pointLayer,
        lineLayer
      ],
      view: new View({
        center: fromLonLat([0, 20]),
        // Center of the map
        zoom: 2
      })
    });
    return () => {
      map.setTarget("");
    };
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center w-full h-full mt-2", children: /* @__PURE__ */ jsx(
    "div",
    {
      id: "map",
      className: "w-full h-full border-1 border-solid border-black flex overflow-hidden rounded shadow-md"
    }
  ) });
};

const MapCard = () => {
  return /* @__PURE__ */ jsxs("div", { className: "w-[50%] h-full p-4 border-2 rounded flex flex-col items-center border-solid bg-white border-gray-300", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center w-full border-b-2 border-gray-300 border-solid", children: /* @__PURE__ */ jsx("p", { className: "text-2xl mb-2", children: "Trip route" }) }),
    /* @__PURE__ */ jsx(Travelmap, {})
  ] });
};

const PickAirship = () => {
  return /* @__PURE__ */ jsxs("div", { className: "w-[50%] h-full p-4  border-2 rounded border-solid bg-white border-gray-300", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center w-full border-b-2 border-gray-300 border-solid", children: /* @__PURE__ */ jsx("p", { className: "text-2xl mb-2", children: "Aircraft" }) }),
    /* @__PURE__ */ jsx("div", { className: "h-full w-full flex items-center justify-center", children: "Carusel de Jero" })
  ] });
};

const $$Quote = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "ClientLayout", $$ClientLayout, { "title": "Quote" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="w-full h-[10%] flex items-center p-4 border-2 rounded border-solid bg-[#EFFFE3] border-[#d6e9c6]"> <p>
Please review the airship options and launch time for accuracy and
			contact us with any changes. If the airship and launch time are
			correct, click the 'Confirm' button to start the booking process.
			Once we have confirmed availability for the airship, we will send
			you a link to complete the booking process.
</p> </div>  <div class="w-full flex justify-around h-[50%] py-4 gap-8"> ${renderComponent($$result2, "PickAirship", PickAirship, {})} ${renderComponent($$result2, "MapCard", MapCard, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Justo/Desktop/tango-jets-fe/src/components/cards/MapCard", "client:component-export": "MapCard" })} </div>` })}`;
}, "C:/Users/Justo/Desktop/tango-jets-fe/src/pages/Quote.astro", void 0);

const $$file = "C:/Users/Justo/Desktop/tango-jets-fe/src/pages/Quote.astro";
const $$url = "/Quote";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Quote,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
