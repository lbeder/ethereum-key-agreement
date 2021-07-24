import { keccak256, ecsign, ecrecover, toRpcSig, fromRpcSig, hashPersonalMessage, toBuffer } from 'ethereumjs-util';
import { Transaction } from '@ethereumjs/tx';

import { PublicKey, RawPublicKey } from './PublicKey';
import { PrivateKey, RawPrivateKey } from './PrivateKey';

export class ECDSA {
  // Recovers the public key from a signature. The method supports prefixing the message according to EIP712.
  public static recoverFromMessage(message: string, signature: string, prefix: boolean = true): PublicKey | null {
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
  public static recoverFromSignedTransaction(txData: string): PublicKey | null {
    try {
      const tx = Transaction.fromSerializedTx(toBuffer(txData));
      const rawSignerPublicKey = tx.getSenderPublicKey();

      return new PublicKey(rawSignerPublicKey).toCompressed();
    } catch {
      return null;
    }
  }

  // ECDSA signs a given message. The method supports prefixing the message according to EIP712.
  public static sign(message: string, privateKey: RawPrivateKey, prefix: boolean = true) {
    const messageBuf = Buffer.from(message);
    const messageHash = prefix ? hashPersonalMessage(messageBuf) : keccak256(messageBuf);

    const privKey = new PrivateKey(privateKey);
    const sig = ecsign(messageHash, Buffer.from(privKey.key));

    return toRpcSig(sig.v, sig.r, sig.s);
  }

  // Verifies ECDSA signature on a given message. The method supports prefixing the message according to EIP712.
  public static verify(message: string, signature: string, publicKey: RawPublicKey, prefix: boolean = true): boolean {
    const signerPublicKey = ECDSA.recoverFromMessage(message, signature, prefix);
    const expectedPublicKey = new PublicKey(publicKey).toCompressed();

    return signerPublicKey ? Buffer.from(signerPublicKey.key).equals(Buffer.from(expectedPublicKey.key)) : false;
  }
}
