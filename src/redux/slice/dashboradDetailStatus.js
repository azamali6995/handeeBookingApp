import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import LocalStorage from '../../services/LocalStorage';
let local = new LocalStorage();
import {API} from '../../services/Api';

//Picker Api
export const dashboardStatus = createAsyncThunk(
  'users/dashboardStatus',
  async (id, thunkAPI) => {
    try {
      const data = await API.dashboardStatus();
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
  //For dashboardStatus
  dashboardStatusFetching: false,
  dashboardStatusSuccess: false,
  dashboardStatusFail: false,
  dashboardStatusMessage: '',
  dashboardStatusPayload:[]
};

export const dashboardStatusSlice = createSlice({
  name: 'dashboard',
  initialState: initialState,
  reducers: {
    clearUserState: ( state, actions ) => {
      return {...initialState};
    },
  },
  

  extraReducers: (builder) => {
    // ************ procedureConfigurations ******************
    builder
      .addCase(dashboardStatus.fulfilled, (state, { payload }) => {
        state.dashboardStatusPayload = payload.data?.data;
        state.dashboardStatusFetching = false;
        state.dashboardStatusSuccess = true;
        state.dashboardStatusFail = false;
      })
      .addCase(dashboardStatus.rejected, (state, { payload }) => {
        state.dashboardStatusFetching = false;
        state.dashboardStatusSuccess = false;
        state.dashboardStatusFail = true;
      })
      .addCase(dashboardStatus.pending, (state) => {
        state.dashboardStatusFetching = true;
        state.dashboardStatusSuccess = false;
        state.dashboardStatusFail = false;
      });
  },
});

export const dashboardStatusSelector = state => state.dashboard;

export const {clearUserState} = dashboardStatusSlice.actions;
