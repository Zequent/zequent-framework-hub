declare module '*.css' {}

declare module '@/mdx/search.mjs' {
  import { type SearchOptions } from 'flexsearch'

  export type Result = {
    url: string
    title: string
    pageTitle?: string
  }

  export function search(query: string, options?: SearchOptions): Array<Result>
}
