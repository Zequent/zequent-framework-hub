'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import clsx from 'clsx'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  Fragment,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import Highlighter from 'react-highlight-words'

import { navigation } from '@/components/docs/Navigation'
import { type Result } from '@/mdx/search.mjs'
import { useMobileNavigationStore } from '@/components/docs/MobileNavigation'

function SearchIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.01 12a4.25 4.25 0 1 0-6.02-6 4.25 4.25 0 0 0 6.02 6Zm0 0 3.24 3.25"
      />
    </svg>
  )
}

function NoResultsIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.01 12a4.237 4.237 0 0 0 1.24-3c0-.62-.132-1.207-.37-1.738M12.01 12A4.237 4.237 0 0 1 9 13.25c-.635 0-1.237-.14-1.777-.388M12.01 12l3.24 3.25m-3.715-9.661a4.25 4.25 0 0 0-5.975 5.908M4.5 15.5l11-11"
      />
    </svg>
  )
}

function HighlightQuery({ text, query }: { text: string; query: string }) {
  return (
    <Highlighter
      highlightClassName="underline bg-transparent text-zinc-900 dark:text-white"
      searchWords={[query]}
      autoEscape={true}
      textToHighlight={text}
    />
  )
}

function useSearch() {
  let searchFn = useRef<((query: string, options?: any) => Result[]) | null>(null)
  let [results, setResults] = useState<Result[]>([])
  let [query, setQuery] = useState('')
  let [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    import('@/mdx/search.mjs').then(({ search }) => {
      searchFn.current = search
    })
  }, [])

  let handleSearch = useCallback((value: string) => {
    setQuery(value)
    if (!value.trim()) {
      setResults([])
      return
    }
    if (searchFn.current) {
      let found = searchFn.current(value, { limit: 5 })
      setResults(found)
    } else {
      setIsLoading(true)
      import('@/mdx/search.mjs').then(({ search }) => {
        searchFn.current = search
        setResults(search(value, { limit: 5 }))
        setIsLoading(false)
      })
    }
  }, [])

  let reset = useCallback(() => {
    setQuery('')
    setResults([])
  }, [])

  return { query, results, isLoading, handleSearch, reset }
}

