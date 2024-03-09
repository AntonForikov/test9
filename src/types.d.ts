export interface TransactionToSend {
  type: string,
  category: string,
  amount: number,
  date: string
}

export interface TransactionWithId extends TransactionToSend {
  id: string
}

export interface TransactionFromApi {
  [id: string]: TransactionToSend
}

export interface CategoryToSend {
  name: string,
  type: string
}

export interface CategoryWithId extends CategoryToSend{
  id: string
}

export interface CategoryFromApi {
  [id: string]: CategoryToSend
}
// export interface OrderFromApi {
//   [id: string]: Order
// }
// export interface OrderWithId extends Order {
//   id: string
// }