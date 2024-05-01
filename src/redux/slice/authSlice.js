import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import LocalStorage from '../../services/LocalStorage';
let local = new LocalStorage();
import {API} from '../../services/Api';

// procedureConfigrations Api 8
export const userLogin = createAsyncThunk(
  'users/userLogin',
  async (body, thunkAPI) => {
    try {
      const data = await API.userLogin(body);
      if (data.status == 200) {
        local.createSession(data?.data, res => {});
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);


const initialState = {
  //For UserLogin
  userLoginFetching: false,
  userLoginSuccess: false,
  userLoginFail: false,
  userLoginMessage: '',
  userLoginPayload:[]
};

export const userLoginSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    clearUserState: (state, actions) => {
       state.userLoginFetching = false
       state.userLoginFail = false
       state.userLoginMessage = ''
       state.userLoginSuccess = false
    },
  },
  

  extraReducers: (builder) => {
    // ************ procedureConfigurations ******************
    builder
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        console.log("<======userAuth======>", payload?.data?.data?.rolesOutputDTO)
        state.userLoginPayload = payload.data;
        state.userLoginFetching = false;
        state.userLoginSuccess = true;
        state.userLoginFail = false;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.userLoginFetching = false;
        state.userLoginSuccess = false;
        state.userLoginFail = true;
      })
      .addCase(userLogin.pending, (state) => {
        state.userLoginFetching = true;
        state.userLoginSuccess = false;
        state.userLoginFail = false;
      });
  },
});

export const userLoginSelector = state => state.auth;

export const {clearUserState} = userLoginSlice.actions;
