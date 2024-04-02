export const regex = {
  email: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/,
  characterLimit: /^.{8,}$/,
  lower: /[a-z]/,
  upper: /[A-Z]/,
  number: /\d/,
  specialCharacter: /[!@#$%^&*(),.?":{}|<>+=]/,
  dateReg: /^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])\/\d{4}$/,
  dateFormatReg: /^\d{2}-\d{2}-\d{4}$/,
  decimal: /^-?\d*\.?\d*$/,
  base64: /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/,
};  
