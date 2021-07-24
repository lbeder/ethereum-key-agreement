import secp256k1 from 'secp256k1';
import { BaseKey } from './BaseKey';
import { PublicKey } from './PublicKey';

export type RawPrivateKey = string | Uint8Array | PrivateKey;

export const COMPRESSED_PRIVATE_KEY_LENGTH = 32;

export class PrivateKey extends BaseKey {
  constructor(key: RawPrivateKey) {
    super(key);

    const keyLength = this.key.length;
    if (keyLength !== COMPRESSED_PRIVATE_KEY_LENGTH) {
      throw new Error('Invalid key length');
    }
  }

  public static isValid(key: RawPrivateKey): boolean {
    try {
      // tslint:disable-next-line: no-unused-expression
      new PrivateKey(key);

      return true;
    } catch {
      return false;
    }
  }

  public toPublicKey(): PublicKey {
    const tmpKey = new Uint8Array(this.key);

    return new PublicKey(secp256k1.publicKeyCreate(tmpKey, true));
  }

  public mulPrivateKey(key: RawPrivateKey): PrivateKey {
    const tmpKey = new Uint8Array(this.key);

    return new PrivateKey(secp256k1.privateKeyTweakMul(tmpKey, new PrivateKey(key).key));
  }

  public addPrivateKey(key: RawPrivateKey): PrivateKey {
    const tmpKey = new Uint8Array(this.key);

    return new PrivateKey(secp256k1.privateKeyTweakAdd(tmpKey, new PrivateKey(key).key));
  }
}
