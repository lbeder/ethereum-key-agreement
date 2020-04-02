import { keccak256, ecsign, ecrecover, toRpcSig, fromRpcSig } from 'ethereumjs-util';

import { PublicKey, RawPublicKey } from './PublicKey';
import { PrivateKey, RawPrivateKey } from './PrivateKey';

const MESSAGE_SIGNATURE_PREFIX = Buffer.from('\x19Ethereum Signed Message:\n');

export class ECDSA {
  // ECDSA signs a given message. Please note, that the during the generation of the signature:
  // 1. The message was prefixed (with "\x19Ethereum Signed Message:\n" + length of the message).
  // 2. The prefixed message was keccak256 hashed before signing.
  static sign(message: string, privateKey: RawPrivateKey) {
    const prefixedMessageHash = keccak256(
      Buffer.concat([MESSAGE_SIGNATURE_PREFIX, Buffer.from(String(message.length)), Buffer.from(message)])
    );

    const privKey = new PrivateKey(privateKey);
    const sig = ecsign(prefixedMessageHash, privKey.key);

    return toRpcSig(sig.v, sig.r, sig.s);
  }

  // Verifies ECDSA signature on a given message. Please note, that this method assumes that:
  // 1. The message was prefixed before signing (with "\x19Ethereum Signed Message:\n" + length of the message).
  // 2. The prefixed message was keccak256 hashed before signing.
  static verify(message: string, signature: string, publicKey: RawPublicKey): boolean {
    const prefixedMessageHash = keccak256(
      Buffer.concat([MESSAGE_SIGNATURE_PREFIX, Buffer.from(String(message.length)), Buffer.from(message)])
    );

    let rawSignerPublicKey;
    try {
      const sig = fromRpcSig(signature);
      rawSignerPublicKey = ecrecover(prefixedMessageHash, sig.v, sig.r, sig.s);
    } catch {
      return false;
    }

    const signerPublicKey = new PublicKey(rawSignerPublicKey).toCompressed();
    const expectedPublicKey = new PublicKey(publicKey).toCompressed();

    return signerPublicKey.key.equals(expectedPublicKey.key);
  }
}
