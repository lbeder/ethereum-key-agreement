import secp256k1 from 'secp256k1';
import util from 'ethereumjs-utils';

export const COMPRESSED_PUBLIC_KEY_LENGTH = 33;
export const UNCOMPRESSED_PUBLIC_KEY_LENGTH = 64;
export const COMPRESSED_PRIVATE_KEY_LENGTH = 32;
const UNCOMPRESSED_PUBLIC_KEY_PREFIX = 0x04;

const MESSAGE_SIGNATURE_PREFIX = Buffer.from('\x19Ethereum Signed Message:\n');

const keyToBuf = key => {
  let tmp = key;
  if (typeof key === 'string' && tmp.startsWith('0x')) {
    tmp = tmp.slice(2) || '0';

    return Buffer.from(tmp, 'hex');
  }

  if (Buffer.isBuffer(key)) {
    return key;
  }

  if (key instanceof PrivateKey || key instanceof PublicKey) {
    return key.key;
  }

  throw new Error('Invalid key type');
};

export class PrivateKey {
  constructor(rawKey) {
    this.key = keyToBuf(rawKey);

    const keyLength = this.key.length;
    if (keyLength !== COMPRESSED_PRIVATE_KEY_LENGTH) {
      throw new Error('Invalid key length');
    }
  }

  toPublicKey() {
    const tmpKey = new Uint8Array(this.key);

    return new PublicKey(Buffer.from(secp256k1.publicKeyCreate(tmpKey, true)));
  };

  toString() {
    return `0x${Buffer.from(this.key).toString('hex')}`;
  }

  mulPrivateKey(key) {
    const tmpKey = new Uint8Array(this.key);

    return new PrivateKey(Buffer.from(secp256k1.privateKeyTweakMul(tmpKey, new PrivateKey(key).key)));
  }

  addPrivateKey(key) {
    const tmpKey = new Uint8Array(this.key);

    return new PrivateKey(Buffer.from(secp256k1.privateKeyTweakAdd(tmpKey, new PrivateKey(key).key)));
  }
}

export class PublicKey {
  constructor(rawKey) {
    this.key = keyToBuf(rawKey);

    if (this.key[0] === UNCOMPRESSED_PUBLIC_KEY_PREFIX) {
      this.key = this.key.slice(1);
    }

    const keyLength = this.key.length;
    if (keyLength !== COMPRESSED_PUBLIC_KEY_LENGTH && keyLength !== UNCOMPRESSED_PUBLIC_KEY_LENGTH) {
      throw new Error('Invalid key length');
    }

    this.compressed = keyLength === COMPRESSED_PUBLIC_KEY_LENGTH;
  }

  toCompressed() {
    if (this.compressed) {
      return new PublicKey(this.key);
    }

    // Uncompress the public key and remove the first 0x04 byte indicating the previous uncompressed form.
    const tmpKey = new Uint8Array([UNCOMPRESSED_PUBLIC_KEY_PREFIX, ...this.key]);

    return new PublicKey(Buffer.from(secp256k1.publicKeyConvert(tmpKey, true)));
  };

  toUncompressed() {
    if (!this.compressed) {
      return new PublicKey(this.key);
    }

    const tmpKey = new Uint8Array(this.key);

    return new PublicKey(Buffer.from(secp256k1.publicKeyConvert(tmpKey, false)));
  }

  toAddress() {
    const tmpKey = this.toUncompressed();
    const address = util.keccak256(tmpKey.key).slice(-20);

    return `0x${address.toString('hex')}`;
  };

  toChecksumAddress() {
    return util.toChecksumAddress(this.toAddress());
  }

  toString() {
    return `0x${Buffer.from(this.key).toString('hex')}`;
  }

  addPublicKey(key) {
    const tmpKey = new Uint8Array(this.key);

    return new PublicKey(Buffer.from(secp256k1.publicKeyCombine([tmpKey, new PublicKey(key).key], this.compressed)));
  }
}

export class ECDH {
  // Derives an ECDH shared public key.
  static derivePublicKey(publicKey, privateKey) {
    // Creates the compressed public key from X and Y values.
    const hashfn = (x, y) => {
      const pubKey = new Uint8Array(33);
      pubKey[0] = (y[31] & 1) === 0 ? 0x02 : 0x03;
      pubKey.set(x, 1);

      return pubKey;
    };

    const tmpPublicKey = new Uint8Array(new PublicKey(publicKey).key);

    return new PublicKey(Buffer.from(secp256k1.ecdh(tmpPublicKey, new PrivateKey(privateKey).key, { hashfn },
      Buffer.alloc(COMPRESSED_PUBLIC_KEY_LENGTH))));
  }

  // Derives an ECDH shared private key.
  static derivePrivateKey(privateKey1, privateKey2) {
    const tmpPrivateKey = new PrivateKey(privateKey1);

    return tmpPrivateKey.mulPrivateKey(privateKey2);
  }
}

export class Aggregation {
  // Derives a shared public key by combining both of the public keys.
  static derivePublicKey(publicKey1, publicKey2) {
    return new PublicKey(publicKey1).addPublicKey(publicKey2);
  }

  // Derives a shared private key by combining both of the private keys.
  static derivePrivateKey(privateKey1, privateKey2) {
    return new PrivateKey(privateKey1).addPrivateKey(privateKey2);
  }
}

export class ECDSA {
  // Verifies ECDSA signature on a given message. Please note, that this method assumes that:
  // 1. The message was properly prefixed before signing (with "\x19Ethereum Signed Message:\n" + length of the message).
  // 2. The prefixed message was keccak256 hashed before signing.
  static verifySignature(message, signature, publicKey) {
    const prefixedMessageHash = util.keccak256(Buffer.concat([
      MESSAGE_SIGNATURE_PREFIX, Buffer.from(String(message.length)), Buffer.from(message)
    ]));

    let rawSignerPublicKey;
    try {
      const sig = util.fromRpcSig(signature);
      rawSignerPublicKey = util.ecrecover(prefixedMessageHash, sig.v, sig.r, sig.s);
    } catch {
      return false;
    }

    const signerPublicKey = new PublicKey(rawSignerPublicKey).toCompressed();
    const expectedPublicKey = new PublicKey(publicKey).toCompressed();

    return signerPublicKey.key.equals(expectedPublicKey.key);
  }
}
