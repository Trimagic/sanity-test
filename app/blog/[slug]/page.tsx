import { FullBlog } from "@/app/lib/interface"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { Metadata } from "next"
import { PortableText } from "next-sanity"
import Image from "next/image"

export const runtime = "edge"

async function getData(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == '${slug}'] {
      "currentSlug": slug.current,
      smallDescription,
      title,
      Content,
      titleImage
    }[0]
  `

  const data = await client.fetch(query)
  return data
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const data: FullBlog = await getData(params.slug)
  return {
    title: data.title,
    description: data.smallDescription,
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || ""),
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: data.title,
      // startUpImage: [],
    },
    openGraph: {
      siteName: "Blog",
      type: "website",
      title: data.title,
      images: [urlFor(data.titleImage).url()],
    },
  }
}

export default async function BlogArticle({ params }: { params: { slug: string } }) {
  const data: FullBlog = await getData(params.slug)

  return (
    <div className="mt-8 max-w-2xl mx-auto px-4">
      <h1>
        <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
          ALEX - Blog
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>
      <Image
        src={urlFor(data.titleImage).url()}
        width={800}
        height={800}
        alt="Title Image"
        priority
        className="rounded-lg mt-8 border"
      />

      <div className="mt-16 prose prose-red prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
        <PortableText value={data.Content} />
      </div>
    </div>
  )
}
