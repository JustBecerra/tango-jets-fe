// @ts-check
import { defineConfig } from 'astro/config';
import node from "@astrojs/node"
import vercel from "@astrojs/vercel"

import react from "@astrojs/react"

import tailwind from "@astrojs/tailwind"

// https://astro.build/config
export default defineConfig({
	adapter: node({ mode: "standalone" }),
	output: "server",
	integrations: [react(), tailwind()],
	outDir: "dist",
})