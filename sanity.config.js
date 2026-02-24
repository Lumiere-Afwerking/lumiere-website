import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import maker from './src/schemas/maker'

export default defineConfig({
  name: 'lumiere-dashboard',
  title: 'Lumière Beheer',
  projectId: '63ghbydx',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: [maker],
  },
})
