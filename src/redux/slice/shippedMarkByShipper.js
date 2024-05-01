import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import LocalStorage from '../../services/LocalStorage';
let local = new LocalStorage();
import {API} from '../../services/Api';

//Box packing Api
export const shippedMarkByShipper = createAsyncThunk(
  'users/shippedMarkByShipper',
  async (body, thunkAPI) => {
    try {
      const data = await API.shippedMarkByShipper(body);
      console.log("datadatadata", data?.data?.httpStatusCode)
      if (data?.data?.httpStatusCode == 200) {
        console.log("first========>")
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
  //For shippedMarkByShipper
  shippedMarkByShipperFetching: false,
  shippedMarkByShipperSuccess: false,
  shippedMarkByShipperFail: false,
  shippedMarkByShipperMessage: '',
  shippedMarkByShipperPayload:[]
};

export const shippedMarkByShipperSlice = createSlice({
  name: 'shippedMarked',
  initialState: initialState,
  reducers: {
    clearUserState: ( state, actions ) => {
      return {...initialState};
    },
  },
  

  extraReducers: (builder) => {
    // ************ procedureConfigurations ******************
    builder
      .addCase(shippedMarkByShipper.fulfilled, (state,  payload ) => {
        console.log("<======shippedMarkByShipper======>",payload?.payload?.data)
        state.shippedMarkByShipperPayload = payload?.payload?.data;
        state.shippedMarkByShipperFetching = false;
        state.shippedMarkByShipperSuccess = true;
        state.shippedMarkByShipperFail = false;
      })
      .addCase(shippedMarkByShipper.rejected, (state, { payload }) => {
        state.shippedMarkByShipperFetching = false;
        state.shippedMarkByShipperSuccess = false;
        state.shippedMarkByShipperFail = true;
      })
      .addCase(shippedMarkByShipper.pending, (state) => {
        state.shippedMarkByShipperFetching = true;
        state.shippedMarkByShipperSuccess = false;
        state.shippedMarkByShipperFail = false;
      });
  },
});

export const shippedMarkByShipperSelector = state => state.shippedMarked;

export const {clearUserState} = shippedMarkByShipperSlice.actions;
