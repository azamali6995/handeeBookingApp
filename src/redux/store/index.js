import { configureStore } from '@reduxjs/toolkit'
import { userLoginSlice } from '../slice/authSlice';
import { userOrderSlice } from '../slice/orderSlice';
import { userPickerSlice } from '../slice/pickerSlice';
import { userPackerSlice } from '../slice/packerSlice';
import { userShipperSlice } from '../slice/shipperSlice';
import { boxScanningSlice } from '../slice/boxScanningSlice'
import { markAsPickedSlice } from '../slice/markAsPickedSlice';

const store = configureStore({
  reducer: {
    auth: userLoginSlice.reducer,
    order: userOrderSlice.reducer,
    picker: userPickerSlice.reducer,
    packer: userPackerSlice.reducer,
    shipper: userShipperSlice.reducer,
    boxScan: boxScanningSlice.reducer,
    markPicked: markAsPickedSlice.reducer
  },
});

export default store;