import secp256k1 from 'secp256k1';
import { keccak256 } from 'js-sha3';

const keyToBuf = (key) => {
  let tmp = key;
  if (typeof key === "string" && tmp.startsWith('0x')) {
    tmp = tmp.slice(2) || '0';

    return Buffer.from(tmp, 'hex');
  }

  return key;
}

export const deriveECDHCompressedPublicKey = (publicKey, privateKey) => {
  // Create the compressed public key from X and Y values.
  const hashfn = (x, y) => {
    const pubKey = new Uint8Array(33)
    pubKey[0] = (y[31] & 1) === 0 ? 0x02 : 0x03
    pubKey.set(x, 1)

    return pubKey
  }

  const sharedPubKey = secp256k1.ecdh(keyToBuf(publicKey), keyToBuf(privateKey), { hashfn },
    Buffer.alloc(33));

  return `0x${sharedPubKey.toString('hex')}`;
};

export const uncompressPublicKey = (publicKey) => {
  const compressedKey = secp256k1.publicKeyConvert(keyToBuf(publicKey), false).slice(1);

  return `0x${Buffer.from(compressedKey).toString('hex')}`;
};

export const compressedPublicKeyToAddress = (publicKey) => {
  // Uncompress the public key and remove the first 0x04 byte indicating the previous uncompressed form.
  const uncompressedSharedPubKey = uncompressPublicKey(publicKey);
  const address = keccak256(keyToBuf(uncompressedSharedPubKey)).slice(-40);

  return `0x${address}`;
};

export const multiplyPrivateKeys = (privateKey1, privateKey2) => {
  const combinedKey = secp256k1.privateKeyTweakMul(keyToBuf(privateKey1), keyToBuf(privateKey2));

  return `0x${combinedKey.toString('hex')}`;
};

export const privateKeyToCompressedPublicKey = (privateKey) => {
  const compressedKey = secp256k1.publicKeyCreate(keyToBuf(privateKey));

  return `0x${Buffer.from(compressedKey).toString('hex')}`;
};
