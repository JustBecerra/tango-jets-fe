import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CISO6tC5.mjs';
import 'es-module-lexer';
import { d as decodeKey } from './chunks/astro/server_BA58THLa.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Justo/Desktop/tango-jets-fe/","adapterName":"@astrojs/vercel","routes":[{"file":"History/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/history","isIndex":false,"type":"page","pattern":"^\\/History\\/?$","segments":[[{"content":"History","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/History.astro","pathname":"/History","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"Home/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/home","isIndex":false,"type":"page","pattern":"^\\/Home\\/?$","segments":[[{"content":"Home","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Home.astro","pathname":"/Home","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"[data-astro-image]{width:100%;height:auto;-o-object-fit:var(--fit);object-fit:var(--fit);-o-object-position:var(--pos);object-position:var(--pos);aspect-ratio:var(--w) / var(--h)}[data-astro-image=responsive]{max-width:calc(var(--w) * 1px);max-height:calc(var(--h) * 1px)}[data-astro-image=fixed]{width:calc(var(--w) * 1px);height:calc(var(--h) * 1px)}\n"}],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/Airships.BF2WJO5y.css"}],"routeData":{"route":"/airships","isIndex":false,"type":"page","pattern":"^\\/Airships\\/?$","segments":[[{"content":"Airships","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Airships.astro","pathname":"/Airships","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/Airships.BF2WJO5y.css"}],"routeData":{"route":"/client","isIndex":false,"type":"page","pattern":"^\\/Client\\/?$","segments":[[{"content":"Client","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Client.astro","pathname":"/Client","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/Airships.BF2WJO5y.css"}],"routeData":{"route":"/flights","isIndex":false,"type":"page","pattern":"^\\/Flights\\/?$","segments":[[{"content":"Flights","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Flights.astro","pathname":"/Flights","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Justo/Desktop/tango-jets-fe/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Justo/Desktop/tango-jets-fe/src/pages/Airships.astro",{"propagation":"none","containsHead":true}],["C:/Users/Justo/Desktop/tango-jets-fe/src/pages/Client.astro",{"propagation":"none","containsHead":true}],["C:/Users/Justo/Desktop/tango-jets-fe/src/pages/Flights.astro",{"propagation":"none","containsHead":true}],["C:/Users/Justo/Desktop/tango-jets-fe/src/pages/History.astro",{"propagation":"none","containsHead":true}],["C:/Users/Justo/Desktop/tango-jets-fe/src/pages/Home.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/History@_@astro":"pages/history.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/Home@_@astro":"pages/home.astro.mjs","\u0000@astro-page:src/pages/Airships@_@astro":"pages/airships.astro.mjs","\u0000@astro-page:src/pages/Client@_@astro":"pages/client.astro.mjs","\u0000@astro-page:src/pages/Flights@_@astro":"pages/flights.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","C:/Users/Justo/Desktop/tango-jets-fe/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","C:/Users/Justo/Desktop/tango-jets-fe/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_nUDQwyxo.mjs","\u0000@astrojs-manifest":"manifest_D3GQmvea.mjs","C:/Users/Justo/Desktop/tango-jets-fe/src/components/routeguard":"_astro/routeguard.4LIvqZmY.js","C:/Users/Justo/Desktop/tango-jets-fe/src/components/text/WelcomeText":"_astro/WelcomeText.C4c3H-FL.js","C:/Users/Justo/Desktop/tango-jets-fe/src/components/sidebar/Sidebar.astro?astro&type=script&index=0&lang.ts":"_astro/Sidebar.astro_astro_type_script_index_0_lang.BY2q_bZh.js","C:/Users/Justo/Desktop/tango-jets-fe/src/components/modals/ModalJetAdd":"_astro/ModalJetAdd.DINyXT2A.js","C:/Users/Justo/Desktop/tango-jets-fe/src/components/modals/ModalAdd":"_astro/ModalAdd.Dno38q6E.js","C:/Users/Justo/Desktop/tango-jets-fe/src/components/buttons/LogOutButton":"_astro/LogOutButton.BMZgd9r1.js","C:/Users/Justo/Desktop/tango-jets-fe/src/components/cards/LoginCard":"_astro/LoginCard.D2h5Ae8h.js","C:/Users/Justo/Desktop/tango-jets-fe/src/components/modals/ModalFlightAdd":"_astro/ModalFlightAdd.Kh-gA8ng.js","@astrojs/react/client.js":"_astro/client.5fSHUxCV.js","C:/Users/Justo/Desktop/tango-jets-fe/src/components/table/TableModal":"_astro/TableModal.CI8crUGx.js","react-toastify":"_astro/_astro-entry_react-toastify.DmMUb9js.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/Justo/Desktop/tango-jets-fe/src/components/sidebar/Sidebar.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){const e=document.querySelector('[data-drawer-toggle=\"sidebar-multi-level-sidebar\"]'),t=document.getElementById(\"sidebar-multi-level-sidebar\");e&&t&&e.addEventListener(\"click\",()=>{t.classList.toggle(\"-translate-x-full\")})});"]],"assets":["/_astro/Airships.BF2WJO5y.css","/_astro/index.BE4BdE5o.css","/favicon.svg","/_astro/client.5fSHUxCV.js","/_astro/getCookie.CtV4NB4x.js","/_astro/index.C291zMz-.js","/_astro/index.Cb2GqDXq.js","/_astro/index.D2MAbzvX.js","/_astro/index.PNmVJ4X_.js","/_astro/jsx-runtime.CDeAccHH.js","/_astro/LoaderSpinner.CfQz51-n.js","/_astro/LoginCard.D2h5Ae8h.js","/_astro/LogOutButton.BMZgd9r1.js","/_astro/ModalAdd.Dno38q6E.js","/_astro/ModalFlightAdd.Kh-gA8ng.js","/_astro/ModalJetAdd.DINyXT2A.js","/_astro/routeguard.4LIvqZmY.js","/_astro/TableModal.CI8crUGx.js","/_astro/WelcomeText.C4c3H-FL.js","/_astro/_astro-entry_react-toastify.CM4g0nZl.js","/_astro/_astro-entry_react-toastify.DmMUb9js.js","/History/index.html","/Home/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"KGMymepoleq52qSmWg6RzBquzgIrCUm7+Fop/8hp3Dk=","envGetSecretEnabled":true});

export { manifest };
