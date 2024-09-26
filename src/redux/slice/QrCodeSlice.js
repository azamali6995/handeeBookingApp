import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    qrScanningCount :[]
}

const ScanningCount = createSlice({
    name: 'totalCount',
    initialState,
    reducers: {
        CountTotalScanning: (state, action) => {   
            // if (!state.qrScanningCount.includes(action.payload)) {
            //     state.qrScanningCount.push(action.payload);
            // }

            const { itemId, minQuantity } = action.payload;
            const validMinQuantity = minQuantity && minQuantity !== "" ? parseInt(minQuantity) : 1;
            const existingItem = state.qrScanningCount.find(item => item.itemId === itemId);
            if (existingItem) {
              existingItem.finalQuantity += validMinQuantity;
            } else {
              state.qrScanningCount.push({
                ...action.payload,
                finalQuantity: validMinQuantity
              });
            }
        }
    }
});
export const { CountTotalScanning } = ScanningCount.actions
export const totalCount = ScanningCount.reducer