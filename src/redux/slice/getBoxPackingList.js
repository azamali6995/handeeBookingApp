import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import LocalStorage from '../../services/LocalStorage';
let local = new LocalStorage();
import {API} from '../../services/Api';

//Box packing Api
export const getBoxPacking = createAsyncThunk(
  'users/getBoxPacking',
  async (id, thunkAPI) => {
    try {
      const data = await API.getBoxPacking(id);
      if (data?.status == 200) {
        console.log("first========>", data?.data?.data )
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
  //For getBoxPacking
  getBoxPackingFetching: false,
  getBoxPackingSuccess: false,
  getBoxPackingFail: false,
  getBoxPackingMessage: '',
  getBoxPackingPayload:[]
};

export const getBoxPackingSlice = createSlice({
  name: 'getBoxlist',
  initialState: initialState,
  reducers: {
    clearUserState: ( state, actions ) => {
      return {...initialState};
    },
  },
  

  extraReducers: (builder) => {
    // ************ procedureConfigurations ******************
    builder
      .addCase(getBoxPacking.fulfilled, (state,  payload ) => {
        state.getBoxPackingPayload = payload?.payload?.data?.data;
        state.getBoxPackingFetching = false;
        state.getBoxPackingSuccess = true;
        state.getBoxPackingFail = false;
      })
      .addCase(getBoxPacking.rejected, (state, { payload }) => {
        state.getBoxPackingFetching = false;
        state.getBoxPackingSuccess = false;
        state.getBoxPackingFail = true;
      })
      .addCase(getBoxPacking.pending, (state) => {
        state.getBoxPackingFetching = true;
        state.getBoxPackingSuccess = false;
        state.getBoxPackingFail = false;
      });
  },
});

export const getBoxPackingSelector = state => state.getBoxlist;

export const {clearUserState} = getBoxPackingSlice.actions;
