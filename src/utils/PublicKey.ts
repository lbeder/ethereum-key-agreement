import secp256k1 from 'secp256k1';
import { keccak256, toChecksumAddress } from 'ethereumjs-util';

import { BaseKey } from './BaseKey';

export type RawPublicKey = string | Buffer | PublicKey;

export const COMPRESSED_PUBLIC_KEY_LENGTH = 33;
export const UNCOMPRESSED_PUBLIC_KEY_LENGTH = 64;
const UNCOMPRESSED_PUBLIC_KEY_PREFIX = 0x04;

export class PublicKey extends BaseKey {
  public compressed: boolean;

  constructor(key: RawPublicKey) {
    super(key);

    if (this.key[0] === UNCOMPRESSED_PUBLIC_KEY_PREFIX) {
      this.key = this.key.slice(1);
    }

    const keyLength = this.key.length;
    if (keyLength !== COMPRESSED_PUBLIC_KEY_LENGTH && keyLength !== UNCOMPRESSED_PUBLIC_KEY_LENGTH) {
      throw new Error('Invalid key length');
    }

    this.compressed = keyLength === COMPRESSED_PUBLIC_KEY_LENGTH;
  }

  static isValid(key: RawPublicKey): boolean {
    try {
      // tslint:disable-next-line: no-unused-expression
      new PublicKey(key);

      return true;
    } catch {
      return false;
    }
  }

  toCompressed(): PublicKey {
    if (this.compressed) {
      return new PublicKey(this.key);
    }

    // Uncompress the public key and remove the first 0x04 byte indicating the previous uncompressed form.
    const tmpKey = new Uint8Array([UNCOMPRESSED_PUBLIC_KEY_PREFIX, ...this.key]);

    return new PublicKey(Buffer.from(secp256k1.publicKeyConvert(tmpKey, true)));
  }

  toUncompressed(): PublicKey {
    if (!this.compressed) {
      return new PublicKey(this.key);
    }

    const tmpKey = new Uint8Array(this.key);

    return new PublicKey(Buffer.from(secp256k1.publicKeyConvert(tmpKey, false)));
  }

  toAddress(): string {
    const tmpKey = this.toUncompressed();
    const address = keccak256(tmpKey.key).slice(-20);

    return `0x${address.toString('hex')}`;
  }

  toChecksumAddress(): string {
    return toChecksumAddress(this.toAddress());
  }

  addPublicKey(key: RawPublicKey): PublicKey {
    const tmpKey = new Uint8Array(this.key);

    return new PublicKey(Buffer.from(secp256k1.publicKeyCombine([tmpKey, new PublicKey(key).key], this.compressed)));
  }
}
