import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apis } from 'api/api';

// apis
// .kakaoLogin()
// .then((res) => {
//   console.log(res);
//   navigate('/');
// })
// .catch((err) => console.log(err));
// export const getprofile = createAsyncThunk('GET_PROFILE', async (_, thunkAPI) => {
//   apis.kakaoLogin();
//   try {
//     const res = await instance.get('/api/auth/mycart');
//     // const res = await instance.get(`/detail`);
//     console.log('cart get 성공', res.data.data);
//     return thunkAPI.fulfillWithValue(res.data.success ? res.data.data : res.data.error);
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error);
//   }
// });

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState: { loginState: false, nickname: '', image: '', email: '' },
  reducers: {
    getprofile: (state, action) => {
      state.loginState = true;
      state.nickname = action.payload.nickname;
      state.image = action.payload.image;
      state.email = action.payload.email;
    },
  },
});

export default loginSlice;
export const { getprofile } = loginSlice.actions;
