import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_BnbQbhrk.mjs';
import { manifest } from './manifest_D3GQmvea.mjs';

const serverIslandMap = new Map([
]);;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/airships.astro.mjs');
const _page2 = () => import('./pages/client.astro.mjs');
const _page3 = () => import('./pages/flights.astro.mjs');
const _page4 = () => import('./pages/history.astro.mjs');
const _page5 = () => import('./pages/home.astro.mjs');
const _page6 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/Airships.astro", _page1],
    ["src/pages/Client.astro", _page2],
    ["src/pages/Flights.astro", _page3],
    ["src/pages/History.astro", _page4],
    ["src/pages/Home.astro", _page5],
    ["src/pages/index.astro", _page6]
]);
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: undefined
});
const _args = {
    "middlewareSecret": "736a5f27-b3a2-463e-a22c-0652ffbf1ef2",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
