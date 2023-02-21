import markdownItem from 'markdown-it'
import markdownEmoji from 'markdown-it-emoji'
import mp from 'markdown-it-prism'

export const markdownToHtml = (content: string): string => {
  const md = new markdownItem().use(markdownEmoji)
  return md.render(content)
}
