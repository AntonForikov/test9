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

export const getCategoryById = createAsyncThunk(
  'category/getById',
  async (categoryId: string) => {
    const {data} = await axiosApi.get<CategoryToSend | null>(`/categories/${categoryId}.json`);

    if (data) {
      return {...data,};
    } else {
      return null;
    }
  }
);

export const updateCategory = createAsyncThunk<void, CategoryWithId>(
  'transaction/update',
  async (category) => {
    const TransactionToSend: CategoryToSend = {
      type: category.type,
      name: category.name
    };
    await axiosApi.put(`/categories/${category.id}.json`, TransactionToSend);
  }
);

export const deleteCategory = createAsyncThunk<void, string>(
  'category/delete',
  async (id) => {
    await axiosApi.delete(`/categories/${id}.json`);
  }
);
