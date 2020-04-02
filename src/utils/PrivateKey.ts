import secp256k1 from 'secp256k1';

import { BaseKey } from './BaseKey';
import { PublicKey } from './PublicKey';

export type RawPrivateKey = string | Buffer | PrivateKey;

export const COMPRESSED_PRIVATE_KEY_LENGTH = 32;

export class PrivateKey extends BaseKey {
  constructor(key: RawPrivateKey) {
    super(key);

    const keyLength = this.key.length;
    if (keyLength !== COMPRESSED_PRIVATE_KEY_LENGTH) {
      throw new Error('Invalid key length');
    }
  }

  static isValid(key: RawPrivateKey): boolean {
    try {
      // tslint:disable-next-line: no-unused-expression
      new PrivateKey(key);

      return true;
    } catch {
      return false;
    }
  }

  toPublicKey(): PublicKey {
    const tmpKey = new Uint8Array(this.key);

    return new PublicKey(Buffer.from(secp256k1.publicKeyCreate(tmpKey, true)));
  }

  mulPrivateKey(key: RawPrivateKey): PrivateKey {
    const tmpKey = new Uint8Array(this.key);

    return new PrivateKey(Buffer.from(secp256k1.privateKeyTweakMul(tmpKey, new PrivateKey(key).key)));
  }

  addPrivateKey(key: RawPrivateKey): PrivateKey {
    const tmpKey = new Uint8Array(this.key);

    return new PrivateKey(Buffer.from(secp256k1.privateKeyTweakAdd(tmpKey, new PrivateKey(key).key)));
  }
}
