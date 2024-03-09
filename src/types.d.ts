export interface DishToSend {
  title: string,
  price: number,
  image: string
}

export interface DishesFromApi {
  [id: string]: DishToSend
}

export interface DishWithId extends DishToSend {
  id: string
}

export interface CartDish extends Omit<DishWithId, 'image'> {
  amount: number
}

export interface Order {
  [id: string]: string;
}
export interface OrderFromApi {
  [id: string]: Order
}
export interface OrderWithId extends Order {
  id: string
}