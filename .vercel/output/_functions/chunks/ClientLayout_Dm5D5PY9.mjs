import { c as createComponent, r as renderTemplate, m as maybeRenderHead, b as renderSlot, a as renderComponent, d as renderHead, e as addAttribute, f as createAstro } from './astro/server_DwpHebLD.mjs';
import 'kleur/colors';
import 'clsx';

const $$ClientTopBar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="bg-gray-600 w-full h-[90px] flex justify-center items-center"> <h1 class="text-white text-3xl">Tango Jets</h1> </div>`;
}, "C:/Users/Justo/Desktop/tango-jets-fe/src/components/TopBar/ClientTopBar.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$ClientLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ClientLayout;
  const { title } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', "><title>", "</title>", '</head> <body class="flex flex-col items-center h-screen m-0 font-sans"> ', ' <div class="flex-1 w-[90%] my-4 flex-col flex justify-around items-center"> ', ' </div> <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"><\/script> </body> </html>'])), addAttribute(Astro2.generator, "content"), title, renderHead(), renderComponent($$result, "ClientTopBar", $$ClientTopBar, {}), renderSlot($$result, $$slots["default"]));
}, "C:/Users/Justo/Desktop/tango-jets-fe/src/layouts/ClientLayout.astro", void 0);

export { $$ClientLayout as $ };
