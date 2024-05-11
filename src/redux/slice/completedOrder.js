import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import LocalStorage from '../../services/LocalStorage';
let local = new LocalStorage();
import {API} from '../../services/Api';

//Picker Api
export const completedOrders = createAsyncThunk(
  'users/completedOrders',
  async (id, thunkAPI) => {
    try {
      const data = await API.completedOrders();
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
  //For completedOrders
  completedOrdersFetching: false,
  completedOrdersSuccess: false,
  completedOrdersFail: false,
  completedOrdersMessage: '',
  completedOrdersPayload:[]
};

export const completedOrdersSlice = createSlice({
  name: 'completed',
  initialState: initialState,
  reducers: {
    clearUserState: ( state, actions ) => {
      return {...initialState};
    },
  },
  

  extraReducers: (builder) => {
    // ************ procedureConfigurations ******************
    builder
      .addCase(completedOrders.fulfilled, (state, { payload }) => {
        console.log("<======completedOrders======>", payload?.data?.data)
        state.completedOrdersPayload = payload.data?.data;
        state.completedOrdersFetching = false;
        state.completedOrdersSuccess = true;
        state.completedOrdersFail = false;
      })
      .addCase(completedOrders.rejected, (state, { payload }) => {
        state.completedOrdersFetching = false;
        state.completedOrdersSuccess = false;
        state.completedOrdersFail = true;
      })
      .addCase(completedOrders.pending, (state) => {
        state.completedOrdersFetching = true;
        state.completedOrdersSuccess = false;
        state.completedOrdersFail = false;
      });
  },
});

export const completedOrdersSelector = state => state.completed;

export const {clearUserState} = completedOrdersSlice.actions;
