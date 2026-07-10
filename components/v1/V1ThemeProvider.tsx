'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type V1ThemeId = 'warm' | 'tech' | 'business' | 'amber' | 'berry' | 'nature'

type V1Theme = {
  id: V1ThemeId
  name: string
}

const themes: V1Theme[] = [
  { id: 'warm', name: '温暖粉橙风' },
  { id: 'tech', name: '现代科技工业风' },
  { id: 'business', name: '极简专业商务风' },
  { id: 'amber', name: '琥珀睿智风' },
  { id: 'berry', name: '浆果极客风' },
  { id: 'nature', name: '包豪斯极简叙事风' },
]

const V1ThemeContext = createContext<{
  theme: V1Theme
  themes: V1Theme[]
  setTheme: (id: V1ThemeId) => void
} | null>(null)

export function V1ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useState<V1ThemeId>('warm')

  useEffect(() => {
    const saved = window.localStorage.getItem('v1-theme') as V1ThemeId | null
    if (saved && themes.some((theme) => theme.id === saved)) setThemeId(saved)
  }, [])

  function setTheme(id: V1ThemeId) {
    setThemeId(id)
    window.localStorage.setItem('v1-theme', id)
  }

  const value = useMemo(() => ({ theme: themes.find((item) => item.id === themeId) || themes[0], themes, setTheme }), [themeId])

  return (
    <V1ThemeContext.Provider value={value}>
      <div data-v1-theme={themeId} className="min-h-screen">
        {children}
      </div>
      <style jsx global>{`
        [data-v1-theme='warm'] {
          --background: #fff8f5;
          --foreground: #1f2937;
          --card: #ffffff;
          --card-foreground: #1f2937;
          --popover: #ffffff;
          --popover-foreground: #1f2937;
          --primary: #e5004f;
          --primary-foreground: #ffffff;
          --secondary: #ffe9e3;
          --secondary-foreground: #1f2937;
          --muted: #ffe9e3;
          --muted-foreground: #6b7280;
          --accent: #ff6b35;
          --accent-foreground: #ffffff;
          --border: #f4d5cd;
          --input: #fff4f1;
          --ring: #e5004f;
          --radius: 0.5rem;
          --v1-header-bg: linear-gradient(90deg, rgba(255,244,241,0.95), rgba(255,233,227,0.95), rgba(255,212,198,0.95));
          --v1-footer-bg: linear-gradient(135deg, #fff4f1, #ffe9e3, #ffd4c6);
          --v1-footer-foreground: #1f2937;
          --v1-section-bg: #f7f7f8;
          --v1-button-bg: linear-gradient(90deg, #e5004f, #ff6b35);
          --v1-card-radius: 0.5rem;
          --v1-why-bg: #fff4f1;
          --v1-why-hover-bg: linear-gradient(135deg, #e5004f, #ff6b35);
          --v1-why-hover-foreground: #ffffff;
        }
        [data-v1-theme='tech'] {
          --background: #f8fafc;
          --foreground: #334155;
          --card: #ffffff;
          --card-foreground: #334155;
          --popover: #ffffff;
          --popover-foreground: #334155;
          --primary: #e5004f;
          --primary-foreground: #ffffff;
          --secondary: #1e293b;
          --secondary-foreground: #ffffff;
          --muted: #f1f5f9;
          --muted-foreground: #64748b;
          --accent: #ff7a45;
          --accent-foreground: #ffffff;
          --border: #dbe4ef;
          --input: #f1f5f9;
          --ring: #1e293b;
          --radius: 0.375rem;
          --v1-header-bg: linear-gradient(180deg, rgba(241,245,249,0.98), rgba(255,255,255,0.96));
          --v1-footer-bg: linear-gradient(135deg, #1e293b, #334155);
          --v1-footer-foreground: #ffffff;
          --v1-section-bg: #f1f5f9;
          --v1-button-bg: linear-gradient(90deg, #1e293b, #ff7a45);
          --v1-card-radius: 0.375rem;
          --v1-why-bg: #f1f5f9;
          --v1-why-hover-bg: linear-gradient(135deg, #1e293b, #ff7a45);
          --v1-why-hover-foreground: #ffffff;
        }
        [data-v1-theme='business'] {
          --background: #ffffff;
          --foreground: #111827;
          --card: #ffffff;
          --card-foreground: #111827;
          --popover: #ffffff;
          --popover-foreground: #111827;
          --primary: #1e40af;
          --primary-foreground: #ffffff;
          --secondary: #60a5fa;
          --secondary-foreground: #ffffff;
          --muted: #f9fafb;
          --muted-foreground: #6b7280;
          --accent: #ff6b6b;
          --accent-foreground: #ffffff;
          --border: #e5e7eb;
          --input: #f9fafb;
          --ring: #1e40af;
          --radius: 0.25rem;
          --v1-header-bg: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(249,250,251,0.98));
          --v1-footer-bg: linear-gradient(180deg, #ffffff, #f9fafb);
          --v1-footer-foreground: #111827;
          --v1-section-bg: #f9fafb;
          --v1-button-bg: linear-gradient(90deg, #60a5fa, #ff6b6b);
          --v1-card-radius: 0.25rem;
          --v1-why-bg: #ffffff;
          --v1-why-hover-bg: linear-gradient(135deg, #1e40af, #60a5fa);
          --v1-why-hover-foreground: #ffffff;
        }
        [data-v1-theme='amber'] {
          --background: #f9fafb;
          --foreground: #1f2937;
          --card: #ffffff;
          --card-foreground: #1f2937;
          --popover: #ffffff;
          --popover-foreground: #1f2937;
          --primary: #d97706;
          --primary-foreground: #ffffff;
          --secondary: #111827;
          --secondary-foreground: #ffffff;
          --muted: #f7f5f0;
          --muted-foreground: #4b5563;
          --accent: #ef4444;
          --accent-foreground: #ffffff;
          --border: #eee8dd;
          --input: #f7f5f0;
          --ring: #d97706;
          --radius: 0.75rem;
          --v1-header-bg: linear-gradient(180deg, rgba(17,24,39,0.96), rgba(31,41,55,0.94));
          --v1-footer-bg: linear-gradient(135deg, #111827, #1f2937);
          --v1-footer-foreground: #ffffff;
          --v1-section-bg: #f7f5f0;
          --v1-button-bg: linear-gradient(90deg, #d97706, #ef4444);
          --v1-card-radius: 0.75rem;
          --v1-why-bg: #f7f5f0;
          --v1-why-hover-bg: linear-gradient(135deg, #d97706, #ef4444);
          --v1-why-hover-foreground: #ffffff;
        }
        [data-v1-theme='berry'] {
          --background: #ffffff;
          --foreground: #0f172a;
          --card: #ffffff;
          --card-foreground: #0f172a;
          --popover: #ffffff;
          --popover-foreground: #0f172a;
          --primary: #9d174d;
          --primary-foreground: #ffffff;
          --secondary: #f8fafc;
          --secondary-foreground: #0f172a;
          --muted: #fff1f2;
          --muted-foreground: #64748b;
          --accent: #f43f5e;
          --accent-foreground: #ffffff;
          --border: #e2e8f0;
          --input: #f8fafc;
          --ring: #9d174d;
          --radius: 0.125rem;
          --v1-header-bg: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,250,252,0.98));
          --v1-footer-bg: linear-gradient(135deg, #ffffff, #fff1f2);
          --v1-footer-foreground: #0f172a;
          --v1-section-bg: #f8fafc;
          --v1-button-bg: linear-gradient(90deg, #9d174d, #f43f5e);
          --v1-card-radius: 0.125rem;
          --v1-why-bg: #fff1f2;
          --v1-why-hover-bg: linear-gradient(135deg, #9d174d, #f43f5e);
          --v1-why-hover-foreground: #ffffff;
        }
        [data-v1-theme='nature'] {
          --background: #f8f6f0;
          --foreground: #0f172a;
          --card: #f8f6f0;
          --card-foreground: #0f172a;
          --popover: #f8f6f0;
          --popover-foreground: #0f172a;
          --primary: #c2410c;
          --primary-foreground: #ffffff;
          --secondary: #1e293b;
          --secondary-foreground: #ffffff;
          --muted: #eadec9;
          --muted-foreground: #78716c;
          --accent: #1e293b;
          --accent-foreground: #ffffff;
          --border: #0f172a;
          --input: #eadec9;
          --ring: #c2410c;
          --radius: 0;
          --v1-header-bg: #f8f6f0;
          --v1-footer-bg: #1e293b;
          --v1-footer-foreground: #f8f6f0;
          --v1-section-bg: #eadec9;
          --v1-button-bg: #c2410c;
          --v1-card-radius: 0;
          --v1-why-bg: #eadec9;
          --v1-why-hover-bg: #c2410c;
          --v1-why-hover-foreground: #ffffff;
        }
        [data-v1-theme] {
          background: var(--background);
          color: var(--foreground);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        [data-v1-theme='tech'] .v1-industrial-grid {
          background-image: linear-gradient(rgba(30,41,59,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,0.06) 1px, transparent 1px);
          background-size: 22px 22px;
        }
        [data-v1-theme='amber'] .v1-section-title,
        [data-v1-theme='tech'] .v1-section-title {
          border-left: 4px solid var(--primary);
          padding-left: 12px;
        }
        [data-v1-theme='berry'] .v1-theme-card {
          border-radius: 2px;
        }
        [data-v1-theme='nature'] {
          font-family: 'Helvetica Neue', 'DM Sans', Arial, ui-sans-serif, system-ui, sans-serif;
          letter-spacing: 0.01em;
        }
        [data-v1-theme='nature'] .v1-brand-name {
          background: none !important;
          -webkit-background-clip: initial;
          background-clip: initial;
          color: #0f172a !important;
        }
        [data-v1-theme='nature'] .v1-logo-pulse,
        [data-v1-theme='nature'] button,
        [data-v1-theme='nature'] input,
        [data-v1-theme='nature'] select,
        [data-v1-theme='nature'] textarea {
          border-radius: 0 !important;
        }
        [data-v1-theme='nature'] .v1-nav-link::after {
          background: #c2410c !important;
        }
        [data-v1-theme='nature'] .bg-gradient-to-r,
        [data-v1-theme='nature'] .bg-gradient-to-br {
          background-image: none !important;
          background-color: var(--primary) !important;
        }
        [data-v1-theme='nature'] .v1-contact-glow {
          animation: none !important;
          box-shadow: none !important;
        }
        [data-v1-theme='nature'] .v1-section-title {
          border-left: 0;
          padding-left: 0;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }
        [data-v1-theme='nature'] .v1-theme-card {
          border: 2px solid #0f172a !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          background: #f8f6f0 !important;
        }
        [data-v1-theme='nature'] .v1-theme-card:hover {
          background: #c2410c !important;
          border-color: #c2410c !important;
          box-shadow: none !important;
          transform: none !important;
        }
        [data-v1-theme='nature'] .v1-theme-card:hover,
        [data-v1-theme='nature'] .v1-theme-card:hover * {
          color: #ffffff !important;
        }
        [data-v1-theme='nature'] .animate-grow {
          animation: none !important;
        }      `}</style>
    </V1ThemeContext.Provider>
  )
}

export function useV1Theme() {
  const context = useContext(V1ThemeContext)
  if (!context) throw new Error('useV1Theme must be used inside V1ThemeProvider')
  return context
}











