import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import LocalStorage from '../../services/LocalStorage';
let local = new LocalStorage();
import {API} from '../../services/Api';

//Picker Api
export const userPacker = createAsyncThunk(
  'users/userPacker',
  async (id, thunkAPI) => {
    try {
      const data = await API.userPacker();
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
  //For userPacker
  userPackerFetching: false,
  userPackerSuccess: false,
  userPackerFail: false,
  userPackerMessage: '',
  userPackerPayload:[]
};

export const userPackerSlice = createSlice({
  name: 'packer',
  initialState: initialState,
  reducers: {
    clearUserState: ( state, actions ) => {
      return {...initialState};
    },
  },
  

  extraReducers: (builder) => {
    // ************ procedureConfigurations ******************
    builder
      .addCase(userPacker.fulfilled, (state, { payload }) => {
        state.userPackerPayload = payload.data;
        state.userPackerFetching = false;
        state.userPackerSuccess = true;
        state.userPackerFail = false;
      })
      .addCase(userPacker.rejected, (state, { payload }) => {
        state.userPackerFetching = false;
        state.userPackerSuccess = false;
        state.userPackerFail = true;
      })
      .addCase(userPacker.pending, (state) => {
        state.userPackerFetching = true;
        state.userPackerSuccess = false;
        state.userPackerFail = false;
      });
  },
});

export const userPackerSelector = state => state.packer;

export const {clearUserState} = userPackerSlice.actions;
