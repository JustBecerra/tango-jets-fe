// @ts-check
import { defineConfig } from 'astro/config';

import vercel from "@astrojs/vercel"

import react from "@astrojs/react"

import tailwind from "@astrojs/tailwind"

// https://astro.build/config
export default defineConfig({
	adapter: vercel({ edgeMiddleware: true }),
	output: "static",
	integrations: [react(), tailwind()],
})