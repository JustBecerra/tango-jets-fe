/* empty css                                    */
import { c as createComponent, r as renderTemplate, f as renderSlot, g as renderHead, h as addAttribute, b as createAstro, a as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_BhDw4P4A.mjs';
import 'kleur/colors';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { toast, Bounce, ToastContainer } from 'react-toastify';
import { L as LoaderSpinner } from '../chunks/LoaderSpinner_ALWPhgDz.mjs';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

function setCookie(name, value, days) {
  let expires = "";
  {
    const date = /* @__PURE__ */ new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1e3);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ""}${expires}; path=/; SameSite=None; Secure;`;
}

async function loginScheduler({ username, password }) {
  const responseToken = await fetch(
    `${"https://vuelos-be.onrender.com"}/scheduler/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    }
  ).then((response) => response.json());
  const responseUserInfo = await fetch(
    `${"https://vuelos-be.onrender.com"}/scheduler`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${responseToken.token}`
      }
    }
  ).then((response) => response.json());
  try {
    const token = responseToken.token;
    const username2 = responseUserInfo.username;
    const role = responseUserInfo.role;
    setCookie("authToken", token, 1);
    setCookie("username", username2, 1);
    setCookie("role", role, 1);
    return responseToken;
  } catch (err) {
    console.error(err);
  }
}

const LoginCard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      setLoading(true);
      try {
        const login = await loginScheduler({
          username: email,
          password
        });
        if (login.message === "Logged in successfully!") {
          window.location.href = `/Home`;
        } else {
          toast.error("Credentials are not valid.", {
            position: "top-center",
            autoClose: 5e3,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: void 0,
            theme: "dark",
            transition: Bounce
          });
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("An error occurred during login.", {
          position: "top-center",
          autoClose: 5e3,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: void 0,
          theme: "dark",
          transition: Bounce
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please fill in both fields", {
        position: "top-center",
        autoClose: 5e3,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: void 0,
        theme: "dark",
        transition: Bounce
      });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-full items-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-6 text-white", children: "Welcome!" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleLogin, className: "w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 w-full", children: [
        /* @__PURE__ */ jsx("div", { className: "flex flex-col items-start w-full", children: /* @__PURE__ */ jsx(
          "input",
          {
            className: "w-full rounded-full px-4 py-2 text-black",
            placeholder: "Enter Email",
            value: email,
            onChange: (e) => setEmail(e.target.value)
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col items-start", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              className: "w-full rounded-full px-4 py-2 text-black pr-10",
              type: showPassword ? "text" : "password",
              placeholder: "Enter Password",
              value: password,
              onChange: (e) => setPassword(e.target.value)
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              id: "togglePassword",
              className: "focus:outline-none -ml-8",
              onClick: () => setShowPassword((prev) => !prev),
              children: showPassword ? /* @__PURE__ */ jsxs(
                "svg",
                {
                  className: "w-6 h-6 text-black",
                  "aria-hidden": "true",
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "24",
                  height: "24",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  children: [
                    /* @__PURE__ */ jsx(
                      "path",
                      {
                        stroke: "currentColor",
                        strokeWidth: "2",
                        d: "M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "path",
                      {
                        stroke: "currentColor",
                        strokeWidth: "2",
                        d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      }
                    )
                  ]
                }
              ) : /* @__PURE__ */ jsx(
                "svg",
                {
                  className: "w-6 h-6 text-black",
                  "aria-hidden": "true",
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "24",
                  height: "24",
                  fill: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      fillRule: "evenodd",
                      d: "M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
                      clipRule: "evenodd"
                    }
                  )
                }
              )
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "mt-6 border-2 text-white border-gray-200 border-solid w-fit rounded-full px-4 py-2 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-700 hover:border-gray-700",
          children: loading ? /* @__PURE__ */ jsx(LoaderSpinner, {}) : "Login"
        }
      )
    ] })
  ] });
};

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$LoginLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LoginLayout;
  const { title } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', "><title>", "</title>", '</head> <body class="flex h-screen m-0 font-sans bg-gray-50"> <div class="flex-1 flex justify-center items-center p-5 bg-gradient-to-r from-gray-800 to-slate-600 text-gray-800"> ', ' </div> <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"><\/script> </body> </html>'])), addAttribute(Astro2.generator, "content"), title, renderHead(), renderSlot($$result, $$slots["default"]));
}, "C:/Users/Justo/Desktop/tango-jets-fe/src/layouts/LoginLayout.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LoginLayout", $$LoginLayout, { "title": "Login" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen flex flex-col items-center justify-center"> ${renderComponent($$result2, "ToastContainer", ToastContainer, { "client:load": true, "client:component-hydration": "load", "client:component-path": "react-toastify", "client:component-export": "ToastContainer" })} <div class="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg w-[400px] shadow-lg text-center mx-auto"> ${renderComponent($$result2, "LoginCard", LoginCard, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Justo/Desktop/tango-jets-fe/src/components/cards/LoginCard", "client:component-export": "LoginCard" })} </div> </div> ` })}`;
}, "C:/Users/Justo/Desktop/tango-jets-fe/src/pages/index.astro", void 0);

const $$file = "C:/Users/Justo/Desktop/tango-jets-fe/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
