import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import {TransactionFromApi, TransactionToSend, TransactionWithId} from '../types';

export const addNewTransaction = createAsyncThunk<void, TransactionToSend>(
  'transaction/add',
  async (transaction) => {
    await axiosApi.post('/transactions.json', transaction);
  }
);

export const getTransactionsList = createAsyncThunk<TransactionWithId[]>(
  'transaction/list',
  async () => {
    const {data} = await axiosApi.get<TransactionFromApi | null>('/transactions.json');

    if (data) {
      return Object.keys(data).map(id => ({
        id: id,
        ...data[id],
      }));
    }

    return [];
  }
);
//
// export const getDishById = createAsyncThunk(
//   'dish/getById',
//   async (dishId: string) => {
//     const {data} = await axiosApi.get<DishToSend | null>(`/dishes/${dishId}.json`);
//     if (data) {
//       return {...data,};
//     } else {
//       return null;
//     }
//   }
// );
//
// export const updateDish = createAsyncThunk<void, DishWithId>(
//   'dish/update',
//   async (dish) => {
//     const dishToSend: DishToSend = {
//       title: dish.title,
//       image: dish.image,
//       price: dish.price,
//     };
//     await axiosApi.put(`/dishes/${dish.id}.json`, dishToSend);
//   }
// );
//
// export const deleteDish = createAsyncThunk<void, string>(
//   'dish/delete',
//   async (id) => {
//     await axiosApi.delete(`/dishes/${id}.json`);
//   }
// );
