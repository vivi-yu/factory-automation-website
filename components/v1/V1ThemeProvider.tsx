'use client'

export function V1ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <div data-v1-theme="business" className="min-h-screen">
      {children}
      <style jsx global>{`
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
          background: var(--background);
          color: var(--foreground);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      `}</style>
    </div>
  )
}
