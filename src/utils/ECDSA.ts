import { keccak256, ecsign, ecrecover, toRpcSig, fromRpcSig, hashPersonalMessage } from 'ethereumjs-util';
import { Transaction } from 'ethereumjs-tx';

import { PublicKey, RawPublicKey } from './PublicKey';
import { PrivateKey, RawPrivateKey } from './PrivateKey';

export class ECDSA {
  // Recovers the public key from a signature. The method supports prefixing the message according to EIP712.
  static recoverFromMessage(message: string, signature: string, prefix: boolean = true): PublicKey | null {
    const messageBuf = Buffer.from(message);
    const messageHash = prefix ? hashPersonalMessage(messageBuf) : keccak256(messageBuf);

    try {
      const sig = fromRpcSig(signature);
      const rawSignerPublicKey = ecrecover(messageHash, sig.v, sig.r, sig.s);

      return new PublicKey(rawSignerPublicKey).toCompressed();
    } catch {
      return null;
    }
  }

  // Recovers the public key from a signed transaction.
  static recoverFromSignedTransation(txData: string): PublicKey | null {
    try {
      const rawSignerPublicKey = new Transaction(txData).getSenderPublicKey();

      return new PublicKey(rawSignerPublicKey).toCompressed();
    } catch {
      return null;
    }
  }

  // ECDSA signs a given message. The method supports prefixing the message according to EIP712.
  static sign(message: string, privateKey: RawPrivateKey, prefix: boolean = true) {
    const messageBuf = Buffer.from(message);
    const messageHash = prefix ? hashPersonalMessage(messageBuf) : keccak256(messageBuf);

    const privKey = new PrivateKey(privateKey);
    const sig = ecsign(messageHash, privKey.key);

    return toRpcSig(sig.v, sig.r, sig.s);
  }

  // Verifies ECDSA signature on a given message. The method supports prefixing the message according to EIP712.
  static verify(message: string, signature: string, publicKey: RawPublicKey, prefix: boolean = true): boolean {
    const signerPublicKey = ECDSA.recoverFromMessage(message, signature, prefix);
    const expectedPublicKey = new PublicKey(publicKey).toCompressed();

    return signerPublicKey ? signerPublicKey.key.equals(expectedPublicKey.key) : false;
  }
}
