
import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    qrScanningCount :[]
}

const ScanningCount = createSlice({
    name: 'totalCount',
    initialState,
    reducers: {
        CountTotalScanning: (state, action) => {   
            if (!state.qrScanningCount.includes(action.payload)) {
                state.qrScanningCount.push(action.payload);
            }
        }
    }
});
export const { CountTotalScanning } = ScanningCount.actions
export const totalCount = ScanningCount.reducer