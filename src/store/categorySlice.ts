import {createSlice} from '@reduxjs/toolkit';
import {addNewTransaction, deleteTransaction, getTransactionById} from './transactionThunk';
import {CategoryWithId, TransactionToSend} from '../types';
import {RootState} from '../app/store';
import {getCategoriesList} from './categoryThunk';

interface CategoryState {
  categoryList: CategoryWithId[],
  transactionToUpdate: TransactionToSend | null,
  categoriesLoading: boolean,
  saveButtonDisabler: boolean,
  deleteButtonDisabler: false | string,
}

const initialState: CategoryState = {
  categoryList: [],
  transactionToUpdate: null,
  categoriesLoading: false,
  saveButtonDisabler: false,
  deleteButtonDisabler: false,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategoriesList.pending, (state) => {
      state.categoriesLoading = true;
    }).addCase(getCategoriesList.fulfilled, (state, {payload: categoryList}) => {
      state.categoriesLoading = false;
      state.categoryList = categoryList;
    }).addCase(getCategoriesList.rejected, (state) => {
      state.categoriesLoading = false;
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

export const categoryReducer = categorySlice.reducer;
export const selectCategoriesList = (state: RootState) => state.category.categoryList;
export const selectCategoriesListLoading = (state: RootState) => state.category.categoriesLoading;
// export const selectTransactionToUpdate = (state: RootState) => state.transactions.transactionToUpdate;
// // export const selectSaveButtonDisabler = (state: RootState) => state.dishes.saveButtonDisabler;
// export const selectDeleteButtonDisabler = (state: RootState) => state.transactions.deleteButtonDisabler;