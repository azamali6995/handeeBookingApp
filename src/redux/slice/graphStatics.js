import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import LocalStorage from '../../services/LocalStorage';
let local = new LocalStorage();
import {API} from '../../services/Api';

//Box packing Api
export const graphStatics = createAsyncThunk(
  'users/graphStatics',
  async (id, thunkAPI) => {
    try {
      const data = await API.graphStatics(id);
      console.log("first========>", data?.data?.data )

      if (data?.status == 200) {
        console.log("first========>323", data?.data?.data )
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
  //For graphStatics
  graphStaticsFetching: false,
  graphStaticsSuccess: false,
  graphStaticsFail: false,
  graphStaticsMessage: '',
  graphStaticsPayload:[]
};

export const graphStaticsSlice = createSlice({
  name: 'graphData',
  initialState: initialState,
  reducers: {
    clearUserState: ( state, actions ) => {
      return {...initialState};
    },
  },
  

  extraReducers: (builder) => {
    // ************ procedureConfigurations ******************
    builder
      .addCase(graphStatics.fulfilled, (state,  payload ) => {
        state.graphStaticsPayload = payload?.payload?.data?.data;
        state.graphStaticsFetching = false;
        state.graphStaticsSuccess = true;
        state.graphStaticsFail = false;
      })
      .addCase(graphStatics.rejected, (state, { payload }) => {
        state.graphStaticsFetching = false;
        state.graphStaticsSuccess = false;
        state.graphStaticsFail = true;
      })
      .addCase(graphStatics.pending, (state) => {
        state.graphStaticsFetching = true;
        state.graphStaticsSuccess = false;
        state.graphStaticsFail = false;
      });
  },
});

export const graphStaticsSelector = state => state.graphData;

export const {clearUserState} = graphStaticsSlice.actions;
