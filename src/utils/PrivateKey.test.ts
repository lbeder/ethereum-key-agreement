import chai from 'chai';
import dirtyChai from 'dirty-chai';
import { BaseKey } from './BaseKey';
import { COMPRESSED_PRIVATE_KEY_LENGTH, PrivateKey } from './PrivateKey';

chai.use(dirtyChai);
const { expect } = chai;

describe('PrivateKey', () => {
  describe('construction', () => {
    [
      '0x123',
      '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7bab',
      '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e',
      BaseKey.hexToUint8Array('00'),
      BaseKey.hexToUint8Array('2f9b3b0603e8af0f3e111beef5e0083a71856f9bf2260cdd73a89fb68240ea34ab'),
      BaseKey.hexToUint8Array('2f9b3b0603e8af0f3e111beef5e0083a71856f9bf2260cdd73a89fb68240ea')
    ].forEach((key) => {
      it(`should fail on invalid length of ${key.toString()}`, async () => {
        expect(() => new PrivateKey(key)).to.throw('Invalid key length');
      });
    });

    [
      {
        data: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b'
      },
      Array(5),
      12345
    ].forEach((key: any) => {
      it(`should fail on invalid type of ${typeof key}`, async () => {
        expect(() => new PrivateKey(key)).to.throw('Invalid key type');
      });
    });

    [
      '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
      '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
      BaseKey.hexToUint8Array('9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6'),
      BaseKey.hexToUint8Array('611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd')
    ].forEach((key) => {
      it(`should construct a private key from ${key.toString()}`, async () => {
        const privateKey = new PrivateKey(key);

        expect(privateKey.key).to.have.lengthOf(COMPRESSED_PRIVATE_KEY_LENGTH);
      });
    });
  });

  describe('isValid', () => {
    [
      '0x123',
      '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7bab',
      '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e',
      BaseKey.hexToUint8Array('9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcd'),
      BaseKey.hexToUint8Array('611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bdaa')
    ].forEach((key) => {
      it(`should invalidate key ${key.toString()}`, async () => {
        expect(PrivateKey.isValid(key)).to.be.false();
      });
    });

    [
      '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
      '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
      BaseKey.hexToUint8Array('9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6'),
      BaseKey.hexToUint8Array('611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd')
    ].forEach((key) => {
      it(`should validate key ${key.toString()}`, async () => {
        expect(PrivateKey.isValid(key)).to.be.true();
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
    ].forEach((spec) => {
      const { key, res } = spec;

      it(`should convert key ${key} to a public key`, async () => {
        const privateKey = new PrivateKey(key);
        const publicKey = privateKey.toPublicKey();

        expect(publicKey.toString()).to.be.equal(res);
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
    ].forEach((spec) => {
      const { key, res } = spec;

      it(`should convert key ${key} to string`, async () => {
        const privateKey = new PrivateKey(key);

        expect(privateKey.toString()).to.be.equal(res);
      });
    });
  });

  describe('mulPrivateKey', () => {
    [
      {
        key1: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        key2: '0x2f9b3b0603e8af0f3e111beef5e0083a71856f9bf2260cdd73a89fb68240ea34',
        res: '0xb23c9218df94a2572409625aa0356241d2a916154d231f4c35fde2c2d2bcd202'
      },
      {
        key1: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        key2: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        res: '0xe1740ba7c8f39c9898622be91cc7c5019b0453006c1669860e5349057318a40e'
      },
      {
        key1: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        key2: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        res: '0x3b8a8003f04278cd57f944fd96dc82092d1414e96ffc140b416d4fb693262117'
      },
      {
        key1: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        key2: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        res: '0xb302b16b9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f97f63434e'
      }
    ].forEach((spec) => {
      const { key1, key2, res } = spec;

      it(`should multiple private keys ${key1} and ${key2}`, async () => {
        const privateKey1 = new PrivateKey(key1);
        const privateKey2 = new PrivateKey(key2);

        expect(privateKey1.mulPrivateKey(privateKey2).toString()).to.be.equal(res);
        expect(privateKey2.mulPrivateKey(privateKey1).toString()).to.be.equal(res);
      });
    });
  });

  describe('addPrivateKey', () => {
    [
      {
        key1: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        key2: '0x2f9b3b0603e8af0f3e111beef5e0083a71856f9bf2260cdd73a89fb68240ea34',
        res: '0x72973b2eb9f2ff621c25276a518d2e2a81c75bcc5d44664ebd0c933ce40b08af'
      },
      {
        key1: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        key2: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        res: '0xfd3c32a6e57ee111e79a076460c900419c98c444a329133f417fc57d61c25273'
      },
      {
        key1: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        key2: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        res: '0xdf1c44dd7df8c803b7ba1bda68fde6e3a831c161e8661b8cd90f833867d7ec31'
      },
      {
        key1: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        key2: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        res: '0xa417ee1ad39ab9b3ec080280af25653e14eadb4390ffaa94fb382951bd7ea338'
      }
    ].forEach((spec) => {
      const { key1, key2, res } = spec;

      it(`should add private keys ${key1} and ${key2}`, async () => {
        const privateKey1 = new PrivateKey(key1);
        const privateKey2 = new PrivateKey(key2);

        expect(privateKey1.addPrivateKey(privateKey2).toString()).to.be.equal(res);
        expect(privateKey2.addPrivateKey(privateKey1).toString()).to.be.equal(res);
      });
    });
  });
});
