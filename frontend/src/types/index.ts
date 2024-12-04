export type Category = {
  id: string
  name: string
}

export type Service = {
  id: number
  name: string
  price: string
  category: Category
}

export type BookingData = {
  name: string
  email: string
  mobile: string
  serviceId: string
  selectedTime: string
}
