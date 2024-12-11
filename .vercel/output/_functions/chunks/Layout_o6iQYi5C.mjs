import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as renderComponent, e as renderScript, f as renderSlot, g as renderHead, h as addAttribute, b as createAstro } from './astro/server_BhDw4P4A.mjs';
import 'kleur/colors';
import 'clsx';
import { jsxs, jsx } from 'react/jsx-runtime';

const $$SidebarNodrop = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<li> <a href="/Client" class="flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-300 group dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 transition-colors duration-200"> <svg class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"> <path d="M0 0h24v24H0z" fill="none"></path> <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path> </svg> <span class="flex-1 ms-3 whitespace-nowrap">Clients</span> </a> </li> <li> <a href="/Flights" class="flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-300 group dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 transition-colors duration-200"> <svg class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"> <path d="M381 114.9L186.1 41.8c-16.7-6.2-35.2-5.3-51.1 2.7L89.1 67.4C78 73 77.2 88.5 87.6 95.2l146.9 94.5L136 240 77.8 214.1c-8.7-3.9-18.8-3.7-27.3 .6L18.3 230.8c-9.3 4.7-11.8 16.8-5 24.7l73.1 85.3c6.1 7.1 15 11.2 24.3 11.2l137.7 0c5 0 9.9-1.2 14.3-3.4L535.6 212.2c46.5-23.3 82.5-63.3 100.8-112C645.9 75 627.2 48 600.2 48l-57.4 0c-20.2 0-40.2 4.8-58.2 14L381 114.9zM0 480c0 17.7 14.3 32 32 32l576 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 448c-17.7 0-32 14.3-32 32z"></path> </svg> <span class="flex-1 ms-3 whitespace-nowrap">Flights</span> </a> </li> <li> <a href="/Airships" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"> <svg class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"> <path d="M3.691 10h6.309l-3-7h2l7 7h5c1.322-.007 3 1.002 3 2s-1.69 1.993-3 2h-5l-7 7h-2l3-7h-6.309l-2.292 2h-1.399l1.491-4-1.491-4h1.399l2.292 2"></path> </svg> <span class="flex-1 ms-3 whitespace-nowrap">Airships</span> </a> </li>`;
}, "C:/Users/Justo/Desktop/tango-jets-fe/src/components/sidebar/SidebarNodrop.astro", void 0);

function LogOut() {
  document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure";
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure";
  document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure";
}

const LogOutButton = () => {
  return /* @__PURE__ */ jsxs(
    "a",
    {
      onClick: (e) => {
        e.preventDefault();
        LogOut();
        setTimeout(() => {
          window.location.href = "/";
        }, 1e3);
      },
      className: "flex cursor-pointer items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-300 group dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 transition-colors duration-200",
      children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            className: "flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white",
            "aria-hidden": "true",
            xmlns: "http://www.w3.org/2000/svg",
            width: "24",
            height: "24",
            fill: "none",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "2",
                d: "M20 12H8m-4 0 4-4m-4 4 4 4M15 4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "flex-1 ml-3 text-left whitespace-nowrap", children: "Logout" })
      ]
    }
  );
};

const $$SidebarTools = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<li> <a href="/History" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"> <svg class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"> <path d="M0 0h24v24H0V0z" fill="none"></path> <path d="M13 3a9 9 0 00-9 9H1l3.89 3.89.07.14L9 12H5a7 7 0 017-7 7 7 0 017 7 7 7 0 01-7 7 6.99 6.99 0 01-6.93-6H3a9 9 0 109-9zm-1 5v4l3.62 2.16.75-1.23-2.87-1.68V8H12z"></path> </svg> <span class="flex-1 ms-3 whitespace-nowrap">History</span> </a> </li> <li> ${renderComponent($$result, "LogOutButton", LogOutButton, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Justo/Desktop/tango-jets-fe/src/components/buttons/LogOutButton", "client:component-export": "LogOutButton" })} </li>`;
}, "C:/Users/Justo/Desktop/tango-jets-fe/src/components/sidebar/SidebarTools.astro", void 0);

const $$Sidebar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<aside id="sidebar-multi-level-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full" aria-label="Sidebar"> <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800"> <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" class="absolute right-0 -mr-12 inline-flex items-center p-2 text-sm text-gray-500 rounded-r-lg bg-gray-800 ring-gray-600"> <span class="sr-only">Open sidebar</span> <svg class="w-8 h-8 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"></path> </svg> </button> <ul class="space-y-8 font-medium"> <li> <a href="/Home" class="flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-300 group dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 transition-colors duration-200"> <svg fill="currentColor" class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"> <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path> <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path> </svg> <span class="ml-3" sidebar-toggle-item>Home</span> </a> </li> ${renderComponent($$result, "SidebarNodrop", $$SidebarNodrop, {})} ${renderComponent($$result, "SidebarTools", $$SidebarTools, {})} </ul> </div> </aside> ${renderScript($$result, "C:/Users/Justo/Desktop/tango-jets-fe/src/components/sidebar/Sidebar.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Justo/Desktop/tango-jets-fe/src/components/sidebar/Sidebar.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', "><title>", "</title>", '</head> <body class="flex h-screen m-0 font-sans"> ', ' <div class="flex-1 flex justify-center items-center p-5 bg-gradient-to-r from-gray-800 to-slate-600 text-white"> ', ' </div> <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"><\/script> </body> </html>'])), addAttribute(Astro2.generator, "content"), title, renderHead(), renderComponent($$result, "Sidebar", $$Sidebar, { "class": "w-64 bg-gray-200 p-5" }), renderSlot($$result, $$slots["default"]));
}, "C:/Users/Justo/Desktop/tango-jets-fe/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
