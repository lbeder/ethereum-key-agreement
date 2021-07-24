import chai from 'chai';
import dirtyChai from 'dirty-chai';
import { BaseKey } from './BaseKey';
import { PublicKey, COMPRESSED_PUBLIC_KEY_LENGTH, UNCOMPRESSED_PUBLIC_KEY_LENGTH } from './PublicKey';

chai.use(dirtyChai);
const { expect } = chai;

describe('PublicKey', () => {
  describe('construction', () => {
    [
      '0x123',
      '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37ab',
      '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb',
      BaseKey.hexToUint8Array('00'),
      BaseKey.hexToUint8Array('0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8ab'),
      BaseKey.hexToUint8Array('0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6')
    ].forEach((key) => {
      it(`should fail on invalid length of ${key.toString()}`, async () => {
        expect(() => new PublicKey(key)).to.throw('Invalid key length');
      });
    });

    [
      {
        data: '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868'
      },
      Array(5),
      12345
    ].forEach((key: any) => {
      it(`should fail on invalid type of ${typeof key}`, async () => {
        expect(() => new PublicKey(key)).to.throw('Invalid key type');
      });
    });

    [
      '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
      '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868',
      BaseKey.hexToUint8Array('0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37'),
      BaseKey.hexToUint8Array('03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868')
    ].forEach((key) => {
      it(`should construct a compressed public key from ${key.toString()}`, async () => {
        const publicKey = new PublicKey(key);

        expect(publicKey.key).to.have.lengthOf(COMPRESSED_PUBLIC_KEY_LENGTH);
        expect(publicKey.compressed).to.be.true();
      });
    });

    [
      '0x21277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb372637d9fd869e6453b4092c82bc963c26efb76bc5e5b9645af8158e7c8d54d13c',
      '0xec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad28688f34ed6feb3a6402abf27f31ddac0e2ee9ce7506c04583d17ab1ff116d358ad7',
      BaseKey.hexToUint8Array(
        '21277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb372637d9fd869e6453b4092c82bc963c26efb76bc5e5b9645af8158e7c8d54d13c'
      ),
      BaseKey.hexToUint8Array(
        'ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad28688f34ed6feb3a6402abf27f31ddac0e2ee9ce7506c04583d17ab1ff116d358ad7'
      )
    ].forEach((key) => {
      it(`should construct an uncompressed public key from ${key.toString()}`, async () => {
        const publicKey = new PublicKey(key);

        expect(publicKey.key).to.have.lengthOf(UNCOMPRESSED_PUBLIC_KEY_LENGTH);
        expect(publicKey.compressed).to.be.false();
      });
    });
  });

  describe('isValid', () => {
    [
      '0x123',
      '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37ab',
      '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb',
      BaseKey.hexToUint8Array('0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8ab'),
      BaseKey.hexToUint8Array('0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6')
    ].forEach((key) => {
      it(`should invalidate key ${key.toString()}`, async () => {
        expect(PublicKey.isValid(key)).to.be.false();
      });
    });

    [
      '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
      '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868',
      BaseKey.hexToUint8Array('0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37'),
      BaseKey.hexToUint8Array('03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868')
    ].forEach((key) => {
      it(`should validate key ${key.toString()}`, async () => {
        expect(PublicKey.isValid(key)).to.be.true();
      });
    });
  });

  describe('toCompressed', () => {
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
        key: '0x21277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb372637d9fd869e6453b4092c82bc963c26efb76bc5e5b9645af8158e7c8d54d13c',
        res: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37'
      },
      {
        key: '0xec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad28688f34ed6feb3a6402abf27f31ddac0e2ee9ce7506c04583d17ab1ff116d358ad7',
        res: '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868'
      }
    ].forEach((spec) => {
      const { key, res } = spec;

      it(`should convert key ${key} to a compressed key`, async () => {
        const publicKey = new PublicKey(key);

        expect(publicKey.toCompressed().toString()).to.be.equal(res);
      });
    });
  });

  describe('toUncompressed', () => {
    [
      {
        key: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        res: '0x21277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb372637d9fd869e6453b4092c82bc963c26efb76bc5e5b9645af8158e7c8d54d13c'
      },
      {
        key: '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868',
        res: '0xec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad28688f34ed6feb3a6402abf27f31ddac0e2ee9ce7506c04583d17ab1ff116d358ad7'
      },
      {
        key: '0x21277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb372637d9fd869e6453b4092c82bc963c26efb76bc5e5b9645af8158e7c8d54d13c',
        res: '0x21277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb372637d9fd869e6453b4092c82bc963c26efb76bc5e5b9645af8158e7c8d54d13c'
      },
      {
        key: '0xec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad28688f34ed6feb3a6402abf27f31ddac0e2ee9ce7506c04583d17ab1ff116d358ad7',
        res: '0xec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad28688f34ed6feb3a6402abf27f31ddac0e2ee9ce7506c04583d17ab1ff116d358ad7'
      }
    ].forEach((spec) => {
      const { key, res } = spec;

      it(`should convert key ${key} to an uncompressed key`, async () => {
        const publicKey = new PublicKey(key);

        expect(publicKey.toUncompressed().toString()).to.be.equal(res);
      });
    });
  });

  describe('toAddress', () => {
    [
      {
        key: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        res: '0x9396cbf97705df34bf97353e05c89ebf534d624c'
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
      }
    ].forEach((spec) => {
      const { key, res } = spec;

      it(`should convert key ${key} to address`, async () => {
        const publicKey = new PublicKey(key);

        expect(publicKey.toAddress()).to.be.equal(res);
      });
    });
  });

  describe('toChecksumAddress', () => {
    [
      {
        key: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        res: '0x9396cBf97705dF34BF97353E05c89ebf534d624c'
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
      }
    ].forEach((spec) => {
      const { key, res } = spec;

      it(`should convert key ${key} to address`, async () => {
        const publicKey = new PublicKey(key);

        expect(publicKey.toChecksumAddress()).to.be.equal(res);
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
      }
    ].forEach((spec) => {
      const { key, res } = spec;

      it(`should convert key ${key} to string`, async () => {
        const publicKey = new PublicKey(key);

        expect(publicKey.toString()).to.be.equal(res);
      });
    });
  });

  describe('addPublicKey', () => {
    [
      {
        key1: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        key2: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8',
        res: '0x0317571e5f18a9e7f584a49b876eef72a69585c1ca70d9704bd342879a11c43351'
      },
      {
        key1: '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868',
        key2: '0x02d4d126793b4e653aa7fc4c9e40148d61dbe707085c3cf71fe4702ed36f999c26',
        res: '0x02aa22479a661b72b89e9daa4f515d8c69c4cbbc4149d7658ecd09311b2217fb3e'
      },
      {
        key1: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        key2: '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868',
        res: '0x028a120ca4ba1fb807ac59d78296be0f1e8d11e1f792def8a96ec90b5707eeb4b1'
      },
      {
        key1: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        key2: '0x02d4d126793b4e653aa7fc4c9e40148d61dbe707085c3cf71fe4702ed36f999c26',
        res: '0x03e2be09e6742dd3af9c23bb7c8745f1209f207f19e4fb937af4a17db09d2cc804'
      }
    ].forEach((spec) => {
      const { key1, key2, res } = spec;

      it(`should add public keys ${key1} and ${key2}`, async () => {
        const publicKey1 = new PublicKey(key1);
        const publicKey2 = new PublicKey(key2);

        expect(publicKey1.addPublicKey(publicKey2).toString()).to.be.equal(res);
        expect(publicKey2.addPublicKey(publicKey1).toString()).to.be.equal(res);
      });
    });
  });
});
