import React from 'react'
import { Navigate, useLocation } from 'dumi'

export default function LegacyRedirect() {
  const { pathname, search, hash } = useLocation()
  const canonicalPath = pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '')

  return <Navigate replace to={`${canonicalPath}${search}${hash}`} />
}
