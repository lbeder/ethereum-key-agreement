import { PrivateKey, RawPrivateKey } from './PrivateKey';
import { PublicKey, RawPublicKey } from './PublicKey';

export const keyToBuf = (key: RawPrivateKey | RawPublicKey): Buffer => {
  const tmp = key;
  if (typeof key === 'string') {
    let str: string = tmp as string;
    if (str.startsWith('0x')) {
      str = str.slice(2) || '0';
    }

    return Buffer.from(str, 'hex');
  }

  if (Buffer.isBuffer(key)) {
    return key;
  }

  if (key instanceof PrivateKey || key instanceof PublicKey) {
    return key.key;
  }

  throw new Error('Invalid key type');
};
