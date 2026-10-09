import type { IApi } from 'dumi'

export default function legacyRoutes(api: IApi) {
  api.modifyRoutes({
    stage: 200,
    fn(routes) {
      for (const route of Object.values(routes)) {
        // The docs workspace also contains installed package READMEs.
        if (route.file?.includes('/node_modules/') && route.file.endsWith('.md')) {
          delete routes[route.id]
          continue
        }
        if (route.file?.endsWith('.md') && route.absPath !== '/') {
          const id = `${route.id}-legacy-html`
          routes[id] = { ...route, id, path: `${route.path}.html`, absPath: `${route.absPath}.html` }
        }
      }
      return routes
    },
  })

  api.modifyExportHTMLFiles({
    before: 'exportStatic',
    fn(files) {
      for (const entry of api.appData.exportHtmlData) {
        if (entry.route.path.endsWith('.html')) {
          entry.file = entry.route.path.slice(1)
        }
      }
      return files
    },
  })
}
