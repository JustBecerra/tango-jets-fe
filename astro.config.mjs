// @ts-check
import { defineConfig } from 'astro/config';

import vercel from "@astrojs/vercel/serverless"

import react from "@astrojs/react"

import tailwind from "@astrojs/tailwind"

// https://astro.build/config
export default defineConfig({
	adapter: vercel({
		webAnalytics: {
			enabled: true,
		},
	}),
	output: "server",
	integrations: [react(), tailwind()],
})