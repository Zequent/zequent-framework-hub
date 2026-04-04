import glob from 'fast-glob'
import { type Metadata } from 'next'

import { Layout } from '@/components/docs/Layout'
import { type Section } from '@/components/docs/SectionProvider'

export const metadata: Metadata = {
  title: {
    template: '%s - Zequent Docs',
    default: 'Zequent Documentation',
  },
  description:
    'Documentation for the Zequent autonomous systems infrastructure.',
}

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let pages = await glob('**/*.mdx', { cwd: 'src/app/docs' })
  let allSectionsEntries = (await Promise.all(
    pages.map(async (filename) => {
      let slug = filename.replace(/(^|\/)page\.mdx$/, '')
      let path = '/docs' + (slug ? '/' + slug : '')
      return [
        path,
        (await import(`./${filename}`)).sections,
      ]
    }),
  )) as Array<[string, Array<Section>]>
  let allSections = Object.fromEntries(allSectionsEntries)

  return (
    <div className="flex min-h-full bg-white antialiased dark:bg-zinc-900">
      <div className="w-full">
        <Layout allSections={allSections}>{children}</Layout>
      </div>
    </div>
  )
}
