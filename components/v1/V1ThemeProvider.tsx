'use client'

import { createContext, useContext } from 'react'
import type { CSSProperties } from 'react'
import { DEFAULT_SITE_CONFIG } from '@/lib/cms/site-defaults'
import type { SiteConfig } from '@/lib/cms/types'

const SiteConfigContext = createContext<SiteConfig>(DEFAULT_SITE_CONFIG)

export function useSiteConfig() {
  return useContext(SiteConfigContext)
}

export function V1ThemeProvider({ children, site }: { children: React.ReactNode; site: SiteConfig }) {
  const { theme } = site
  const style = {
    '--background': theme.pageBackground,
    '--foreground': theme.primaryDark,
    '--card': theme.cardBackground,
    '--card-foreground': theme.primaryDark,
    '--popover': theme.cardBackground,
    '--popover-foreground': theme.primaryDark,
    '--primary': theme.primary,
    '--primary-foreground': '#ffffff',
    '--secondary': theme.accent,
    '--secondary-foreground': '#ffffff',
    '--muted': theme.mutedBackground,
    '--muted-foreground': theme.bodyText,
    '--accent': theme.accent,
    '--accent-foreground': '#ffffff',
    '--border': theme.border,
    '--input': theme.mutedBackground,
    '--ring': theme.primary,
    '--v1-header-bg': `color-mix(in srgb, ${theme.headerBackground} ${theme.headerOpacity}%, transparent)`,
    '--v1-header-foreground': theme.headerText,
    '--v1-header-hover': theme.headerHoverText,
    '--v1-footer-bg': theme.footerBackground,
    '--v1-footer-foreground': theme.footerText,
    '--v1-footer-link': theme.footerLink,
    '--v1-section-bg': theme.mutedBackground,
    '--v1-button-bg': `linear-gradient(90deg, ${theme.primary}, ${theme.accent})`,
    '--v1-card-radius': '0.25rem',
    '--v1-why-bg': theme.cardBackground,
    '--v1-why-hover-bg': `linear-gradient(135deg, ${theme.primaryDark}, ${theme.primary})`,
    '--v1-why-hover-foreground': '#ffffff',
    fontFamily: `${theme.fontFamily}, ui-sans-serif, system-ui, sans-serif`,
  } as CSSProperties

  return (
    <SiteConfigContext.Provider value={site}>
      <div data-v1-theme="business" className="min-h-screen" style={style}>
        {children}
      <style jsx global>{`
        [data-v1-theme='business'] {
          --radius: 0.25rem;
          background: var(--background);
          color: var(--foreground);
        }
      `}</style>
      </div>
    </SiteConfigContext.Provider>
  )
}
