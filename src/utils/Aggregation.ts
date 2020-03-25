import { PrivateKey, RawPrivateKey } from './PrivateKey';
import { PublicKey, RawPublicKey } from './PublicKey';

export class Aggregation {
  // Derives a shared public key by combining both of the public keys.
  static derivePublicKey(publicKey1: RawPublicKey, publicKey2: RawPublicKey): PublicKey {
    return new PublicKey(publicKey1).addPublicKey(publicKey2);
  }

  // Derives a shared private key by combining both of the private keys.
  static derivePrivateKey(privateKey1: RawPrivateKey, privateKey2: RawPrivateKey): PrivateKey {
    return new PrivateKey(privateKey1).addPrivateKey(privateKey2);
  }
}
