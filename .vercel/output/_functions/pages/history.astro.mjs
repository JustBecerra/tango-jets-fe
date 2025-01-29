/* empty css                                    */
import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_DwpHebLD.mjs';
import 'kleur/colors';
import { T as TableModal } from '../chunks/TableModal_D8F2EcZ1.mjs';
import { $ as $$Layout } from '../chunks/actions_MIoFgvcc.mjs';
export { renderers } from '../renderers.mjs';

const $$History = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "History" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "RouteGuard", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/Justo/Desktop/tango-jets-fe/src/components/routeguard", "client:component-export": "RouteGuard" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="flex"> ${renderComponent($$result3, "TableModal", TableModal, { "caseType": "history", "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Justo/Desktop/tango-jets-fe/src/components/table/TableModal", "client:component-export": "default" })} </div> ` })} ` })}`;
}, "C:/Users/Justo/Desktop/tango-jets-fe/src/pages/History.astro", void 0);

const $$file = "C:/Users/Justo/Desktop/tango-jets-fe/src/pages/History.astro";
const $$url = "/History";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$History,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
