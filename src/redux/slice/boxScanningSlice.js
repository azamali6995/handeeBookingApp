import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import LocalStorage from '../../services/LocalStorage';
let local = new LocalStorage();
import {API} from '../../services/Api';

//Picker Api
export const boxScanning = createAsyncThunk(
  'users/boxScanning',
  async (id, thunkAPI) => {
    try {
      const data = await API.boxScanning(id);
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
  //For boxScanning
  boxScanningFetching: false,
  boxScanningSuccess: false,
  boxScanningFail: false,
  boxScanningMessage: '',
  boxScanningPayload:[]
};

export const boxScanningSlice = createSlice({
  name: 'boxScan',
  initialState: initialState,
  reducers: {
    clearUserState: ( state, actions ) => {
      return {...initialState};
    },
  },
  

  extraReducers: (builder) => {
    // ************ procedureConfigurations ******************
    builder
      .addCase(boxScanning.fulfilled, (state, { payload }) => {
        console.log("<======boxScanning======>", payload?.data)
        state.boxScanningPayload = payload.data;
        state.boxScanningFetching = false;
        state.boxScanningSuccess = true;
        state.boxScanningFail = false;
      })
      .addCase(boxScanning.rejected, (state, { payload }) => {
        state.boxScanningFetching = false;
        state.boxScanningSuccess = false;
        state.boxScanningFail = true;
      })
      .addCase(boxScanning.pending, (state) => {
        state.boxScanningFetching = true;
        state.boxScanningSuccess = false;
        state.boxScanningFail = false;
      });
  },
});

export const boxScanningSelector = state => state.boxScan;

export const {clearUserState} = boxScanningSlice.actions;
