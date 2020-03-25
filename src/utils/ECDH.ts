import { ecdh } from 'secp256k1';

import { PrivateKey, RawPrivateKey } from './PrivateKey';
import { PublicKey, RawPublicKey, COMPRESSED_PUBLIC_KEY_LENGTH } from './PublicKey';

export class ECDH {
  // Derives an ECDH shared public key.
  static derivePublicKey(publicKey: RawPublicKey, privateKey: RawPrivateKey): PublicKey {
    // Creates the compressed public key from X and Y values.
    const hashfn = (x: Uint8Array, y: Uint8Array) => {
      const pubKey = new Uint8Array(33);
      // tslint:disable-next-line: no-bitwise
      pubKey[0] = (y[31] & 1) === 0 ? 0x02 : 0x03;
      pubKey.set(x, 1);

      return pubKey;
    };

    const tmpPublicKey = new Uint8Array(new PublicKey(publicKey).key);

    return new PublicKey(Buffer.from(ecdh(tmpPublicKey, new PrivateKey(privateKey).key, { hashfn },
      Buffer.alloc(COMPRESSED_PUBLIC_KEY_LENGTH))));
  }

  // Derives an ECDH shared private key.
  static derivePrivateKey(privateKey1: RawPrivateKey, privateKey2: RawPrivateKey): PrivateKey {
    const tmpPrivateKey = new PrivateKey(privateKey1);

    return tmpPrivateKey.mulPrivateKey(privateKey2);
  }
}
