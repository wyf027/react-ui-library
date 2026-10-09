import type { IApi } from 'dumi'
import path from 'node:path'

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
        if (route.file?.endsWith('.md')) {
          const id = `${route.id}-legacy-html`
          const legacyPath = route.absPath === '/' ? '/index.html' : `${route.absPath}.html`
          routes[id] = {
            id,
            parentId: route.parentId,
            path: legacyPath.slice(1),
            absPath: legacyPath,
            file: path.join(api.cwd, '.dumi/LegacyRedirect.tsx'),
          }
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
