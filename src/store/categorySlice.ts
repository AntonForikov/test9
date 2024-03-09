import {createSlice} from '@reduxjs/toolkit';
import {CategoryToSend, CategoryWithId} from '../types';
import {RootState} from '../app/store';
import {addNewCategory, deleteCategory, getCategoriesList, getCategoryById} from './categoryThunk';

interface CategoryState {
  categoryList: CategoryWithId[],
  categoryToUpdate: CategoryToSend | null,
  categoriesLoading: boolean,
  saveButtonDisabler: boolean,
  deleteButtonDisabler: false | string,
}

const initialState: CategoryState = {
  categoryList: [],
  categoryToUpdate: null,
  categoriesLoading: false,
  saveButtonDisabler: false,
  deleteButtonDisabler: false,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    clearCategoryToUpdate: (state) => {
      state.categoryToUpdate = initialState.categoryToUpdate;
    }
  },
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

    builder.addCase(getCategoryById.fulfilled, (state, action) => {
      state.categoryToUpdate = action.payload;
    }).addCase(getCategoryById.rejected, () => {
      alert('Please check URL!');
    });

    builder.addCase(addNewCategory.pending, (state) => {
      state.saveButtonDisabler = true;
    }).addCase(addNewCategory.fulfilled, (state) => {
      state.saveButtonDisabler = false;
    }).addCase(addNewCategory.rejected, (state) => {
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
    builder.addCase(deleteCategory.pending, (state, action) => {
      state.deleteButtonDisabler = action.meta.arg;
    }).addCase(deleteCategory.fulfilled, (state) => {
      state.saveButtonDisabler = false;
    }).addCase(deleteCategory.rejected, (state) => {
      state.saveButtonDisabler = false;
    });
  }
});

export const categoryReducer = categorySlice.reducer;

export const {clearCategoryToUpdate} = categorySlice.actions;
export const selectCategoriesList = (state: RootState) => state.category.categoryList;
export const selectCategoriesListLoading = (state: RootState) => state.category.categoriesLoading;
export const selectCategoryToUpdate = (state: RootState) => state.category.categoryToUpdate;
export const selectSaveButtonDisabler = (state: RootState) => state.category.saveButtonDisabler;
export const selectDeleteButtonDisabler = (state: RootState) => state.category.deleteButtonDisabler;