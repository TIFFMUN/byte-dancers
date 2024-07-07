import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
const KEY = crypto.randomBytes(32); // Use a persistent key, preferably from an environment variable
const IV = crypto.randomBytes(16); // For AES, this is always 16

export const encrypt = (text: string) => {
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(KEY), IV);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return {
    iv: IV.toString('hex'),
    encryptedData: encrypted.toString('hex')
  };
};

export const decrypt = (text: any) => {
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(KEY), Buffer.from(text.iv, 'hex'));
  let decrypted = decipher.update(Buffer.from(text.encryptedData, 'hex'));
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};
