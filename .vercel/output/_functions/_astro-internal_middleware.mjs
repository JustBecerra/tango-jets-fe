import { d as defineMiddleware, s as sequence } from './chunks/index_CTokikKv.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_aEzy-Ix5.mjs';
import 'cookie';

function parseCookies(cookieHeader) {
  if (!cookieHeader) return {};
  return Object.fromEntries(
    cookieHeader.split("; ").map((cookie) => cookie.split("="))
  );
}
const onRequest$1 = defineMiddleware((context, next) => {
  if (context.url.pathname !== "/") {
    const cookieHeader = context.request.headers.get("cookie");
    const cookies = parseCookies(cookieHeader || "");
    const authToken = cookies.authToken;
    if (!authToken || authToken.length === 0) {
      return Response.redirect(new URL("/", context.url), 302);
    }
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
