import { SanityImageSource } from "@sanity/image-url/lib/types/types"

export interface SimpleBlogCard {
  title: string
  smallDescription: string
  currentSlug: string
  titleImage: SanityImageSource
}

export interface FullBlog {
  currentSlug: string
  smallDescription: string
  title: string
  Content: any
  titleImage: SanityImageSource
}
