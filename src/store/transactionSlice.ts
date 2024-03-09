import {createSlice} from '@reduxjs/toolkit';


import {addNewTransaction} from './transactionThunk';

interface TransactionState {
  // dishesList: DishWithId[],
  // dishToUpdate: DishToSend | null,
  dishesLoading: boolean,
  saveButtonDisabler: boolean,
  deleteButtonDisabler: false | string,
}

const initialState: TransactionState = {
  // dishesList: [],
  // dishToUpdate: null,
  dishesLoading: false,
  saveButtonDisabler: false,
  deleteButtonDisabler: false,
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(getDishesList.pending, (state) => {
    //   state.dishesLoading = true;
    // }).addCase(getDishesList.fulfilled, (state, {payload: dishesList}) => {
    //   state.dishesLoading = false;
    //   state.dishesList = dishesList;
    // }).addCase(getDishesList.rejected, (state) => {
    //   state.dishesLoading = false;
    // });

    // builder.addCase(getDishById.fulfilled, (state, action) => {
    //   state.dishToUpdate = action.payload;
    // });

    builder.addCase(addNewTransaction.pending, (state) => {
      state.saveButtonDisabler = true;
    }).addCase(addNewTransaction.fulfilled, (state) => {
      state.saveButtonDisabler = false;
    }).addCase(addNewTransaction.rejected, (state) => {
      state.saveButtonDisabler = false;
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
// export const selectDishesList = (state: RootState) => state.dishes.dishesList;
// export const selectDishesListLoading = (state: RootState) => state.dishes.dishesLoading;
// export const selectDishToUpdate = (state: RootState) => state.dishes.dishToUpdate;
// export const selectSaveButtonDisabler = (state: RootState) => state.dishes.saveButtonDisabler;
// export const selectDeleteButtonDisabler = (state: RootState) => state.dishes.deleteButtonDisabler;