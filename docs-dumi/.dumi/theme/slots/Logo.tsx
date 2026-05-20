import { Link, useLocale, useSiteData } from 'dumi'
import React from 'react'

function resolveLogoSrc(logo: string | false | undefined, base: string): string | undefined {
  if (!logo || logo === false) return undefined
  if (/^https?:\/\//.test(logo)) return logo
  const normalizedBase = base.replace(/\/$/, '') || ''
  const normalizedLogo = logo.startsWith('/') ? logo : `/${logo}`
  return `${normalizedBase}${normalizedLogo}`
}

/** 修正 base 下 logo 路径；img 使用空 alt，避免加载失败时与站点名重复显示 */
export default function Logo() {
  const { themeConfig } = useSiteData()
  const locale = useLocale()
  const home = 'base' in locale ? locale.base : '/'
  const logoSrc = resolveLogoSrc(themeConfig.logo, home)

  return (
    <Link className="dumi-default-logo" to={home} aria-label={themeConfig.name}>
      {themeConfig.logo !== false && logoSrc ? (
        <img src={logoSrc} alt="" />
      ) : null}
      {themeConfig.name}
    </Link>
  )
}
