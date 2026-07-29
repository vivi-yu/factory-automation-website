export function V1RichText({ html, className = '' }: { html: string; className?: string }) {
  if (!html) return null

  return (
    <div
      className={`v1-rich-text leading-8 text-muted-foreground [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_blockquote]:my-5 [&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_figure]:my-6 [&_h2]:mb-3 [&_h2]:mt-7 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-foreground [&_hr]:my-7 [&_img]:my-6 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-lg [&_li]:my-1 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p+p]:mt-4 [&_pre]:my-5 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-muted [&_pre]:p-4 [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_td]:p-3 [&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:p-3 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
