import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_Bz47hKcs.mjs';
import { manifest } from './manifest_D3xNKQvl.mjs';

const serverIslandMap = new Map([
]);;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/airships.astro.mjs');
const _page2 = () => import('./pages/client.astro.mjs');
const _page3 = () => import('./pages/history.astro.mjs');
const _page4 = () => import('./pages/home.astro.mjs');
const _page5 = () => import('./pages/invoice.astro.mjs');
const _page6 = () => import('./pages/quote.astro.mjs');
const _page7 = () => import('./pages/scheduler.astro.mjs');
const _page8 = () => import('./pages/trip/_trip_.astro.mjs');
const _page9 = () => import('./pages/trips.astro.mjs');
const _page10 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/Airships.astro", _page1],
    ["src/pages/Client.astro", _page2],
    ["src/pages/History.astro", _page3],
    ["src/pages/Home.astro", _page4],
    ["src/pages/Invoice.astro", _page5],
    ["src/pages/Quote.astro", _page6],
    ["src/pages/Scheduler.astro", _page7],
    ["src/pages/trip/[trip].astro", _page8],
    ["src/pages/Trips.astro", _page9],
    ["src/pages/index.astro", _page10]
]);
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: undefined
});
const _args = {
    "middlewareSecret": "25820b8b-b507-49cd-9202-f2457cc1d2d4",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
