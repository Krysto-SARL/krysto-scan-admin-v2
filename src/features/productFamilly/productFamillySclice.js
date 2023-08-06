import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productFamilyService from './prodructFamillyService'

const initialState = {
  productFamilies: [],
  productFamily: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getProductFamilies = createAsyncThunk(
  'productFamily/getAll',
  async (_, thunkAPI) => {
    try {
      return await productFamilyService.getProductFamilies()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const getProductFamily = createAsyncThunk(
  'productFamily/get',
  async (productFamilyId, thunkAPI) => {
    try {
      return await productFamilyService.getProductFamily(productFamilyId)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const createProductFamily = createAsyncThunk(
  'productFamily/create',
  async (productFamilyData, thunkAPI) => {
    try {
      return await productFamilyService.createProductFamily(productFamilyData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const updateProductFamily = createAsyncThunk(
  'productFamily/update',
  async ({ productFamilyId, updatedData }, thunkAPI) => {
    try {
      return await productFamilyService.updateProductFamily(
        productFamilyId,
        updatedData,
      )
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const deleteProductFamily = createAsyncThunk(
  'productFamily/delete',
  async (productFamilyId, thunkAPI) => {
    try {
      return await productFamilyService.deleteProductFamily(productFamilyId)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const productFamilySlice = createSlice({
  name: 'productFamily',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductFamilies.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProductFamilies.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.productFamilies = action.payload
      })
      .addCase(getProductFamilies.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.productFamilies = []
      })
      .addCase(getProductFamily.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProductFamily.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.productFamily = action.payload
      })
      .addCase(getProductFamily.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.productFamily = {}
      })
      .addCase(createProductFamily.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProductFamily.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.productFamily = action.payload
      })
      .addCase(createProductFamily.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.productFamily = {}
      })
      .addCase(updateProductFamily.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProductFamily.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.productFamily = action.payload
      })
      .addCase(updateProductFamily.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.productFamily = {}
      })
      .addCase(deleteProductFamily.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteProductFamily.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
        state.productFamily = {}
      })
      .addCase(deleteProductFamily.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = productFamilySlice.actions
export default productFamilySlice.reducer
