import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import LocalStorage from '../../services/LocalStorage';
let local = new LocalStorage();
import {API} from '../../services/Api';

//Picker Api
export const markAsPicked = createAsyncThunk(
  'users/markAsPicked',
  async (body, thunkAPI) => {
    try {
      const data = await API.markAsPicked(body);
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
  //For markAsPicked
  markAsPickedFetching: false,
  markAsPickedSuccess: false,
  markAsPickedFail: false,
  markAsPickedMessage: '',
  markAsPickedPayload:[]
};

export const markAsPickedSlice = createSlice({
  name: 'markPicked',
  initialState: initialState,
  reducers: {
    clearUserState: ( state, actions ) => {
      return {...initialState};
    },
  },
  

  extraReducers: (builder) => {
    // ************ procedureConfigurations ******************
    builder
      .addCase(markAsPicked.fulfilled, (state, { payload }) => {
        console.log("<======markAsPicked======>", payload?.data)
        state.markAsPickedPayload = payload.data;
        state.markAsPickedFetching = false;
        state.markAsPickedSuccess = true;
        state.markAsPickedFail = false;
      })
      .addCase(markAsPicked.rejected, (state, { payload }) => {
        state.markAsPickedFetching = false;
        state.markAsPickedSuccess = false;
        state.markAsPickedFail = true;
      })
      .addCase(markAsPicked.pending, (state) => {
        state.markAsPickedFetching = true;
        state.markAsPickedSuccess = false;
        state.markAsPickedFail = false;
      });
  },
});

export const markAsPickedSelector = state => state.markPicked;
export const {clearUserState} = markAsPickedSlice.actions;
