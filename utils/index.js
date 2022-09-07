const crypto = require('crypto');
// data:需要加解密的内容，
// key: 密钥
// 初始化向量（iv）
function aesEncrypt(data, key, iv) {
  // 给定的算法，密钥和初始化向量（iv）创建并返回Cipher对象
  const cipher = crypto.createCipheriv('aes-192-cbc', key, iv);
  // Key length is dependent on the algorithm. In this case for aes192, it is 24 bytes (192 bits).
  // 指定要摘要的原始内容,可以在摘要被输出之前使用多次update方法来添加摘要内容
  // 数据的编码 utf8 返回值的编码 hex
  let crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function aesDecrypt(data, key, iv) {
  // 给定的算法，密钥和初始化向量（iv）创建并返回Cipher对象
  const decipher = crypto.createDecipheriv('aes-192-cbc', key, iv);
  // 数据的编码 hex 返回值的编码 utf8
  let decrypted = decipher.update(data, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
// const IV = 'f710b45f04e37709'; // 初始化向量（iv）
// const data = '123456'; // 需要加解密的内容，
// const key = '123456789987654321123456'; // 24 位秘钥密钥

module.exports = {
  aesEncrypt,
  aesDecrypt,
};
