import CryptoJS from 'crypto-js';

export const generatePassword = (email: string, password: string) => {
  const salt = email;
  const crypt = CryptoJS.PBKDF2(password, salt, {
    keySize: 128 / 32,
    iterations: 1000,
  }).toString();
  return {password: crypt, salt: salt};
};

export const sha256 = (value: string) => {
  return CryptoJS.SHA256(value).toString();
};

export const base64Encode = (value: string) => {
  return Buffer.from(value).toString('base64');
};

export const base64Decode = (value: string) => {
  return Buffer.from(value, 'base64').toString();
};

export const hashPassword = (password: string, salt: string) => {
  return CryptoJS.PBKDF2(password, salt, {keySize: 256 / 32}).toString();
};

export const thousandSeparator = (x: string, isCurrency: boolean = true) => {
  try {
    let dec = x.split('.');
    let len = dec && dec.length > 2 ? dec.length : 2;
    let num = Number(x).toFixed(len);
    let parts = num.split(',');
    if (isCurrency)
      parts[0] = 'Rp ' + parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    else parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return parts.join(',');
  } catch (e) {
    return null;
  }
};

export const addZeroes = (num: string) => {
  const dec = num.split('.')[1];
  const len = dec && dec.length > 2 ? dec.length : 2;
  return Number(num).toFixed(len);
};

export const verifyPassword = (
  inputPassword: string,
  storedHash: string,
  email: string,
) => {
  const salt = email;
  const inputHash = CryptoJS.PBKDF2(inputPassword, salt, {
    keySize: 128 / 32,
    iterations: 1000,
  }).toString();

  return inputHash === storedHash;
};
