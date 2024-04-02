import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import LocalStorage from '../../services/LocalStorage';
let local = new LocalStorage();
import {API} from '../../services/Api';

//Picker Api
export const userPicker = createAsyncThunk(
  'users/userPicker',
  async (id, thunkAPI) => {
    try {
      const data = await API.userPicker();
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
  //For userPicker
  userPickerFetching: false,
  userPickerSuccess: false,
  userPickerFail: false,
  userPickerMessage: '',
  userPickerPayload:[]
};

export const userPickerSlice = createSlice({
  name: 'picker',
  initialState: initialState,
  reducers: {
    clearUserState: ( state, actions ) => {
      return {...initialState};
    },
  },
  

  extraReducers: (builder) => {
    // ************ procedureConfigurations ******************
    builder
      .addCase(userPicker.fulfilled, (state, { payload }) => {
        console.log("<======userPicker======>", payload?.data)
        state.userPickerPayload = payload.data;
        state.userPickerFetching = false;
        state.userPickerSuccess = true;
        state.userPickerFail = false;
      })
      .addCase(userPicker.rejected, (state, { payload }) => {
        state.userPickerFetching = false;
        state.userPickerSuccess = false;
        state.userPickerFail = true;
      })
      .addCase(userPicker.pending, (state) => {
        state.userPickerFetching = true;
        state.userPickerSuccess = false;
        state.userPickerFail = false;
      });
  },
});

export const userPickerSelector = state => state.picker;

export const {clearUserState} = userPickerSlice.actions;
