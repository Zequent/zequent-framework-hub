import { Button } from '@/components/docs/Button'
import { Heading } from '@/components/docs/Heading'

const guides = [
  {
    href: '/docs/sdk/setup',
    name: 'Framework Setup',
    description: 'Set up the Zequent framework and configure your environment.',
  },
  {
    href: '/docs/sdk/client/quickstart',
    name: 'Client SDK Quick Start',
    description: 'Get started with the Client SDK for remote control and mission autonomy.',
  },
  {
    href: '/docs/sdk/edge/overview',
    name: 'Edge SDK Overview',
    description: 'Implement edge clients for the Zequent framework ecosystem.',
  },
  {
    href: '/docs/sdk/client/configuration',
    name: 'Configuration Guide',
    description: 'Configure the Client SDK for different environments.',
  },
]

export function Guides() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="guides">
        Guides
      </Heading>
      <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 sm:grid-cols-2 xl:grid-cols-4 dark:border-white/5">
        {guides.map((guide) => (
          <div key={guide.href}>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
              {guide.name}
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {guide.description}
            </p>
            <p className="mt-4">
              <Button href={guide.href} variant="text" arrow="right">
                Read more
              </Button>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
