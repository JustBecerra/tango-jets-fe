import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DVz91IXG.mjs';
import 'es-module-lexer';
import { g as decodeKey } from './chunks/astro/server_DwpHebLD.mjs';
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

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Justo/Desktop/tango-jets-fe/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"[data-astro-image]{width:100%;height:auto;-o-object-fit:var(--fit);object-fit:var(--fit);-o-object-position:var(--pos);object-position:var(--pos);aspect-ratio:var(--w) / var(--h)}[data-astro-image=responsive]{max-width:calc(var(--w) * 1px);max-height:calc(var(--h) * 1px)}[data-astro-image=fixed]{width:calc(var(--w) * 1px);height:calc(var(--h) * 1px)}\n"}],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/Airships.jLmAeTUX.css"}],"routeData":{"route":"/airships","isIndex":false,"type":"page","pattern":"^\\/Airships\\/?$","segments":[[{"content":"Airships","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Airships.astro","pathname":"/Airships","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/Airships.jLmAeTUX.css"}],"routeData":{"route":"/client","isIndex":false,"type":"page","pattern":"^\\/Client\\/?$","segments":[[{"content":"Client","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Client.astro","pathname":"/Client","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/Airships.jLmAeTUX.css"}],"routeData":{"route":"/history","isIndex":false,"type":"page","pattern":"^\\/History\\/?$","segments":[[{"content":"History","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/History.astro","pathname":"/History","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/Airships.jLmAeTUX.css"}],"routeData":{"route":"/home","isIndex":false,"type":"page","pattern":"^\\/Home\\/?$","segments":[[{"content":"Home","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Home.astro","pathname":"/Home","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/Airships.jLmAeTUX.css"}],"routeData":{"route":"/invoice","isIndex":false,"type":"page","pattern":"^\\/Invoice\\/?$","segments":[[{"content":"Invoice","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Invoice.astro","pathname":"/Invoice","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/Airships.jLmAeTUX.css"},{"type":"external","src":"/_astro/Quote.BjIYm04z.css"}],"routeData":{"route":"/quote","isIndex":false,"type":"page","pattern":"^\\/Quote\\/?$","segments":[[{"content":"Quote","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Quote.astro","pathname":"/Quote","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/Airships.jLmAeTUX.css"}],"routeData":{"route":"/scheduler","isIndex":false,"type":"page","pattern":"^\\/Scheduler\\/?$","segments":[[{"content":"Scheduler","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Scheduler.astro","pathname":"/Scheduler","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/Airships.jLmAeTUX.css"}],"routeData":{"route":"/trip/[trip]","isIndex":false,"type":"page","pattern":"^\\/trip\\/([^/]+?)\\/?$","segments":[[{"content":"trip","dynamic":false,"spread":false}],[{"content":"trip","dynamic":true,"spread":false}]],"params":["trip"],"component":"src/pages/trip/[trip].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/Airships.jLmAeTUX.css"}],"routeData":{"route":"/trips","isIndex":false,"type":"page","pattern":"^\\/Trips\\/?$","segments":[[{"content":"Trips","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Trips.astro","pathname":"/Trips","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/Airships.jLmAeTUX.css"},{"type":"external","src":"/_astro/index.BE4BdE5o.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Justo/Desktop/tango-jets-fe/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Justo/Desktop/tango-jets-fe/src/pages/Invoice.astro",{"propagation":"none","containsHead":true}],["C:/Users/Justo/Desktop/tango-jets-fe/src/pages/Quote.astro",{"propagation":"none","containsHead":true}],["C:/Users/Justo/Desktop/tango-jets-fe/src/pages/Airships.astro",{"propagation":"none","containsHead":true}],["C:/Users/Justo/Desktop/tango-jets-fe/src/pages/Client.astro",{"propagation":"none","containsHead":true}],["C:/Users/Justo/Desktop/tango-jets-fe/src/pages/History.astro",{"propagation":"none","containsHead":true}],["C:/Users/Justo/Desktop/tango-jets-fe/src/pages/Home.astro",{"propagation":"none","containsHead":true}],["C:/Users/Justo/Desktop/tango-jets-fe/src/pages/Scheduler.astro",{"propagation":"none","containsHead":true}],["C:/Users/Justo/Desktop/tango-jets-fe/src/pages/Trips.astro",{"propagation":"none","containsHead":true}],["C:/Users/Justo/Desktop/tango-jets-fe/src/pages/trip/[trip].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/Airships@_@astro":"pages/airships.astro.mjs","\u0000@astro-page:src/pages/Client@_@astro":"pages/client.astro.mjs","\u0000@astro-page:src/pages/History@_@astro":"pages/history.astro.mjs","\u0000@astro-page:src/pages/Invoice@_@astro":"pages/invoice.astro.mjs","\u0000@astro-page:src/pages/Trips@_@astro":"pages/trips.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/Home@_@astro":"pages/home.astro.mjs","\u0000@astro-page:src/pages/Scheduler@_@astro":"pages/scheduler.astro.mjs","\u0000@astro-page:src/pages/Quote@_@astro":"pages/quote.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/trip/[trip]@_@astro":"pages/trip/_trip_.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","C:/Users/Justo/Desktop/tango-jets-fe/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","C:/Users/Justo/Desktop/tango-jets-fe/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_Cl2CLs3P.mjs","C:/Users/Justo/Desktop/tango-jets-fe/src/components/Home/DepartingSoon.tsx":"_astro/DepartingSoon.CGIiJ84b.js","C:/Users/Justo/Desktop/tango-jets-fe/src/components/Home/ClientTable.tsx":"_astro/ClientTable.yMlNnm2-.js","C:/Users/Justo/Desktop/tango-jets-fe/src/components/Home/MissingInfoCli.tsx":"_astro/MissingInfoCli.5wccaNLp.js","C:/Users/Justo/Desktop/tango-jets-fe/src/components/Home/InFlight.tsx":"_astro/InFlight.Cdj-PuPu.js","C:/Users/Justo/Desktop/tango-jets-fe/src/components/Home/RecentlyLanded.tsx":"_astro/RecentlyLanded.BRcPgq-D.js","\u0000@astrojs-manifest":"manifest_DokpbCyW.mjs","C:/Users/Justo/Desktop/tango-jets-fe/src/components/routeguard":"_astro/routeguard.TVuHET1n.js","C:/Users/Justo/Desktop/tango-jets-fe/src/components/sidebar/Sidebar.astro?astro&type=script&index=0&lang.ts":"_astro/Sidebar.astro_astro_type_script_index_0_lang.BY2q_bZh.js","C:/Users/Justo/Desktop/tango-jets-fe/src/components/cargadorDeTablas/Datitos":"_astro/Datitos.D3wQhPhg.js","C:/Users/Justo/Desktop/tango-jets-fe/src/components/scheduler/SchedulerFrame":"_astro/SchedulerFrame.C5LaDcIi.js","C:/Users/Justo/Desktop/tango-jets-fe/src/components/buttons/LogOutButton":"_astro/LogOutButton.TlQYEn8O.js","C:/Users/Justo/Desktop/tango-jets-fe/src/components/cards/LoginCard":"_astro/LoginCard.0UOLQwd8.js","C:/Users/Justo/Desktop/tango-jets-fe/src/components/stepper/EditStepperFrame":"_astro/EditStepperFrame.CH9xL879.js","@astrojs/react/client.js":"_astro/client.Dg6aVV9b.js","C:/Users/Justo/Desktop/tango-jets-fe/src/components/table/TableModal":"_astro/TableModal.BlQNE0Wh.js","C:/Users/Justo/Desktop/tango-jets-fe/src/components/text/WelcomeText":"_astro/WelcomeText.CtvN5fcB.js","C:/Users/Justo/Desktop/tango-jets-fe/src/components/cards/MapCard":"_astro/MapCard.C2K5IbFv.js","react-toastify":"_astro/_astro-entry_react-toastify.kc6FPfE6.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/Justo/Desktop/tango-jets-fe/src/components/sidebar/Sidebar.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){const e=document.querySelector('[data-drawer-toggle=\"sidebar-multi-level-sidebar\"]'),t=document.getElementById(\"sidebar-multi-level-sidebar\");e&&t&&e.addEventListener(\"click\",()=>{t.classList.toggle(\"-translate-x-full\")})});"]],"assets":["/_astro/Airships.jLmAeTUX.css","/_astro/Quote.BjIYm04z.css","/_astro/index.BE4BdE5o.css","/tangojet.png","/_astro/actions.DqSaCuXh.js","/_astro/actions.RyZlm8nd.js","/_astro/client.Dg6aVV9b.js","/_astro/ClientTable.yMlNnm2-.js","/_astro/Datitos.D3wQhPhg.js","/_astro/DepartingSoon.CGIiJ84b.js","/_astro/EditStepperFrame.CH9xL879.js","/_astro/FlightInfo.2x8-ErIO.js","/_astro/getCookie.CtV4NB4x.js","/_astro/index.Cb2GqDXq.js","/_astro/index.CqbGxsOR.js","/_astro/index.D2MAbzvX.js","/_astro/InFlight.Cdj-PuPu.js","/_astro/jsx-runtime.CDeAccHH.js","/_astro/LoaderSpinner.t290QIza.js","/_astro/LoginCard.0UOLQwd8.js","/_astro/LogOutButton.TlQYEn8O.js","/_astro/MapCard.C2K5IbFv.js","/_astro/MissingInfoCli.5wccaNLp.js","/_astro/RecentlyLanded.BRcPgq-D.js","/_astro/routeguard.TVuHET1n.js","/_astro/SchedulerFrame.C5LaDcIi.js","/_astro/TableModal.BlQNE0Wh.js","/_astro/WelcomeText.CtvN5fcB.js","/_astro/_astro-entry_react-toastify.kc6FPfE6.js","/_astro/_astro-entry_react-toastify.mWK9xxhi.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"3F1XOMsRG+msOBlFJaUSWguexTRowowlUcCrlSGPX4I=","envGetSecretEnabled":true});

export { manifest };
