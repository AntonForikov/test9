import {configureStore} from '@reduxjs/toolkit';
import {transactionsReducer} from '../store/transactionSlice';
import {categoryReducer} from '../store/categorySlice';


export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    category: categoryReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;