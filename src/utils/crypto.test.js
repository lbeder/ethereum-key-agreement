/* eslint-disable max-len */

import {
  PrivateKey, PublicKey, ECDH, Aggregation, ECDSA,
  COMPRESSED_PRIVATE_KEY_LENGTH, COMPRESSED_PUBLIC_KEY_LENGTH, UNCOMPRESSED_PUBLIC_KEY_LENGTH
} from './crypto';

describe('PrivateKey', () => {
  describe('construction', () => {
    [
      '0x123',
      '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7bab',
      '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e',
      Buffer.from('0', 'hex'),
      Buffer.from('2f9b3b0603e8af0f3e111beef5e0083a71856f9bf2260cdd73a89fb68240ea34ab', 'hex'),
      Buffer.from('2f9b3b0603e8af0f3e111beef5e0083a71856f9bf2260cdd73a89fb68240ea', 'hex'),
    ].forEach(key => {
      it(`should fail on invalid length of ${key.toString('hex')}`, async () => {
        expect(() => new PrivateKey(key)).toThrowError('Invalid key length');
      });
    });

    [
      { key: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b' },
      new Array(5),
      12345
    ].forEach(key => {
      it(`should fail on invalid type of ${typeof key}`, async () => {
        expect(() => new PrivateKey(key)).toThrowError('Invalid key type');
      });
    });

    [
      '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
      '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
      Buffer.from('9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6', 'hex'),
      Buffer.from('611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd', 'hex'),
    ].forEach(key => {
      it(`should construct a private key from ${key.toString('hex')}`, async () => {
        const privateKey = new PrivateKey(key);

        expect(privateKey.key).toHaveLength(COMPRESSED_PRIVATE_KEY_LENGTH);
      });
    });
  });

  describe('toPublicKey', () => {
    [
      {
        key: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        res: '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868'
      },
      {
        key: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        res: '0x02d4d126793b4e653aa7fc4c9e40148d61dbe707085c3cf71fe4702ed36f999c26'
      }
    ].forEach(spec => {
      const { key, res } = spec;

      it(`should convert key ${key.toString('hex')} to a public key`, async () => {
        const privateKey = new PrivateKey(key);
        const publicKey = privateKey.toPublicKey();

        expect(publicKey.toString()).toEqual(res);
      });
    });
  });

  describe('toString', () => {
    [
      {
        key: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        res: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6'
      },
      {
        key: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        res: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd'
      }
    ].forEach(spec => {
      const { key, res } = spec;

      it(`should convert key ${key.toString('hex')} to string`, async () => {
        const privateKey = new PrivateKey(key);

        expect(privateKey.toString()).toEqual(res);
      });
    });
  });

  describe('mulPrivateKey', () => {
    [
      {
        key1: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        key2: '0x2f9b3b0603e8af0f3e111beef5e0083a71856f9bf2260cdd73a89fb68240ea34',
        res: '0xb23c9218df94a2572409625aa0356241d2a916154d231f4c35fde2c2d2bcd202',
      },
      {
        key1: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        key2: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        res: '0xe1740ba7c8f39c9898622be91cc7c5019b0453006c1669860e5349057318a40e',
      },
      {
        key1: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        key2: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        res: '0x3b8a8003f04278cd57f944fd96dc82092d1414e96ffc140b416d4fb693262117',
      },
      {
        key1: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        key2: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        res: '0xb302b16b9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f97f63434e',
      }
    ].forEach(spec => {
      const { key1, key2, res } = spec;

      it(`should multiple private keys ${key1.toString('hex')} and ${key2.toString('hex')}`, async () => {
        const privateKey1 = new PrivateKey(key1);
        const privateKey2 = new PrivateKey(key2);

        expect(privateKey1.mulPrivateKey(privateKey2).toString()).toEqual(res);
        expect(privateKey2.mulPrivateKey(privateKey1).toString()).toEqual(res);
      });
    });
  });

  describe('addPrivateKey', () => {
    [
      {
        key1: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        key2: '0x2f9b3b0603e8af0f3e111beef5e0083a71856f9bf2260cdd73a89fb68240ea34',
        res: '0x72973b2eb9f2ff621c25276a518d2e2a81c75bcc5d44664ebd0c933ce40b08af',
      },
      {
        key1: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        key2: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        res: '0xfd3c32a6e57ee111e79a076460c900419c98c444a329133f417fc57d61c25273',
      },
      {
        key1: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        key2: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        res: '0xdf1c44dd7df8c803b7ba1bda68fde6e3a831c161e8661b8cd90f833867d7ec31',
      },
      {
        key1: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        key2: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        res: '0xa417ee1ad39ab9b3ec080280af25653e14eadb4390ffaa94fb382951bd7ea338',
      }
    ].forEach(spec => {
      const { key1, key2, res } = spec;

      it(`should add private keys ${key1.toString('hex')} and ${key2.toString('hex')}`, async () => {
        const privateKey1 = new PrivateKey(key1);
        const privateKey2 = new PrivateKey(key2);

        expect(privateKey1.addPrivateKey(privateKey2).toString()).toEqual(res);
        expect(privateKey2.addPrivateKey(privateKey1).toString()).toEqual(res);
      });
    });
  });
});

describe('PublicKey', () => {
  describe('construction', () => {
    [
      '0x123',
      '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37ab',
      '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb',
      Buffer.from('0', 'hex'),
      Buffer.from('0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8ab', 'hex'),
      Buffer.from('0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6', 'hex'),
    ].forEach(key => {
      it(`should fail on invalid length of ${key.toString('hex')}`, async () => {
        expect(() => new PublicKey(key)).toThrowError('Invalid key length');
      });
    });

    [
      { key: '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868' },
      new Array(5),
      12345
    ].forEach(key => {
      it(`should fail on invalid type of ${typeof key}`, async () => {
        expect(() => new PublicKey(key)).toThrowError('Invalid key type');
      });
    });

    [
      '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
      '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868',
      Buffer.from('0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37', 'hex'),
      Buffer.from('03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868', 'hex'),
    ].forEach(key => {
      it(`should construct a compressed public key from ${key.toString('hex')}`, async () => {
        const publicKey = new PublicKey(key);

        expect(publicKey.key).toHaveLength(COMPRESSED_PUBLIC_KEY_LENGTH);
        expect(publicKey.compressed).toBeTruthy();
      });
    });

    [
      '0x21277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb372637d9fd869e6453b4092c82bc963c26efb76bc5e5b9645af8158e7c8d54d13c',
      '0xec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad28688f34ed6feb3a6402abf27f31ddac0e2ee9ce7506c04583d17ab1ff116d358ad7',
      Buffer.from('21277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb372637d9fd869e6453b4092c82bc963c26efb76bc5e5b9645af8158e7c8d54d13c', 'hex'),
      Buffer.from('ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad28688f34ed6feb3a6402abf27f31ddac0e2ee9ce7506c04583d17ab1ff116d358ad7', 'hex'),
    ].forEach(key => {
      it(`should construct an uncompressed public key from ${key.toString('hex')}`, async () => {
        const publicKey = new PublicKey(key);

        expect(publicKey.key).toHaveLength(UNCOMPRESSED_PUBLIC_KEY_LENGTH);
        expect(publicKey.compressed).toBeFalsy();
      });
    });
  });

  describe('toCompressed', () => {
    [
      {
        key: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        res: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
      },
      {
        key: '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868',
        res: '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868',
      },
      {
        key: '0x21277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb372637d9fd869e6453b4092c82bc963c26efb76bc5e5b9645af8158e7c8d54d13c',
        res: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
      },
      {
        key: '0xec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad28688f34ed6feb3a6402abf27f31ddac0e2ee9ce7506c04583d17ab1ff116d358ad7',
        res: '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868',
      }
    ].forEach(spec => {
      const { key, res } = spec;

      it(`should convert key ${key.toString('hex')} to a compressed key`, async () => {
        const publicKey = new PublicKey(key);

        expect(publicKey.toCompressed().toString()).toEqual(res);
      });
    });
  });

  describe('toUncompressed', () => {
    [
      {
        key: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        res: '0x21277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb372637d9fd869e6453b4092c82bc963c26efb76bc5e5b9645af8158e7c8d54d13c',
      },
      {
        key: '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868',
        res: '0xec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad28688f34ed6feb3a6402abf27f31ddac0e2ee9ce7506c04583d17ab1ff116d358ad7',
      },
      {
        key: '0x21277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb372637d9fd869e6453b4092c82bc963c26efb76bc5e5b9645af8158e7c8d54d13c',
        res: '0x21277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb372637d9fd869e6453b4092c82bc963c26efb76bc5e5b9645af8158e7c8d54d13c',
      },
      {
        key: '0xec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad28688f34ed6feb3a6402abf27f31ddac0e2ee9ce7506c04583d17ab1ff116d358ad7',
        res: '0xec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad28688f34ed6feb3a6402abf27f31ddac0e2ee9ce7506c04583d17ab1ff116d358ad7',
      }
    ].forEach(spec => {
      const { key, res } = spec;

      it(`should convert key ${key.toString('hex')} to an uncompressed key`, async () => {
        const publicKey = new PublicKey(key);

        expect(publicKey.toUncompressed().toString()).toEqual(res);
      });
    });
  });

  describe('toAddress', () => {
    [
      {
        key: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        res: '0x9396cbf97705df34bf97353e05c89ebf534d624c',
      },
      {
        key: '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868',
        res: '0x328169f8b6a85206a945f583331f5cae6d824a80'
      },
      {
        key: '0x21277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb372637d9fd869e6453b4092c82bc963c26efb76bc5e5b9645af8158e7c8d54d13c',
        res: '0x9396cbf97705df34bf97353e05c89ebf534d624c'
      },
      {
        key: '0xec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad28688f34ed6feb3a6402abf27f31ddac0e2ee9ce7506c04583d17ab1ff116d358ad7',
        res: '0x328169f8b6a85206a945f583331f5cae6d824a80'
      },
    ].forEach(spec => {
      const { key, res } = spec;

      it(`should convert key ${key.toString('hex')} to address`, async () => {
        const publicKey = new PublicKey(key);

        expect(publicKey.toAddress()).toEqual(res);
      });
    });
  });

  describe('toChecksumAddress', () => {
    [
      {
        key: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        res: '0x9396cBf97705dF34BF97353E05c89ebf534d624c',
      },
      {
        key: '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868',
        res: '0x328169f8B6a85206a945F583331f5cAE6d824a80'
      },
      {
        key: '0x21277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb372637d9fd869e6453b4092c82bc963c26efb76bc5e5b9645af8158e7c8d54d13c',
        res: '0x9396cBf97705dF34BF97353E05c89ebf534d624c'
      },
      {
        key: '0xec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad28688f34ed6feb3a6402abf27f31ddac0e2ee9ce7506c04583d17ab1ff116d358ad7',
        res: '0x328169f8B6a85206a945F583331f5cAE6d824a80'
      },
    ].forEach(spec => {
      const { key, res } = spec;

      it(`should convert key ${key.toString('hex')} to address`, async () => {
        const publicKey = new PublicKey(key);

        expect(publicKey.toChecksumAddress()).toEqual(res);
      });
    });
  });

  describe('toString', () => {
    [
      {
        key: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        res: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37'
      },
      {
        key: '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868',
        res: '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868'
      },
      {
        key: '0xec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad28688f34ed6feb3a6402abf27f31ddac0e2ee9ce7506c04583d17ab1ff116d358ad7',
        res: '0xec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad28688f34ed6feb3a6402abf27f31ddac0e2ee9ce7506c04583d17ab1ff116d358ad7'
      },
      {
        key: '0x21277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb372637d9fd869e6453b4092c82bc963c26efb76bc5e5b9645af8158e7c8d54d13c',
        res: '0x21277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb372637d9fd869e6453b4092c82bc963c26efb76bc5e5b9645af8158e7c8d54d13c'
      },
    ].forEach(spec => {
      const { key, res } = spec;

      it(`should convert key ${key.toString('hex')} to string`, async () => {
        const publicKey = new PublicKey(key);

        expect(publicKey.toString()).toEqual(res);
      });
    });
  });

  describe('addPublicKey', () => {
    [
      {
        key1: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        key2: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8',
        res: '0x0317571e5f18a9e7f584a49b876eef72a69585c1ca70d9704bd342879a11c43351',
      },
      {
        key1: '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868',
        key2: '0x02d4d126793b4e653aa7fc4c9e40148d61dbe707085c3cf71fe4702ed36f999c26',
        res: '0x02aa22479a661b72b89e9daa4f515d8c69c4cbbc4149d7658ecd09311b2217fb3e',
      },
      {
        key1: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        key2: '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868',
        res: '0x028a120ca4ba1fb807ac59d78296be0f1e8d11e1f792def8a96ec90b5707eeb4b1',
      },
      {
        key1: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        key2: '0x02d4d126793b4e653aa7fc4c9e40148d61dbe707085c3cf71fe4702ed36f999c26',
        res: '0x03e2be09e6742dd3af9c23bb7c8745f1209f207f19e4fb937af4a17db09d2cc804',
      }
    ].forEach(spec => {
      const { key1, key2, res } = spec;

      it(`should add public keys ${key1.toString('hex')} and ${key2.toString('hex')}`, async () => {
        const publicKey1 = new PublicKey(key1);
        const publicKey2 = new PublicKey(key2);

        expect(publicKey1.addPublicKey(publicKey2).toString()).toEqual(res);
        expect(publicKey2.addPublicKey(publicKey1).toString()).toEqual(res);
      });
    });
  });
});

describe('ECDH', () => {
  describe('derivePublicKey', () => {
    [
      {
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        privateKey: '0x2f9b3b0603e8af0f3e111beef5e0083a71856f9bf2260cdd73a89fb68240ea34',
        res: '0x03b69287fe2302619585d03ef4d94b3f839b7efd96f559b04f3eecff49460d6b0d',
      },
      {
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8',
        privateKey: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        res: '0x03b69287fe2302619585d03ef4d94b3f839b7efd96f559b04f3eecff49460d6b0d',
      },
      {
        publicKey: '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868',
        privateKey: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        res: '0x039323a8f939950630015c8843920ad09f70ba465727c7704810018f1c6eeb66eb',
      },
      {
        publicKey: '0x02d4d126793b4e653aa7fc4c9e40148d61dbe707085c3cf71fe4702ed36f999c26',
        privateKey: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        res: '0x039323a8f939950630015c8843920ad09f70ba465727c7704810018f1c6eeb66eb',
      },
      {
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        privateKey: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        res: '0x03045320086faaadd6fd77ca31a6c9bcec89cc3ca3b8e4f2d542a4592e0a889197',
      },
      {
        publicKey: '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868',
        privateKey: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        res: '0x03045320086faaadd6fd77ca31a6c9bcec89cc3ca3b8e4f2d542a4592e0a889197',
      },
      {
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        privateKey: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        res: '0x0219b3585cac1872491d28ae770b536d7f63584dee0af3c2ba17830538ce88f65d',
      },
      {
        publicKey: '0x02d4d126793b4e653aa7fc4c9e40148d61dbe707085c3cf71fe4702ed36f999c26',
        privateKey: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        res: '0x0219b3585cac1872491d28ae770b536d7f63584dee0af3c2ba17830538ce88f65d',
      }
    ].forEach(spec => {
      const { publicKey, privateKey, res } = spec;

      it(`should derive ECDH public key for public key ${publicKey.toString('hex')} and private key ${privateKey.toString('hex')}`, async () => {
        const sharedPublicKey = ECDH.derivePublicKey(publicKey, privateKey);

        expect(sharedPublicKey.toString()).toEqual(res);
      });
    });
  });

  describe('derivePrivateKey', () => {
    [
      {
        privateKey1: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        privateKey2: '0x2f9b3b0603e8af0f3e111beef5e0083a71856f9bf2260cdd73a89fb68240ea34',
        res: '0xb23c9218df94a2572409625aa0356241d2a916154d231f4c35fde2c2d2bcd202',
      },
      {
        privateKey1: '0x2f9b3b0603e8af0f3e111beef5e0083a71856f9bf2260cdd73a89fb68240ea34',
        privateKey2: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        res: '0xb23c9218df94a2572409625aa0356241d2a916154d231f4c35fde2c2d2bcd202',
      },
      {
        privateKey1: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        privateKey2: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        res: '0xe1740ba7c8f39c9898622be91cc7c5019b0453006c1669860e5349057318a40e',
      },
      {
        privateKey1: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        privateKey2: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        res: '0xe1740ba7c8f39c9898622be91cc7c5019b0453006c1669860e5349057318a40e',
      },
      {
        privateKey1: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        privateKey2: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        res: '0x3b8a8003f04278cd57f944fd96dc82092d1414e96ffc140b416d4fb693262117',
      },
      {
        privateKey1: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        privateKey2: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        res: '0x3b8a8003f04278cd57f944fd96dc82092d1414e96ffc140b416d4fb693262117',
      },
      {
        privateKey1: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        privateKey2: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        res: '0xb302b16b9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f97f63434e',
      },
      {
        privateKey1: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        privateKey2: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        res: '0xb302b16b9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f97f63434e',
      }
    ].forEach(spec => {
      const { privateKey1, privateKey2, res } = spec;

      it(`should derive ECDH private key for private keys ${privateKey1.toString('hex')} and ${privateKey2.toString('hex')}`, async () => {
        const sharedPrivateKey = ECDH.derivePrivateKey(privateKey1, privateKey2);

        expect(sharedPrivateKey.toString()).toEqual(res);
      });

      it(`should derive ECDH both private and public keys for private keys ${privateKey1.toString('hex')} and ${privateKey2.toString('hex')}`, async () => {
        const sharedPrivateKey = ECDH.derivePrivateKey(privateKey1, privateKey2);

        expect(sharedPrivateKey.toString()).toEqual(res);

        const publicKey1 = new PrivateKey(privateKey1).toPublicKey();
        const publicKey2 = new PrivateKey(privateKey2).toPublicKey();

        const sharedPublicKey1 = ECDH.derivePublicKey(publicKey1, privateKey2);
        const sharedPublicKey2 = ECDH.derivePublicKey(publicKey2, privateKey1);
        expect(sharedPublicKey1.toString()).toEqual(sharedPublicKey2.toString());

        expect(sharedPublicKey1.toString()).toEqual(sharedPrivateKey.toPublicKey().toString());
      });
    });
  });
});

describe('Aggregation', () => {
  describe('derivePublicKey', () => {
    [
      {
        publicKey1: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        publicKey2: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8',
        res: '0x0317571e5f18a9e7f584a49b876eef72a69585c1ca70d9704bd342879a11c43351',
      },
      {
        publicKey1: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8',
        publicKey2: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        res: '0x0317571e5f18a9e7f584a49b876eef72a69585c1ca70d9704bd342879a11c43351',
      },
      {
        publicKey1: '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868',
        publicKey2: '0x02d4d126793b4e653aa7fc4c9e40148d61dbe707085c3cf71fe4702ed36f999c26',
        res: '0x02aa22479a661b72b89e9daa4f515d8c69c4cbbc4149d7658ecd09311b2217fb3e',
      },
      {
        publicKey1: '0x02d4d126793b4e653aa7fc4c9e40148d61dbe707085c3cf71fe4702ed36f999c26',
        publicKey2: '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868',
        res: '0x02aa22479a661b72b89e9daa4f515d8c69c4cbbc4149d7658ecd09311b2217fb3e',
      },
      {
        publicKey1: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        publicKey2: '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868',
        res: '0x028a120ca4ba1fb807ac59d78296be0f1e8d11e1f792def8a96ec90b5707eeb4b1',
      },
      {
        publicKey1: '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868',
        publicKey2: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        res: '0x028a120ca4ba1fb807ac59d78296be0f1e8d11e1f792def8a96ec90b5707eeb4b1',
      },
      {
        publicKey1: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        publicKey2: '0x02d4d126793b4e653aa7fc4c9e40148d61dbe707085c3cf71fe4702ed36f999c26',
        res: '0x03e2be09e6742dd3af9c23bb7c8745f1209f207f19e4fb937af4a17db09d2cc804',
      },
      {
        publicKey1: '0x02d4d126793b4e653aa7fc4c9e40148d61dbe707085c3cf71fe4702ed36f999c26',
        publicKey2: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        res: '0x03e2be09e6742dd3af9c23bb7c8745f1209f207f19e4fb937af4a17db09d2cc804',
      }
    ].forEach(spec => {
      const { publicKey1, publicKey2, res } = spec;

      it(`should derive aggregated public key for public keys ${publicKey1.toString('hex')} and ${publicKey2.toString('hex')}`, async () => {
        const sharedPublicKey = Aggregation.derivePublicKey(publicKey1, publicKey2);

        expect(sharedPublicKey.toString()).toEqual(res);
      });
    });
  });

  describe('derivePrivateKey', () => {
    [
      {
        privateKey1: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        privateKey2: '0x2f9b3b0603e8af0f3e111beef5e0083a71856f9bf2260cdd73a89fb68240ea34',
        res: '0x72973b2eb9f2ff621c25276a518d2e2a81c75bcc5d44664ebd0c933ce40b08af',
      },
      {
        privateKey1: '0x2f9b3b0603e8af0f3e111beef5e0083a71856f9bf2260cdd73a89fb68240ea34',
        privateKey2: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        res: '0x72973b2eb9f2ff621c25276a518d2e2a81c75bcc5d44664ebd0c933ce40b08af',
      },
      {
        privateKey1: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        privateKey2: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        res: '0xfd3c32a6e57ee111e79a076460c900419c98c444a329133f417fc57d61c25273',
      },
      {
        privateKey1: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        privateKey2: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        res: '0xfd3c32a6e57ee111e79a076460c900419c98c444a329133f417fc57d61c25273',
      },
      {
        privateKey1: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        privateKey2: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        res: '0xdf1c44dd7df8c803b7ba1bda68fde6e3a831c161e8661b8cd90f833867d7ec31',
      },
      {
        privateKey1: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        privateKey2: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        res: '0xdf1c44dd7df8c803b7ba1bda68fde6e3a831c161e8661b8cd90f833867d7ec31',
      },
      {
        privateKey1: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        privateKey2: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        res: '0xa417ee1ad39ab9b3ec080280af25653e14eadb4390ffaa94fb382951bd7ea338',
      },
      {
        privateKey1: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        privateKey2: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        res: '0xa417ee1ad39ab9b3ec080280af25653e14eadb4390ffaa94fb382951bd7ea338',
      }
    ].forEach(spec => {
      const { privateKey1, privateKey2, res } = spec;

      it(`should derive aggregated private key for private keys ${privateKey1.toString('hex')} and ${privateKey2.toString('hex')}`, async () => {
        const sharedPrivateKey = Aggregation.derivePrivateKey(privateKey1, privateKey2);

        expect(sharedPrivateKey.toString()).toEqual(res);
      });

      it(`should derive aggregated both private and public keys for private keys ${privateKey1.toString('hex')} and ${privateKey2.toString('hex')}`, async () => {
        const sharedPrivateKey = Aggregation.derivePrivateKey(privateKey1, privateKey2);

        expect(sharedPrivateKey.toString()).toEqual(res);

        const publicKey1 = new PrivateKey(privateKey1).toPublicKey();
        const publicKey2 = new PrivateKey(privateKey2).toPublicKey();

        const sharedPublicKey1 = Aggregation.derivePublicKey(publicKey1, publicKey2);
        const sharedPublicKey2 = Aggregation.derivePublicKey(publicKey2, publicKey1);
        expect(sharedPublicKey1.toString()).toEqual(sharedPublicKey2.toString());

        expect(sharedPublicKey1.toString()).toEqual(sharedPrivateKey.toPublicKey().toString());
      });
    });
  });
});

describe('ECDSA', () => {
  describe('verifySignature', () => {
    [
      {
        message: 'Hello World!',
        signature: '0xd53e1beb5d33520725d03a7067cbb937cf7d7ee3a8d15d76b66e7fae4b60c0f35a3106466982de23e8a7f0da496acb144a1d2f19c780f60a1051c4d0042c3f581c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37'
      },
      {
        message: '9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f9',
        signature: '0xa01eb0464fdf7a322de55951fb8e3caad5d5c7dac4610ef80c71f2acc25a6df95770fadf72cb287c6030ef6ef9358ee2afa42b1298f848ac4428c68a8cfec1441c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37'
      },
      {
        message: '',
        signature: '0x8b9a004a6e1c29d6a956b8034f06687b3777e5fe4224ea49f73d8e2a5262ff105f2b5ea3575399c9166cf0028d6f28fb1b0866f5e368ee2261c0158aad15aa8f1c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37'
      },
      {
        message: 'Hello World!',
        signature: '0x610b17fba53a481206d60b7bd06a1b0725fc654d5b7035a98353900f00d9b98d6f03e86705b6cbf6391f52813df9aa660c6711a5b0c99ee271239a6c526fb5281c',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8'
      },
      {
        message: '9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f9',
        signature: '0x770951a57a579c8b56ecdfc91656a875bc9ca8be847502a3e91b2c780531009325602755a99105ee8e5f4223aa38537d577bd27ba56d06da1d549649ff5eda691b',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8'
      },
      {
        message: '',
        signature: '0x6fde986f059f7d60c3fbb9948aba47f7997d98654cff35f7cd2b494558c478610674b4d8d5cae9c0e8b4f4b82974e4aed8499b31c9dd49613f27ef8716eccaf31b',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8'
      },
    ].forEach(spec => {
      const { message, signature, publicKey } = spec;

      it(`should verify signature on message "${message}" and signature ${signature}`, async () => {
        expect(ECDSA.verifySignature(message, signature, publicKey)).toBeTruthy();
      });
    });

    [
      {
        message: 'Hello World2!',
        signature: '0xd53e1beb5d33520725d03a7067cbb937cf7d7ee3a8d15d76b66e7fae4b60c0f35a3106466982de23e8a7f0da496acb144a1d2f19c780f60a1051c4d0042c3f581c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37'
      },
      {
        message: 'Hello World!',
        signature: '0xc53e1beb5d33520725d03a7067cbb937cf7d7ee3a8d15d76b66e7fae4b60c0f35a3106466982de23e8a7f0da496acb144a1d2f19c780f60a1051c4d0042c3f581c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37'
      },
      {
        message: 'Hello World!',
        signature: '0xd53e1beb5d33520725d03a7067cbb937cf7d7ee3a8d15d76b66e7fae4b60c0f35a3106466982de23e8a7f0da496acb144a1d2f19c780f60a1051c4d0042c3f581c',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8'
      },
      {
        message: 'aaaa9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f9',
        signature: '0xa01eb0464fdf7a322de55951fb8e3caad5d5c7dac4610ef80c71f2acc25a6df95770fadf72cb287c6030ef6ef9358ee2afa42b1298f848ac4428c68a8cfec1441c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37'
      },
      {
        message: '9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f9',
        signature: '0xb01eb0464fdf7a322de55951fb8e3caad5d5c7dac4610ef80c71f2acc25a6df95770fadf72cb287c6030ef6ef9358ee2afa42b1298f848ac4428c68a8cfec1441c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37'
      },
      {
        message: '9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f9',
        signature: '0xa01eb0464fdf7a322de55951fb8e3caad5d5c7dac4610ef80c71f2acc25a6df95770fadf72cb287c6030ef6ef9358ee2afa42b1298f848ac4428c68a8cfec1441c',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8'
      },
      {
        message: '   ',
        signature: '0x8b9a004a6e1c29d6a956b8034f06687b3777e5fe4224ea49f73d8e2a5262ff105f2b5ea3575399c9166cf0028d6f28fb1b0866f5e368ee2261c0158aad15aa8f1c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37'
      },
      {
        message: '',
        signature: '0x7b9a004a6e1c29d6a956b8034f06687b3777e5fe4224ea49f73d8e2a5262ff105f2b5ea3575399c9166cf0028d6f28fb1b0866f5e368ee2261c0158aad15aa8f1c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37'
      },
      {
        message: '',
        signature: '0x8b9a004a6e1c29d6a956b8034f06687b3777e5fe4224ea49f73d8e2a5262ff105f2b5ea3575399c9166cf0028d6f28fb1b0866f5e368ee2261c0158aad15aa8f1c',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8'
      }
    ].forEach(spec => {
      const { message, signature, publicKey } = spec;

      it(`should detect invalid signature on message "${message}" and signature ${signature}`, async () => {
        expect(ECDSA.verifySignature(message, signature, publicKey)).toBeFalsy();
      });
    });
  });
});
