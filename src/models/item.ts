export interface Item {
  title: string,
  pubDate: string,
  link: string,
  guid: string,
  author: string,
  thumbnail: string,
  description: string,
  content: string,
  enclosure: {
    thumbnail: string
  },
  categories: string[]
}
