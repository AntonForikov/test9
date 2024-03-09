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

export const getTransactionById = createAsyncThunk(
  'transaction/getById',
  async (transactionId: string) => {
    const {data} = await axiosApi.get<TransactionToSend | null>(`/transactions/${transactionId}.json`);

    console.log('Request to update');
    if (data) {
      return {...data,};
    } else {
      return null;
    }
  }
);

export const updateTransaction = createAsyncThunk<void, TransactionWithId>(
  'transaction/update',
  async (transaction) => {
    const TransactionToSend: TransactionToSend = {
      type: transaction.type,
      category: transaction.category,
      amount: transaction.amount,
      date: transaction.date
    };
    await axiosApi.put(`/transactions/${transaction.id}.json`, TransactionToSend);
  }
);

export const deleteTransaction = createAsyncThunk<void, string>(
  'transaction/delete',
  async (id) => {
    await axiosApi.delete(`/transactions/${id}.json`);
  }
);
