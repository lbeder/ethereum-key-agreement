import secp256k1 from 'secp256k1';

import { keyToBuf } from './buffer';
import { PublicKey } from './PublicKey';

export type RawPrivateKey = string | Buffer | PrivateKey;

export const COMPRESSED_PRIVATE_KEY_LENGTH = 32;

export class PrivateKey {
  public key: Buffer;

  constructor(rawKey: RawPrivateKey) {
    this.key = keyToBuf(rawKey);

    const keyLength = this.key.length;
    if (keyLength !== COMPRESSED_PRIVATE_KEY_LENGTH) {
      throw new Error('Invalid key length');
    }
  }

  toPublicKey(): PublicKey {
    const tmpKey = new Uint8Array(this.key);

    return new PublicKey(Buffer.from(secp256k1.publicKeyCreate(tmpKey, true)));
  };

  toString(): string {
    return `0x${Buffer.from(this.key).toString('hex')}`;
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
