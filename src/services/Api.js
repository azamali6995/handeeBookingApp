import {request} from './APIHandler';
export const API = {
  userLogin:(body) => request.post('api/Account/login',body),
  userOrder:() => request.get(`api/order/getByPackerId`), // For Now not used
  userPicker:() => request.get(`api/order/getByPickerId`),
  userPacker:() => request.get(`api/order/getByPackerId`),
  userShipper:() => request.get(`api/order/getByShipperId`),
  boxScanning:(id) => request.get('api/order/getByPackerId',id), // Pending
  
  markAsPicked:(body) => request.post('api/order/pickedMarkByPicker',body),
  pickedMarkByPickerList:(body) => request.post('api/order/pickedMarkByPickerList',body),    // this one call on press button 
  boxPacking:(body) => request.post('api/packingBox/addOrUpdate',body),
  pakedMarkedByPaker:(body) => request.post('api/order/packedMarkByPacker',body),
  shippedMarkByShipper:(body) => request.post('api/order/shippedMarkByShipper',body),

  
};
