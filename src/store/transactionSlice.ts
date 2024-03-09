import {createSlice} from '@reduxjs/toolkit';


import {addNewTransaction, deleteTransaction, getTransactionById, getTransactionsList} from './transactionThunk';
import {TransactionToSend, TransactionWithId} from '../types';
import {RootState} from '../app/store';

interface TransactionState {
  transactionsList: TransactionWithId[],
  transactionToUpdate: TransactionToSend | null,
  transactionsLoading: boolean,
  saveButtonDisabler: boolean,
  deleteButtonDisabler: false | string,
}

const initialState: TransactionState = {
  transactionsList: [],
  transactionToUpdate: null,
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

    builder.addCase(getTransactionById.fulfilled, (state, action) => {
      state.transactionToUpdate = action.payload;
    }).addCase(getTransactionById.rejected, () => {
      // state.saveButtonDisabler = false;
      alert('Please check URL!');
    });

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
    builder.addCase(deleteTransaction.pending, (state, action) => {
      state.deleteButtonDisabler = action.meta.arg;
    }).addCase(deleteTransaction.fulfilled, (state) => {
      state.saveButtonDisabler = false;
    }).addCase(deleteTransaction.rejected, (state) => {
      state.saveButtonDisabler = false;
    });
  }
});

export const transactionsReducer = transactionSlice.reducer;
export const selectTransactionsList = (state: RootState) => state.transactions.transactionsList;
export const selectTransactionsListLoading = (state: RootState) => state.transactions.transactionsLoading;
export const selectTransactionToUpdate = (state: RootState) => state.transactions.transactionToUpdate;
// export const selectSaveButtonDisabler = (state: RootState) => state.dishes.saveButtonDisabler;
export const selectDeleteButtonDisabler = (state: RootState) => state.transactions.deleteButtonDisabler;