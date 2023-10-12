import * as CryptoJS from 'crypto-js';
import { AES } from 'crypto-js';


export function toAesSource(mess: string, secretKey = 'zxyoyo.com') {

    return AES.decrypt(mess, enhenceKey(secretKey)).toString(CryptoJS.enc.Utf8);
}

export function toAesString(mess: string, secretKey = 'zxyoyo.com') {

    return AES.encrypt(mess, enhenceKey(secretKey)).toString();
}

export const mymd5 = (key: string) => CryptoJS.MD5('my' + key + (key.toString().length * 2) + key + 'key').toString()
export const md5 = (s: string) => CryptoJS.MD5(s).toString()
const enhenceKey = (key: string) => CryptoJS.MD5('zxyo' + key + 'yo' + key.toString().length + '.com').toString()