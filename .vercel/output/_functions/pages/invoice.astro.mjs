/* empty css                                    */
import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_DwpHebLD.mjs';
import 'kleur/colors';
import { $ as $$ClientLayout } from '../chunks/ClientLayout_Dm5D5PY9.mjs';
export { renderers } from '../renderers.mjs';

const $$Invoice = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "ClientLayout", $$ClientLayout, { "title": "Invoice" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div></div>` })}`;
}, "C:/Users/Justo/Desktop/tango-jets-fe/src/pages/Invoice.astro", void 0);

const $$file = "C:/Users/Justo/Desktop/tango-jets-fe/src/pages/Invoice.astro";
const $$url = "/Invoice";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Invoice,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
