import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import marqueService from './marqueService'

const initialState = {
  marques: [],
  marque: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Récupérer toutes les marques
export const getMarques = createAsyncThunk(
  'marque/getAll',
  async (_, thunkAPI) => {
    try {
      return await marqueService.getMarques()
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

export const getMarque = createAsyncThunk(
  'marque/get',
  async (marqueId, thunkAPI) => {
    try {
      return await marqueService.getMarque(marqueId)
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

export const createMarque = createAsyncThunk(
  'marque/create',
  async (marqueData, thunkAPI) => {
    try {
      return await marqueService.createMarque(marqueData)
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

export const updateMarque = createAsyncThunk(
  'marque/update',
  async ({ marqueId, updatedData }, thunkAPI) => {
    try {
      return await marqueService.updateMarque(marqueId, updatedData)
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

export const addMarquePhoto = createAsyncThunk(
  'marque/addPhoto',
  async ({ marqueId, photoData }, thunkAPI) => {
    try {
      return await marqueService.addMarquePhoto(marqueId, photoData)
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

export const deleteMarque = createAsyncThunk(
  'marque/delete',
  async (marqueId, thunkAPI) => {
    try {
      await marqueService.deleteMarque(marqueId)
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

export const marqueSlice = createSlice({
  name: 'marque',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMarques.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMarques.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.marques = action.payload
      })
      .addCase(getMarques.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.marques = []
      })
      .addCase(getMarque.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMarque.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.marque = action.payload
      })
      .addCase(getMarque.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.marque = {}
      })
      .addCase(createMarque.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createMarque.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.marque = action.payload
      })
      .addCase(createMarque.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.marque = {}
      })
      .addCase(updateMarque.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateMarque.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.marque = action.payload
      })
      .addCase(updateMarque.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.marque = {}
      })
      .addCase(addMarquePhoto.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addMarquePhoto.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.marque = action.payload
      })
      .addCase(addMarquePhoto.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.marque = {}
      })
      .addCase(deleteMarque.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteMarque.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
        // Mettez à jour state.recyclableProducts en supprimant le produit recyclable si nécessaire
      })
      .addCase(deleteMarque.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = marqueSlice.actions
export default marqueSlice.reducer
