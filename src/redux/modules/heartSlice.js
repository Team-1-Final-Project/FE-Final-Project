import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'api/api';

export const getHeart = createAsyncThunk('GET_HEART_LIST', async (id) => {
  const { data } = await api.get(`/board/heart/${id}`);
  return data.data.boardLike;
});
export const putChangeHeart = createAsyncThunk('PUT_CHANGE_HEART', async (id) => {
  const { data } = await api.put(`/board/heart/${id}`);
  return data.data;
});

const heartSlice = createSlice({
  name: 'heart',
  initialState: { heart: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHeart.fulfilled, (state, action) => {
      state.heart = action.payload;
    });
    builder.addCase(putChangeHeart.fulfilled, (state, action) => {
      state.heart = action.payload;
    });
  },
});

export const {} = heartSlice.actions;
export default heartSlice.reducer;
