import { client } from "@/sanity/lib/client"
import { SimpleBlogCard } from "./lib/interface"

async function getData() {
  const query = `
   *[_type == 'blog'] | order(_createdAt desc) {
     title,
       smallDescription,
       "currentSlug": slug.current
   }
  `
  const data = await client.fetch(query)

  return data
}

export default async function Home() {
  const data: SimpleBlogCard[] = await getData()
  console.log(data)
  return (
    <div>
      {data.map(({ title }) => (
        <span key={title}>{title}</span>
      ))}
    </div>
  )
}
