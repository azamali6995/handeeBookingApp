import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import LocalStorage from '../../services/LocalStorage';
let local = new LocalStorage();
import {API} from '../../services/Api';

//Box packing Api
export const pakedMarkedByPaker = createAsyncThunk(
  'users/pakedMarkedByPaker',
  async (body, thunkAPI) => {
    try {
      const data = await API.pakedMarkedByPaker(body);
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
  //For pakedMarkedByPaker
  pakedMarkedByPakerFetching: false,
  pakedMarkedByPakerSuccess: false,
  pakedMarkedByPakerFail: false,
  pakedMarkedByPakerMessage: '',
  pakedMarkedByPakerPayload:[]
};

export const pakedMarkedByPakerSlice = createSlice({
  name: 'pakedMarkedByPaker',
  initialState: initialState,
  reducers: {
    clearUserState: ( state, actions ) => {
      return {...initialState};
    },
  },
  

  extraReducers: (builder) => {
    // ************ procedureConfigurations ******************
    builder
      .addCase(pakedMarkedByPaker.fulfilled, (state,  payload ) => {
        console.log("<======pakedMarkedByPaker======>",payload?.payload?.data)
        state.pakedMarkedByPakerPayload = payload?.payload?.data;
        state.pakedMarkedByPakerFetching = false;
        state.pakedMarkedByPakerSuccess = true;
        state.pakedMarkedByPakerFail = false;
      })
      .addCase(pakedMarkedByPaker.rejected, (state, { payload }) => {
        state.pakedMarkedByPakerFetching = false;
        state.pakedMarkedByPakerSuccess = false;
        state.pakedMarkedByPakerFail = true;
      })
      .addCase(pakedMarkedByPaker.pending, (state) => {
        state.pakedMarkedByPakerFetching = true;
        state.pakedMarkedByPakerSuccess = false;
        state.pakedMarkedByPakerFail = false;
      });
  },
});

export const pakedMarkedByPakerSelector = state => state.pakedMarkedByPaker;

export const {clearUserState} = pakedMarkedByPakerSlice.actions;
