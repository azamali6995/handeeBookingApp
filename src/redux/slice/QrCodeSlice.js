// import {createSlice} from "@reduxjs/toolkit"

// const initialState = {
//     qrScanningCount :[]
// }

// const ScanningCount = createSlice({
//     name: 'totalCount',
//     initialState,
//     reducers: {
//         CountTotalScanning: (state, action) => {
//           console.log("action87687", action.payload)

//             // if (!state.qrScanningCount.includes(action.payload)) {
//             //     state.qrScanningCount.push(action.payload);
//             // }

//             const { itemId, minQuantity } = action.payload;
//             const validMinQuantity = minQuantity && minQuantity !== "" ? parseInt(minQuantity) : 1;
//             console.log("first786867", validMinQuantity )
//             const existingItem = state.qrScanningCount.find(item => item.itemId === itemId);
//             if (existingItem) {
//               existingItem.finalQuantity += validMinQuantity;
//             } else {
//               state.qrScanningCount.push({
//                 ...action.payload,
//                 finalQuantity: validMinQuantity
//               });
//             }
//         }
//     }
// });
// export const { CountTotalScanning } = ScanningCount.actions
// export const totalCount = ScanningCount.reducer

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  qrScanningCount: [],
};

const ScanningCount = createSlice({
  name: "totalCount",
  initialState,
  reducers: {
    CountTotalScanning: (state, action) => {
      // if (!state.qrScanningCount.includes(action.payload)) {
      //     state.qrScanningCount.push(action.payload);
      // }

      const { itemId, minQuantity, type } = action.payload;

      if(type === 'reset'){
        state.qrScanningCount = []
      }else{

        if (type === "check") {
          const index = state.qrScanningCount.findIndex(
            (item) => item.itemId === itemId
          );
  
          if (index > -1) {
            // Record exists, remove it
            state.qrScanningCount.splice(index, 1);
            // console.log(⁠ Record with id ${record.id} removed ⁠);
          } else {
            const validMinQuantity =
              minQuantity && minQuantity !== "" ? parseInt(minQuantity) : 1;
            // Record doesn't exist, add it
            state.qrScanningCount.push({
              ...action.payload,
              finalQuantity: validMinQuantity,
            });
            // console.log(⁠ Record with id ${record.id} added ⁠);
          }
        } else {
          const validMinQuantity =
            minQuantity && minQuantity !== "" ? parseInt(minQuantity) : 1;
          const existingItem = state.qrScanningCount.find(
            (item) => item.itemId === itemId
          );
          if (existingItem) {
            existingItem.finalQuantity += validMinQuantity;
          } else {
            state.qrScanningCount.push({
              ...action.payload,
              finalQuantity: validMinQuantity,
            });
          }
        }
      }



      
    },





  },
});
export const { CountTotalScanning } = ScanningCount.actions;
export const totalCount = ScanningCount.reducer;
