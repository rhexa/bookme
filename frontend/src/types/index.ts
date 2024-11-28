export type Category = {
  id: string
  name: string
}

export type Service = {
  id: string
  name: string
  price: string
  category: Category
}
