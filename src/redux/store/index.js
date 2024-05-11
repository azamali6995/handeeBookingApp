import { configureStore } from '@reduxjs/toolkit'
import { userLoginSlice } from '../slice/authSlice';
import { userOrderSlice } from '../slice/orderSlice';
import { userPickerSlice } from '../slice/pickerSlice';
import { userPackerSlice } from '../slice/packerSlice';
import { userShipperSlice } from '../slice/shipperSlice';
import { boxScanningSlice } from '../slice/boxScanningSlice'
import { markAsPickedSlice } from '../slice/markAsPickedSlice';
import { pickedMarkByPickerListSlice } from '../slice/pickedMarkByPickerList'
import { totalCount} from '../slice/QrCodeSlice'
import { boxPackingSlice } from '../slice/boxPacking'
import { pakedMarkedByPakerSlice } from '../slice/packedMarkedByPaker'
import { shippedMarkByShipperSlice } from '../slice/shippedMarkByShipper';
import { getBoxPackingSlice } from '../slice/getBoxPackingList'
import { completedOrdersSlice } from '../slice/completedOrder'
import { dashboardStatusSlice } from '../slice/dashboradDetailStatus';

const store = configureStore({
  reducer: {
    ScanningCount: totalCount,
    auth: userLoginSlice.reducer,
    order: userOrderSlice.reducer,
    picker: userPickerSlice.reducer,
    packer: userPackerSlice.reducer,
    shipper: userShipperSlice.reducer,
    boxScan: boxScanningSlice.reducer,
    markPicked: markAsPickedSlice.reducer,
    MarkByPickerList : pickedMarkByPickerListSlice.reducer,
    boxPacking : boxPackingSlice.reducer,
    pakedMarkedByPaker : pakedMarkedByPakerSlice.reducer,
    shippedMarked: shippedMarkByShipperSlice.reducer,
    getBoxlist : getBoxPackingSlice.reducer,
    completed : completedOrdersSlice.reducer,
    dashboard : dashboardStatusSlice.reducer
  },
});

export default store;