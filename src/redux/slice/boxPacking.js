import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import LocalStorage from '../../services/LocalStorage';
let local = new LocalStorage();
import {API} from '../../services/Api';

//Box packing Api
export const boxPacking = createAsyncThunk(
  'users/boxPacking',
  async (body, thunkAPI) => {
    try {
      const data = await API.boxPacking(body);
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
  //For boxPacking
  boxPackingFetching: false,
  boxPackingSuccess: false,
  boxPackingFail: false,
  boxPackingMessage: '',
  boxPackingPayload:[]
};

export const boxPackingSlice = createSlice({
  name: 'boxpacking',
  initialState: initialState,
  reducers: {
    clearUserState: ( state, actions ) => {
      return {...initialState};
    },
  },
  

  extraReducers: (builder) => {
    // ************ procedureConfigurations ******************
    builder
      .addCase(boxPacking.fulfilled, (state,  payload ) => {
        console.log("<======boxPacking======>",payload?.payload?.data)
        state.boxPackingPayload = payload?.payload?.data;
        state.boxPackingFetching = false;
        state.boxPackingSuccess = true;
        state.boxPackingFail = false;
      })
      .addCase(boxPacking.rejected, (state, { payload }) => {
        state.boxPackingFetching = false;
        state.boxPackingSuccess = false;
        state.boxPackingFail = true;
      })
      .addCase(boxPacking.pending, (state) => {
        state.boxPackingFetching = true;
        state.boxPackingSuccess = false;
        state.boxPackingFail = false;
      });
  },
});

export const boxPackingSelector = state => state.boxPacking;

export const {clearUserState} = boxPackingSlice.actions;