function SearchDialog({
  open,
  setOpen,
  className,
  onNavigate = () => {},
}: {
  open: boolean
  setOpen: (open: boolean) => void
  className?: string
  onNavigate?: () => void
}) {
  let router = useRouter()
  let inputRef = useRef<HTMLInputElement>(null)
  let { query, results, isLoading, handleSearch, reset } = useSearch()
  let [activeIndex, setActiveIndex] = useState(0)
  let pathname = usePathname()
  let searchParams = useSearchParams()

  useEffect(() => {
    setOpen(false)
  }, [pathname, searchParams, setOpen])

  useEffect(() => {
    if (open) {
      setActiveIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
      return
    }
    reset()
  }, [open, reset])

  useEffect(() => {
    setActiveIndex(0)
  }, [results])

  useEffect(() => {
    if (open) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen(true)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, setOpen])

  function navigateTo(url: string) {
    router.push(url)
    onNavigate()
    setOpen(false)
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((i) => (i < results.length - 1 ? i + 1 : 0))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((i) => (i > 0 ? i - 1 : results.length - 1))
    } else if (event.key === 'Enter' && results[activeIndex]) {
      event.preventDefault()
      navigateTo(results[activeIndex].url)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className={clsx('fixed inset-0 z-50', className)}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-zinc-400/25 backdrop-blur-xs data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-black/40"
      />

      <div className="fixed inset-0 overflow-y-auto px-4 py-4 sm:px-6 sm:py-20 md:py-32 lg:px-8 lg:py-[15vh]">
        <DialogPanel
          transition
          className="mx-auto transform-gpu overflow-hidden rounded-lg bg-zinc-50 shadow-xl ring-1 ring-zinc-900/7.5 data-closed:scale-95 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:max-w-xl dark:bg-zinc-900 dark:ring-zinc-800"
        >
          <div className="group relative flex h-12">
            <SearchIcon className="pointer-events-none absolute top-0 left-3 h-full w-5 stroke-zinc-500" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Find something..."
              className="flex-auto appearance-none bg-transparent pl-10 pr-4 text-zinc-900 outline-none placeholder:text-zinc-500 focus:w-full focus:flex-none sm:text-sm dark:text-white [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
            />
            {isLoading && (
              <div className="absolute inset-y-0 right-3 flex items-center">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-600 dark:border-zinc-700 dark:border-t-zinc-400" />
              </div>
            )}
          </div>

          {query.trim() !== '' && (
            <div className="border-t border-zinc-200 bg-white dark:border-zinc-100/5 dark:bg-white/2.5">
              {results.length === 0 ? (
                <div className="p-6 text-center">
                  <NoResultsIcon className="mx-auto h-5 w-5 stroke-zinc-900 dark:stroke-zinc-600" />
                  <p className="mt-2 text-xs text-zinc-700 dark:text-zinc-400">
                    Nothing found for{' '}
                    <strong className="font-semibold text-zinc-900 dark:text-white">
                      &lsquo;{query}&rsquo;
                    </strong>
                    . Please try again.
                  </p>
                </div>
              ) : (
                <ul>
                  {results.map((result, index) => {
                    let sectionTitle = navigation.find((section) =>
                      section.links.find(
                        (link) => link.href === result.url.split('#')[0],
                      ),
                    )?.title
                    let hierarchy = [sectionTitle, result.pageTitle].filter(
                      (x): x is string => typeof x === 'string',
                    )

                    return (
                      <li
                        key={result.url}
                        className={clsx(
                          'block cursor-pointer px-4 py-3',
                          index > 0 && 'border-t border-zinc-100 dark:border-zinc-800',
                          activeIndex === index
                            ? 'bg-zinc-50 dark:bg-zinc-800/50'
                            : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/30',
                        )}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => navigateTo(result.url)}
                      >
                        <div className="text-sm font-medium text-zinc-900 dark:text-white">
                          <HighlightQuery text={result.title} query={query} />
                        </div>
                        {hierarchy.length > 0 && (
                          <div className="mt-1 truncate text-2xs whitespace-nowrap text-zinc-500">
                            {hierarchy.map((item, itemIndex, items) => (
                              <Fragment key={itemIndex}>
                                <HighlightQuery text={item} query={query} />
                                <span
                                  className={
                                    itemIndex === items.length - 1
                                      ? 'sr-only'
                                      : 'mx-2 text-zinc-300 dark:text-zinc-700'
                                  }
                                >
                                  /
                                </span>
                              </Fragment>
                            ))}
                          </div>
                        )}
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  )
}

function useSearchProps() {
  let buttonRef = useRef<React.ElementRef<'button'>>(null)
  let [open, setOpen] = useState(false)

  return {
    buttonProps: {
      ref: buttonRef,
      onClick() {
        setOpen(true)
      },
    },
    dialogProps: {
      open,
      setOpen: useCallback(
        (open: boolean) => {
          let { width = 0, height = 0 } =
            buttonRef.current?.getBoundingClientRect() ?? {}
          if (!open || (width !== 0 && height !== 0)) {
            setOpen(open)
          }
        },
        [setOpen],
      ),
    },
  }
}

export function Search() {
  let [modifierKey, setModifierKey] = useState<string>()
  let { buttonProps, dialogProps } = useSearchProps()

  useEffect(() => {
    setModifierKey(
      /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? '⌘' : 'Ctrl ',
    )
  }, [])

  return (
    <div className="hidden lg:block lg:max-w-md lg:flex-auto">
      <button
        type="button"
        className="hidden h-8 w-full items-center gap-2 rounded-full bg-white pr-3 pl-2 text-sm text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 lg:flex dark:bg-white/5 dark:text-zinc-400 dark:ring-white/10 dark:ring-inset dark:hover:ring-white/20"
        {...buttonProps}
      >
        <SearchIcon className="h-5 w-5 stroke-current" />
        Find something...
        <kbd className="ml-auto text-2xs text-zinc-400 dark:text-zinc-500">
          <kbd className="font-sans">{modifierKey}</kbd>
          <kbd className="font-sans">K</kbd>
        </kbd>
      </button>
      <Suspense fallback={null}>
        <SearchDialog className="hidden lg:block" {...dialogProps} />
      </Suspense>
    </div>
  )
}

export function MobileSearch() {
  let { close } = useMobileNavigationStore()
  let { buttonProps, dialogProps } = useSearchProps()

  return (
    <div className="contents lg:hidden">
      <button
        type="button"
        className="relative flex size-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 lg:hidden dark:hover:bg-white/5"
        aria-label="Find something..."
        {...buttonProps}
      >
        <span className="absolute size-12 pointer-fine:hidden" />
        <SearchIcon className="h-5 w-5 stroke-zinc-900 dark:stroke-white" />
      </button>
      <Suspense fallback={null}>
        <SearchDialog
          className="lg:hidden"
          onNavigate={close}
          {...dialogProps}
        />
      </Suspense>
    </div>
  )
}
