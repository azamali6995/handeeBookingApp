import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import LocalStorage from '../../services/LocalStorage';
let local = new LocalStorage();
import {API} from '../../services/Api';

//Picker Api
export const pickedMarkByPickerList = createAsyncThunk(
  'users/pickedMarkByPickerList',
  async (body, thunkAPI) => {
    try {
      const data = await API.pickedMarkByPickerList(body);
      console.log("ApiTest", data)
      if (data.status == 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("ApiErroCase", e)
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

const initialState = {
  //For pickedMarkByPickerList
  pickedMarkByPickerListFetching: false,
  pickedMarkByPickerListSuccess: false,
  pickedMarkByPickerListFail: false,
  pickedMarkByPickerListMessage: '',
  pickedMarkByPickerListPayload:[]
};

export const pickedMarkByPickerListSlice = createSlice({
  name: 'MarkByPickerList',
  initialState: initialState,
  reducers: {
    clearUserState: ( state, actions ) => {
      return {...initialState};
    },
  },
  

  extraReducers: (builder) => {
    // ************ procedureConfigurations ******************
    builder
      .addCase(pickedMarkByPickerList.fulfilled, (state, { payload }) => {
        console.log("AzamAliiiiiii", payload?.data)
        
        // console.log("<======pickedMarkByPickerList======>", payload?.data)
        state.pickedMarkByPickerListPayload = payload.data;
        state.pickedMarkByPickerListFetching = false;
        state.pickedMarkByPickerListSuccess = true;
        state.pickedMarkByPickerListFail = false;
      })
      .addCase(pickedMarkByPickerList.rejected, (state, { payload }) => {
        state.pickedMarkByPickerListFetching = false;
        state.pickedMarkByPickerListSuccess = false;
        state.pickedMarkByPickerListFail = true;
      })
      .addCase(pickedMarkByPickerList.pending, (state) => {
        state.pickedMarkByPickerListFetching = true;
        state.pickedMarkByPickerListSuccess = false;
        state.pickedMarkByPickerListFail = false;
      });
  },
});

export const pickedMarkByPickerListSelector = state => state.MarkByPickerList;
export const {clearUserState} = pickedMarkByPickerListSlice.actions;
