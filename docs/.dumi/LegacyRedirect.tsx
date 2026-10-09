import { useEffect } from 'react'
import { history, useLocation } from 'dumi'

export default function LegacyRedirect() {
  const { pathname, search, hash } = useLocation()
  const canonicalPath = pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '')

  useEffect(() => {
    history.replace(`${canonicalPath}${search}${hash}`)
  }, [canonicalPath, search, hash])

  return null
}
