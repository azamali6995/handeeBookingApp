import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import LocalStorage from '../../services/LocalStorage';
let local = new LocalStorage();
import {API} from '../../services/Api';

//Picker Api
export const userShipper = createAsyncThunk(
  'users/userShipper',
  async (id, thunkAPI) => {
    try {
      const data = await API.userShipper();
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
  //For userShipper
  userShipperFetching: false,
  userShipperSuccess: false,
  userShipperFail: false,
  userShipperMessage: '',
  userShipperPayload:[]
};

export const userShipperSlice = createSlice({
  name: 'shipper',
  initialState: initialState,
  reducers: {
    clearUserState: ( state, actions ) => {
      return {...initialState};
    },
  },
  

  extraReducers: (builder) => {
    // ************ procedureConfigurations ******************
    builder
      .addCase(userShipper.fulfilled, (state, { payload }) => {
        console.log("<======userShipper======>", payload?.data)
        state.userShipperPayload = payload.data;
        state.userShipperFetching = false;
        state.userShipperSuccess = true;
        state.userShipperFail = false;
      })
      .addCase(userShipper.rejected, (state, { payload }) => {
        state.userShipperFetching = false;
        state.userShipperSuccess = false;
        state.userShipperFail = true;
      })
      .addCase(userShipper.pending, (state) => {
        state.userShipperFetching = true;
        state.userShipperSuccess = false;
        state.userShipperFail = false;
      });
  },
});

export const userShipperSelector = state => state.shipper;

export const {clearUserState} = userShipperSlice.actions;
