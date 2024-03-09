import {createAsyncThunk} from '@reduxjs/toolkit';
import {DishesFromApi, DishWithId, DishToSend} from '../types';
import axiosApi from '../axiosApi';
import {AppDispatch} from '../app/store';

export const addNewDish = createAsyncThunk<void, DishToSend>(
  'dish/add',
  async (dish) => {
    await axiosApi.post('/dishes.json', dish);
  }
);

export const getDishesList = createAsyncThunk<DishWithId[], void, {dispatch: AppDispatch}>(
  'dish/list',
  async (_, thunkAPI) => {
    const {data} = await axiosApi.get<DishesFromApi | null>('/dishes.json');

    let newDishes: DishWithId[] = [];

    if (data) {
      newDishes = Object.keys(data).map(id => ({
        id: id,
        ...data[id],
      }));
    }

    thunkAPI.dispatch(updateDishes(newDishes));
    return newDishes;
  }
);

export const getDishById = createAsyncThunk(
  'dish/getById',
  async (dishId: string) => {
    const {data} = await axiosApi.get<DishToSend | null>(`/dishes/${dishId}.json`);
    if (data) {
      return {...data,};
    } else {
      return null;
    }
  }
);

export const updateDish = createAsyncThunk<void, DishWithId>(
  'dish/update',
  async (dish) => {
    const dishToSend: DishToSend = {
      title: dish.title,
      image: dish.image,
      price: dish.price,
    };
    await axiosApi.put(`/dishes/${dish.id}.json`, dishToSend);
  }
);

export const deleteDish = createAsyncThunk<void, string>(
  'dish/delete',
  async (id) => {
    await axiosApi.delete(`/dishes/${id}.json`);
  }
);
