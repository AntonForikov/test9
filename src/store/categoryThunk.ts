import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import {CategoryFromApi, CategoryToSend, CategoryWithId} from '../types';

export const addNewCategory = createAsyncThunk<void, CategoryToSend>(
  'category/add',
  async (category) => {
    await axiosApi.post('/categories.json', category);
  }
);

export const getCategoriesList = createAsyncThunk<CategoryWithId[]>(
  'category/list',
  async () => {
    const {data} = await axiosApi.get<CategoryFromApi | null>('/categories.json');

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
// export const getTransactionById = createAsyncThunk(
//   'transaction/getById',
//   async (transactionId: string) => {
//     const {data} = await axiosApi.get<TransactionToSend | null>(`/transactions/${transactionId}.json`);
//
//     console.log('Request to update');
//     if (data) {
//       return {...data,};
//     } else {
//       return null;
//     }
//   }
// );
//
// export const updateTransaction = createAsyncThunk<void, TransactionWithId>(
//   'transaction/update',
//   async (transaction) => {
//     const TransactionToSend: TransactionToSend = {
//       type: transaction.type,
//       category: transaction.category,
//       amount: transaction.amount,
//       date: transaction.date
//     };
//     await axiosApi.put(`/transactions/${transaction.id}.json`, TransactionToSend);
//   }
// );
//
// export const deleteTransaction = createAsyncThunk<void, string>(
//   'transaction/delete',
//   async (id) => {
//     await axiosApi.delete(`/transactions/${id}.json`);
//   }
// );
