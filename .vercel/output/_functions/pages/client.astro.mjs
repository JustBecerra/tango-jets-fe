/* empty css                                    */
import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_DwpHebLD.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/actions_Cnex7xBx.mjs';
import { T as TableModal } from '../chunks/TableModal_Bo7EgbIL.mjs';
import { R as RouteGuard } from '../chunks/index_COhuEBoF.mjs';
export { renderers } from '../renderers.mjs';

const $$Client = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Clients" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "RouteGuard", RouteGuard, { "client:load": "react", "client:component-hydration": "load", "client:component-path": "C:/Users/Justo/Desktop/tango-jets-fe/src/components/routeguard", "client:component-export": "RouteGuard" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col space-y-4"> <div> ${renderComponent($$result3, "TableModal", TableModal, { "caseType": "client", "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Justo/Desktop/tango-jets-fe/src/components/table/TableModal", "client:component-export": "default" })} </div> </div> ` })} ` })}`;
}, "C:/Users/Justo/Desktop/tango-jets-fe/src/pages/Client.astro", void 0);

const $$file = "C:/Users/Justo/Desktop/tango-jets-fe/src/pages/Client.astro";
const $$url = "/Client";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Client,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
