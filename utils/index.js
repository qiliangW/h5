// const crypto = require('crypto');
// data:需要加解密的内容，
// key: 密钥
// 初始化向量（iv）
// function aesEncrypt(data, key, iv) {
// 给定的算法，密钥和初始化向量（iv）创建并返回Cipher对象
// const cipher = crypto.createCipheriv('aes-192-cbc', key, iv);
// Key length is dependent on the algorithm. In this case for aes192, it is 24 bytes (192 bits).
// 指定要摘要的原始内容,可以在摘要被输出之前使用多次update方法来添加摘要内容
// 数据的编码 utf8 返回值的编码 hex
//   let crypted = cipher.update(data, 'utf8', 'hex');
//   crypted += cipher.final('hex');
//   return crypted;
// }

// function aesDecrypt(data, key, iv) {
//   // 给定的算法，密钥和初始化向量（iv）创建并返回Cipher对象
//   const decipher = crypto.createDecipheriv('aes-192-cbc', key, iv);
//   // 数据的编码 hex 返回值的编码 utf8
//   let decrypted = decipher.update(data, 'hex', 'utf8');
//   decrypted += decipher.final('utf8');
//   return decrypted;
// }
// const IV = 'f710b45f04e37709'; // 初始化向量（iv）
// const data = '123456'; // 需要加解密的内容，
// const key = '123456789987654321123456'; // 24 位秘钥密钥
// const key = '1x6a5v6jyuj';
// const iv = 4;
const key = '4va897ad9av4as6v1';
const iv = 4;
const letters = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];
function decryptCode(data) {
  let dynamicCode = '';
  for (let i = 0; i < data.length; i++) {
    // eslint-disable-next-line no-loop-func
    letters.forEach((letter, letterIndex) => {
      if (data[i] === letter) {
        const index = letterIndex - iv - i;
        const str = letters[index];
        for (let j = 0; j < key.length; j++) {
          if (key[j] === str) {
            console.log(j, 'jjj');
            dynamicCode += j;
            break;
          }
        }
      }
    });
  }
  return dynamicCode;
}
// 626994
// 353025
// console.log(aesDecryptCode('ccebig'));
module.exports = {
  decryptCode,
};
