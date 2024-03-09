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


//
// export interface CartDish extends Omit<DishWithId, 'image'> {
//   amount: number
// }
//
// export interface Order {
//   [id: string]: string;
// }
// export interface OrderFromApi {
//   [id: string]: Order
// }
// export interface OrderWithId extends Order {
//   id: string
// }