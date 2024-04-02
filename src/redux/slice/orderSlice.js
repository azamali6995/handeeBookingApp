import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import LocalStorage from '../../services/LocalStorage';
let local = new LocalStorage();
import {API} from '../../services/Api';

// procedureConfigrations Api 8
export const userOrder = createAsyncThunk(
  'users/userOrder',
  async (id, thunkAPI) => {
    try {
      const data = await API.userOrder();
      if (data.status == 200) {
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
    
  //For UserOrder
  userOrderFetching: false,
  userOrderSuccess: false,
  userOrderFail: false,
  userOrderMessage: '',
  userOrderPayload:[]
};

export const userOrderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    clearUserState: (state, actions) => {
      return {...initialState};
    },
  },
  

  extraReducers: (builder) => {
    // ************ procedureConfigurations ******************
    builder
      .addCase(userOrder.fulfilled, (state, { payload }) => {
        console.log("<======userOrder======>", payload?.data)
        state.userOrderPayload = payload.data;
        state.userOrderFetching = false;
        state.userOrderSuccess = true;
        state.userOrderFail = false;
      })
      .addCase(userOrder.rejected, (state, { payload }) => {
        state.userOrderFetching = false;
        state.userOrderSuccess = false;
        state.userOrderFail = true;
      })
      .addCase(userOrder.pending, (state) => {
        state.userOrderFetching = true;
        state.userOrderSuccess = false;
        state.userOrderFail = false;
      });
  },
});

export const userOrderSelector = state => state.order;

export const {clearUserState} = userOrderSlice.actions;
