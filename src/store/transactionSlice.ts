import {createSlice} from '@reduxjs/toolkit';


import {addNewTransaction, getTransactionsList} from './transactionThunk';
import {TransactionWithId} from '../types';
import {RootState} from '../app/store';

interface TransactionState {
  transactionsList: TransactionWithId[],
  // dishToUpdate: DishToSend | null,
  transactionsLoading: boolean,
  saveButtonDisabler: boolean,
  deleteButtonDisabler: false | string,
}

const initialState: TransactionState = {
  transactionsList: [],
  // dishToUpdate: null,
  transactionsLoading: false,
  saveButtonDisabler: false,
  deleteButtonDisabler: false,
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTransactionsList.pending, (state) => {
      state.transactionsLoading = true;
    }).addCase(getTransactionsList.fulfilled, (state, {payload: transactionsList}) => {
      state.transactionsLoading = false;
      state.transactionsList = transactionsList;
    }).addCase(getTransactionsList.rejected, (state) => {
      state.transactionsLoading = false;
      alert('Please check URL!');
    });

    // builder.addCase(getDishById.fulfilled, (state, action) => {
    //   state.dishToUpdate = action.payload;
    // });

    builder.addCase(addNewTransaction.pending, (state) => {
      state.saveButtonDisabler = true;
    }).addCase(addNewTransaction.fulfilled, (state) => {
      state.saveButtonDisabler = false;
    }).addCase(addNewTransaction.rejected, (state) => {
      state.saveButtonDisabler = false;
      alert('Please check URL!');
    });

    // builder.addCase(updateDish.pending, (state) => {
    //   state.saveButtonDisabler = true;
    // }).addCase(updateDish.fulfilled, (state) => {
    //   state.saveButtonDisabler = false;
    // }).addCase(updateDish.rejected, (state) => {
    //   state.saveButtonDisabler = false;
    // });
    //
    // builder.addCase(deleteDish.pending, (state, action) => {
    //   state.deleteButtonDisabler = action.meta.arg;
    // }).addCase(deleteDish.fulfilled, (state) => {
    //   state.saveButtonDisabler = false;
    // }).addCase(deleteDish.rejected, (state) => {
    //   state.saveButtonDisabler = false;
    // });
  }
});

export const transactionsReducer = transactionSlice.reducer;
export const selectTransactionsList = (state: RootState) => state.transactions.transactionsList;
export const selectTransactionsListLoading = (state: RootState) => state.transactions.transactionsLoading;
// export const selectDishToUpdate = (state: RootState) => state.dishes.dishToUpdate;
// export const selectSaveButtonDisabler = (state: RootState) => state.dishes.saveButtonDisabler;
// export const selectDeleteButtonDisabler = (state: RootState) => state.dishes.deleteButtonDisabler;